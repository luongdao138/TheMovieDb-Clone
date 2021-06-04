import React, { createContext, useEffect, useMemo, useState } from 'react';
import './style.scss';
import DetailHeader from '../../components/detailHeader';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, getImages } from '../../redux/actions/detail';
import { Grid } from '@material-ui/core';
import MediaFilter from '../../components/mediaFilter';
import MediaDetailItem from '../../components/mediaDetailItem';
import { getAllLanguages } from '../../redux/actions/genre';
import { convertLanguageMedia } from '../../utils/language';

export const MediaContext = createContext();

const MediaPage = () => {
  const { type, id, media_type } = useParams();
  const dispatch = useDispatch();
  const { detail, images } = useSelector((state) => state.detailReducer);
  const { list: languages } = useSelector((state) => state.languages);
  const [data, setData] = useState({});
  const [current, setCurrent] = useState('No Language');

  useEffect(() => {
    setData(
      convertLanguageMedia(
        type === 'person' ? images.profiles : images[media_type],
        languages
      )
    );
  }, [type, media_type, images, languages]);
  // console.log(Object.keys(data)[0])

  useEffect(() => {
    if (!detail) {
      dispatch(getDetail(type, id));
    }
    if (type === 'person' && !images.profiles) {
      dispatch(getImages(type, id));
    } else {
      if (!images[type]) {
        dispatch(getImages(type, id));
      }
    }

    if (languages.length === 0) {
      dispatch(getAllLanguages());
    }
  }, [dispatch, detail, type, id, media_type]);

  return (
    <MediaContext.Provider value={{ data, setCurrent, current }}>
      <div className='mediaPage'>
        <DetailHeader
          type={type}
          imgSrc={`https://www.themoviedb.org/t/p/w116_and_h174_face${
            detail?.poster_path || detail?.profile_path
          }`}
          title={detail?.name || detail?.title}
          time={
            type === 'movie' ? detail?.release_date : detail?.first_air_date
          }
          link={`/detail/${type}/${detail?.id}`}
          secondaryLink={`/detail/${type}/${detail?.id}`}
          secondaryLinkText='Back to main'
        />
        {/* <DetailHeader detail={detail} type={type} id={id} /> */}
        <Grid container className='mediaPage__main'>
          <Grid item xs={12} md={4} lg={3}>
            <MediaFilter type={type} media_type={media_type} id={id} />
          </Grid>

          <Grid container item xs={12} md={8} lg={9}>
            {data &&
              data[current]?.map((x, index) => {
                return (
                  <Grid item xs={12} key={index} md={6} lg={4}>
                    <MediaDetailItem data={x} />
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </div>
    </MediaContext.Provider>
  );
};

export default MediaPage;
