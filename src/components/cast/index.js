import React from 'react';
import CastItem from './castItem';
import './style.scss';
import { BsArrowRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Cast = ({ type, id }) => {
  const { cast } = useSelector((state) => state.detailReducer);
  return (
    <div className='cast'>
      <h4 className='cast__title'>Top billed cast</h4>
      <div className='cast__main'>
        {cast?.slice(0, 9).map((x) => (
          <CastItem type={type} key={x.id} data={x} />
        ))}
        <div className='d-flex justify-content-center align-items-center viewmore'>
          <Link to={`/${type}/${id}/cast`}>
            View more{' '}
            <span>
              <BsArrowRight />
            </span>
          </Link>
        </div>
      </div>
      <Link to={`/${type}/${id}/cast`} className='cast__full'>
        {' '}
        Full cast & Crew
      </Link>
    </div>
  );
};

export default Cast;
