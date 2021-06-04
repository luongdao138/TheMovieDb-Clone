import React from 'react';
import './style.scss';
import {
  BsThreeDots,
  BsFillBookmarkFill,
  BsFillStarFill,
} from 'react-icons/bs';
import { FaList, FaHeart } from 'react-icons/fa';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Movie = ({ movie, list, type }) => {
  const movieTitle = movie?.title || movie?.name;
  return (
    <div className={list ? 'movie movie_list' : 'movie'}>
      <div className='movie__thumbnail'>
        <Link to={`/detail/${type}/${movie.id}`}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`
                : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
            }
            alt=''
          />
        </Link>
        <div>
          <BsThreeDots style={{ margin: 'auto' }} />
          <ul>
            <li>
              <FaList />
              <span>Add to list</span>
            </li>
            <li>
              <FaHeart />
              <span>Favorite</span>
            </li>
            <li>
              <BsFillBookmarkFill />
              <span>Watchlist</span>
            </li>
            <li>
              <BsFillStarFill />
              <span>Your rating</span>
            </li>
          </ul>
        </div>
        <span>
          <span>{movie?.vote_average * 10}%</span>
        </span>
      </div>
      <div className='movie__info'>
        <Link to={`/detail/${type}/${movie.id}`}>
          <p className='movie__title'>{movieTitle}</p>
        </Link>
        <span className='movie__date'>
          {moment(movie?.first_air_date).format('ll')}
        </span>
      </div>
    </div>
  );
};

export default Movie;
