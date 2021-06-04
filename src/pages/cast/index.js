import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import DetailHeader from '../../components/detailHeader';
import { getCastAnCrew, getDetail } from '../../redux/actions/detail';
import { convertDetailCast } from '../../utils/person';
import './style.scss';
// https://www.themoviedb.org/t/p/w116_and_h174_face/wHa6KOJAoNTFLFtp7wguUJKSnju.jpg

const CastPage = () => {
  const { detail, cast, crew } = useSelector((state) => state.detailReducer);
  const dispatch = useDispatch();
  const { type, id } = useParams();
  const newCrew = convertDetailCast(crew);

  useEffect(() => {
    dispatch(getDetail(type, id));
    if (cast.length === 0) {
      dispatch(getCastAnCrew(type, id));
    }
  }, [detail, cast, type, id, dispatch]);

  return (
    <div className='castPage'>
      <DetailHeader
        type={type}
        imgSrc={`https://www.themoviedb.org/t/p/w116_and_h174_face${detail?.poster_path}`}
        title={detail?.name || detail?.title}
        time={type === 'movie' ? detail?.release_date : detail?.first_air_date}
        link={`/detail/${type}/${detail?.id}`}
        secondaryLink={`/detail/${type}/${detail?.id}`}
        secondaryLinkText='Back to main'
      />
      <Grid container className='castPage__main'>
        <Grid item xs={12} sm={6}>
          <h3 className='castPage__title'>
            {type === 'movie' ? 'Cast' : 'Series Cast'}{' '}
            <span>{cast?.length}</span>
          </h3>
          {cast?.map((x, index) => {
            return (
              <Link
                to={`/detail/person/${x.id}`}
                key={x?.id}
                className='castPage__item d-flex'
              >
                <img
                  src={
                    x?.profile_path
                      ? `https://www.themoviedb.org/t/p/w132_and_h132_face${x?.profile_path}`
                      : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
                  }
                  alt=''
                />
                <div>
                  <p>{x.name}</p>
                  {type === 'movie' ? (
                    <span>{x.character}</span>
                  ) : (
                    x.roles.map((_x, index) => (
                      <span key={index}>
                        {_x.character}(
                        <span style={{ opacity: '0.6' }}>
                          {_x.episode_count <= 1
                            ? `${_x.episode_count} episode`
                            : `${_x.episode_count} episodes`}
                        </span>
                        ){index !== x.roles.length - 1 && <span>, </span>}
                      </span>
                    ))
                  )}
                </div>
              </Link>
            );
          })}
        </Grid>
        <Grid item xs={12} sm={6}>
          <h3 className='castPage__title'>
            Crew <span>{crew?.length}</span>
          </h3>

          {Object.keys(newCrew).map((key, index) => {
            return (
              <div style={{ marginBottom: '20px' }} key={index}>
                <h4 style={{ fontSize: '16px', fontWeight: '700' }}>{key}</h4>
                {newCrew[key].map((_x) => {
                  return (
                    <Link
                      to={`/detail/person/${_x.id}`}
                      key={_x?.id}
                      className='castPage__item d-flex'
                    >
                      <img
                        src={
                          _x?.profile_path
                            ? `https://www.themoviedb.org/t/p/w132_and_h132_face${_x?.profile_path}`
                            : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
                        }
                        alt=''
                      />
                      <div>
                        <p>{_x.name}</p>
                        {type === 'movie' ? (
                          <span>{_x.job}</span>
                        ) : (
                          _x.jobs.map((__x, _index) => (
                            <span key={_index}>
                              {__x.job}(
                              <span style={{ opacity: '0.6' }}>
                                {_x.episode_count <= 1
                                  ? `${__x.episode_count} episode`
                                  : `${__x.episode_count} episodes`}
                              </span>
                              )
                              {_index !== _x.jobs.length - 1 && <span>, </span>}
                            </span>
                          ))
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

export default CastPage;
