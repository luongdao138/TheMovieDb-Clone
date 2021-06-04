import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Cast from '../../components/cast';
import Media from '../../components/media';
import MovieInfo from '../../components/movieInfo';
import MovieKeyword from '../../components/movieKeywords';
import PersonCareer from '../../components/personCareer';
import PersonInfo from '../../components/personInfo';
import Recommendations from '../../components/recomendations';
import SeasonOverview from '../../components/seasonOverview';
import Social from '../../components/social';
import DetailNav from '../../components/detailNav';
import {
  getCastAnCrew,
  getDetail,
  getExternals,
  getImages,
  getKeywords,
  getPersonCredits,
  getRecommendations,
  getReviews,
  getVideos,
} from '../../redux/actions/detail';
import './style.scss';
import { movieOptions, tvOptions } from '../../utils/navOptions';

const DetailPage = () => {
  const { type, id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetail(type, id));
    if (type === 'tv' || type === 'movie') {
      dispatch(getCastAnCrew(type, id));
      dispatch(getReviews(type, id, 1));
      dispatch(getVideos(type, id));
      dispatch(getImages(type, id));
      dispatch(getRecommendations(type, id, 1));
      dispatch(getExternals(type, id));
      dispatch(getKeywords(type, id));
    } else {
      dispatch(getPersonCredits(id));
    }
  }, [type, id]);
  const { detail } = useSelector((state) => state.detailReducer);

  return (
    <div className='detailPage'>
      {(type === 'tv' || type === 'movie') && (
        <>
          <DetailNav
            options={type === 'movie' ? movieOptions(id) : tvOptions(id)}
          />
          <MovieInfo type={type} />
          <Grid container className='detailPage__bottom'>
            <Grid item xs={12} md={8} lg={9}>
              <Cast type={type} id={id} />
              {type === 'tv' && (
                <>
                  <div className='currentSeason my-3'>
                    <h5>Current Season</h5>
                    {detail?.seasons && detail?.seasons?.length && (
                      <SeasonOverview
                        id={detail?.id}
                        season={detail?.seasons[detail?.seasons?.length - 1]}
                      />
                    )}
                  </div>
                  <Link
                    style={{
                      fontWeight: '600',
                      color: '#000',
                      marginBottom: '20px',
                      display: 'block',
                    }}
                    to={`/tv/${detail?.id}/seasons`}
                  >
                    Views All Seasons
                  </Link>
                </>
              )}
              <Social type={type} />
              <Media type={type} id={id} />
              <Recommendations type={type} />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <MovieKeyword type={type} />
            </Grid>
          </Grid>
        </>
      )}
      {type == 'person' && (
        <div className='personWrapper'>
          <Grid container>
            <Grid item xs={12} md={4} lg={3}>
              <PersonInfo />
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <PersonCareer />
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
