import React, { useState } from 'react';
import './style.scss';
import { BsListUl } from 'react-icons/bs';
import {
  BsFillBookmarkFill,
  BsFillStarFill,
  BsFillPlayFill,
} from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Dialog } from '@material-ui/core';
import VideoIframe from '../videoIframe';
import { Link } from 'react-router-dom';

const converTime = (minutes) => {
  if (minutes <= 59) {
    return `${minutes}m`;
  }
  if (minutes % 60 === 0) {
    return `${minutes / 60}h`;
  }
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
};

const getCrewAndCast = (type, crew) => {
  let result = [];

  crew.forEach((x) => {
    if (
      ['director', 'story', 'screenplay', 'novel', 'writer'].includes(
        x.job?.toLowerCase()
      )
    ) {
      const isExist = result.find((_x) => _x.id === x.id);
      if (!isExist) {
        result.push({
          id: x.id,
          name: x.name,
          job: [x.job],
        });
      } else {
        isExist.job.push(x.job);
      }
    }
  });
  return result;
};

const MovieInfo = ({ type }) => {
  const { detail, loading, crew, videos } = useSelector(
    (state) => state.detailReducer
  );
  const [openTrailer, setOpenTrailer] = useState(false);
  if (!detail) return null;
  const trailerKey = videos?.find(
    (x) => x.type?.toLowerCase() === 'trailer'
  )?.key;

  const handlePlayTrailer = () => {
    setOpenTrailer(true);
  };
  if (loading) return <p>Loading...</p>;

  return (
    <div
      className='movieInfo'
      style={{
        backgroundImage: detail.backdrop_path
          ? `url("https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${detail.backdrop_path}")`
          : 'none',
      }}
    >
      <Dialog
        maxWidth='lg'
        open={openTrailer}
        onClose={() => setOpenTrailer(false)}
      >
        <VideoIframe
          src={trailerKey}
          handleClose={() => setOpenTrailer(false)}
        />
      </Dialog>
      <div className='movieInfo__wrapper'>
        <div className='movieInfo'>
          <div className='movieInfo__poster'>
            {detail.poster_path ? (
              <img
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${detail.poster_path}`}
                alt=''
              />
            ) : (
              <img
                src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
                alt=''
              />
            )}
          </div>
          <div xs={12} lg={8} className='movieInfo__main'>
            <h1 className='movieInfo__main__title'>
              {detail.title || detail.name}{' '}
              <span>
                {(detail.release_date || detail.first_air_date) && (
                  <>
                    (
                    {new Date(
                      detail.release_date || detail.first_air_date
                    ).getFullYear()}
                    )
                  </>
                )}
              </span>
            </h1>
            <div className='movieInfo__main__facts'>
              <span className='movieInfo__main__facts__certification'>
                PG-13
              </span>
              {type === 'movie' && (
                <span className='movieInfo__main__facts__release'>
                  {moment(detail.release_date).format('MM/DD/YYYY')} (
                  {detail?.production_countries
                    ?.map((x) => x.iso_3166_1)
                    .join(', ')}
                  )
                </span>
              )}
              <span className='movieInfo__main__facts__genres'>
                {/* Comedy, Crime */}
                {detail.genres?.map((x) => x.name).join(', ')}
              </span>
              <span className='movieInfo__main__facts__runtime'>
                {type === 'movie' && detail?.runtime
                  ? converTime(detail?.runtime)
                  : detail?.episode_run_time &&
                    converTime(detail?.episode_run_time[0])}
              </span>
            </div>
            <ul className='movieInfo__main__actions'>
              <li className='movieInfo__main__actions__score'>
                <p className='movieInfo__main__actions__score__value'>
                  <span>
                    {detail.vote_average
                      ? detail.vote_average * 10 + '%'
                      : 'NR'}
                  </span>
                </p>
                <span className='movieInfo__main__actions__score__title'>
                  User score
                </span>
              </li>
              <li className='movieInfo__main__actions__tooltip'>
                <span>
                  <BsListUl />
                </span>
              </li>
              <li className='movieInfo__main__actions__tooltip'>
                <span>
                  <FaHeart />
                </span>
              </li>
              <li className='movieInfo__main__actions__tooltip'>
                <span>
                  <BsFillBookmarkFill />
                </span>
              </li>
              <li className='movieInfo__main__actions__tooltip'>
                <span>
                  <BsFillStarFill />
                </span>
              </li>
              {type === 'movie' && videos?.length > 0 && (
                <li
                  className='movieInfo__main__actions__play'
                  onClick={handlePlayTrailer}
                >
                  <span>
                    <BsFillPlayFill />
                  </span>
                  <span>Play trailer</span>
                </li>
              )}
            </ul>
            <span className='movieInfo__main__tagline'>{detail.tagline}</span>
            <div className='movieInfo__main__overview'>
              <h5>Overview</h5>
              <p>{detail.overview}</p>
            </div>
            <ul className='movieInfo__main__people'>
              {type === 'movie'
                ? getCrewAndCast(type, crew)?.map((x) => (
                    <li key={x.id} className='movieInfo__main__people__profile'>
                      <Link to={`/detail/person/${x.id}`}>
                        {' '}
                        <p>{x.name}</p>
                      </Link>
                      <p className='character'>{x.job.join(', ')}</p>
                    </li>
                  ))
                : detail.created_by?.map((x) => (
                    <li key={x.id} className='movieInfo__main__people__profile'>
                      <Link to={`/detail/person/${x.id}`}>
                        {' '}
                        <p>{x.name}</p>
                      </Link>
                      <p className='character'>Creator</p>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
