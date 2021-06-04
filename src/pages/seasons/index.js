import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DetailHeader from '../../components/detailHeader';
import SeasonOverview from '../../components/seasonOverview';
import { getDetail } from '../../redux/actions/detail';
import './style.scss';

const dummyData = {
  poster_path:
    'https://www.themoviedb.org/t/p/w260_and_h390_bestv2/ft8pUr3qX41kOux5eqrwf02yAxZ.jpg',
  season_number: 10,
  episode_count: 18,
  air_date: '2012-23-13',
  overview: 'Season 0 of Tia Chớp premiered on April 19, 2016',
};

const SeasonsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.detailReducer);

  useEffect(() => {
    if (!detail) {
      dispatch(getDetail('tv', id));
    }
    // dispatch();
  }, [id, dispatch]);

  return (
    <div className='seasonPage'>
      <DetailHeader
        type={'tv'}
        imgSrc={
          detail?.poster_path
            ? `https://www.themoviedb.org/t/p/w116_and_h174_face${detail?.poster_path}`
            : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
        }
        title={detail?.name || detail?.title}
        time={detail?.first_air_date}
        link={`/detail/tv/${detail?.id}`}
        secondaryLink={`/detail/tv/${detail?.id}`}
        secondaryLinkText='Back to main'
      />
      {/* <DetailHeader detail={detail} type='tv' id={id} /> */}
      <div className='seasonPage__main'>
        {detail &&
          detail.seasons.map((season, index) => {
            return (
              <SeasonOverview id={id} key={index} season={season} seasonPage />
            );
          })}
      </div>
    </div>
  );
};

export default SeasonsPage;
