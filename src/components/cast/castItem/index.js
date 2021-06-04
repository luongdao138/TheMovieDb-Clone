import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const CastItem = ({ data, type }) => {
  return (
    <Link to={`/detail/person/${data.id}`} className='castItem'>
      <div className='castItem__thumbnail'>
        <img
          src={
            data.profile_path
              ? `https://www.themoviedb.org/t/p/w276_and_h350_face${data.profile_path}`
              : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
          }
          alt=''
        />
      </div>
      <div className='castItem__info'>
        <h6 className='castItem__info__name'>{data.name}</h6>
        <p className='castItem__info__character'>
          {type === 'movie' || type === 'episode'
            ? data.character
            : data.roles?.map((x) => x.character).join(', ')}
        </p>
        {type === 'tv' && (
          <p className='castItem__info__episode' style={{ opacity: '0.6' }}>
            {data.total_episode_count <= 1
              ? data.total_episode_count + ' episode'
              : data.total_episode_count + ' episodes'}
          </p>
        )}
      </div>
    </Link>
  );
};

export default CastItem;
