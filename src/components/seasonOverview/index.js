import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
const SeasonOverview = ({ season, seasonPage, id }) => {
  return (
    <>
      <div
        className={`seasonOverview d-flex ${seasonPage ? 'season_page' : ''} `}
      >
        <div className='seasonOverview__thumbnail'>
          <Link to={`/tv/${id}/seasons/${season.season_number}`}>
            <img
              src={
                season?.poster_path
                  ? `https://www.themoviedb.org/t/p/w260_and_h390_bestv2${season?.poster_path}`
                  : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
              }
              alt=''
            />
          </Link>
        </div>
        <div className='seasonOverview__info'>
          <Link
            to={`/tv/${id}/seasons/${season.season_number}`}
            style={{ color: '#000' }}
          >
            <h5>Season {season?.season_number}</h5>
          </Link>
          <strong>
            {season?.air_date?.split('-')[0]} | {season?.episode_count} episodes
          </strong>
          <p>{season?.overview}</p>
        </div>
      </div>
    </>
  );
};

export default SeasonOverview;
