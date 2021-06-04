import moment from 'moment';
import React from 'react';
import { BiCalendar } from 'react-icons/bi';
import { BsFillBookmarkFill, BsFillStarFill } from 'react-icons/bs';
import { FaHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.scss';
const Recommendations = () => {
  const { recommendations } = useSelector((state) => state.detailReducer);

  return (
    <div className='recomendations'>
      <h5 className='recomendations__title'>Recommendations</h5>
      <div className='recomendations__main'>
        {recommendations?.map((x, index) => (
          <div key={index} className='recomendations__main__item'>
            <div className='recomendations__main__item__thumbnail'>
              <Link to={`/detail/${x.media_type}/${x.id}`}>
                <img
                  src={
                    x.poster_path
                      ? `https://www.themoviedb.org/t/p/w500_and_h282_face${x.poster_path}`
                      : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
                  }
                  alt=''
                />
              </Link>
              <div className='recomendations__main__item__thumbnail__actions d-flex align-items-center justify-content-between'>
                <span className='left'>
                  <span>
                    <BiCalendar />
                  </span>
                  <span>
                    {moment(x.release_date || x.first_air_date).format(
                      'DD/MM/YYYY'
                    )}
                  </span>
                </span>
                <span className='right'>
                  <span>
                    <FaHeart />
                  </span>
                  <span>
                    <BsFillBookmarkFill />
                  </span>
                  <span>
                    <BsFillStarFill />
                  </span>
                </span>
              </div>
            </div>
            <Link
              to={`/detail/${x.media_type}/${x.id}`}
              className='recomendations__main__item__info d-flex justify-content-between align-items-center '
            >
              <p className='recomendations__main__item__info__name'>
                {x.title || x.name}
              </p>
              <p className='recomendations__main__item__info__vote'>
                {Math.round(x.vote_average * 10)}%
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
