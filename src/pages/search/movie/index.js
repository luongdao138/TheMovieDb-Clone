import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import './style.scss';

const MovieSearch = ({ collection, data, keyword, keywordType }) => {
  const { current } = useSelector((state) => state.search);
  const history = useHistory();
  const handleClick = () => {
    if (!keyword) {
      history.push(`/detail/${current.type}/${data.id}`);
    } else {
      history.push(`/detail/${keywordType}/${data.id}`);
    }
  };
  return (
    <div
      className='movieSearch d-flex'
      style={{ cursor: 'pointer' }}
      onClick={handleClick}
    >
      <img
        src={
          data.poster_path
            ? `https://image.tmdb.org/t/p/w500/${data?.poster_path}`
            : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
        }
        alt=''
      />
      <div className='movieSearch__info d-flex flex-column align-align-items-center px-3'>
        <h3>{data.title || data.name}</h3>
        {!collection && (
          <span>
            {moment(data?.first_air_date || data?.release_date).format('ll')}
          </span>
        )}
        <p className={`${keyword ? 'keyword' : ''}`}>{data.overview}</p>
      </div>
    </div>
  );
};

export default MovieSearch;
