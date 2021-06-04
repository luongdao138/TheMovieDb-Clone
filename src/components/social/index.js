import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReviewItem from './reviewItem';
import './style.scss';

const Social = () => {
  const { total_results, results } = useSelector(
    (state) => state.detailReducer.reviews
  );
  console.log(results);

  return (
    <div className='social'>
      <div className='social__header d-flex align-items-center'>
        <h3 className='social__header__title'>Social</h3>
        <div className='d-flex align-items-center nav'>
          <p>
            Reviews <span>{total_results}</span>
          </p>
        </div>
      </div>
      <div className='social__main'>
        {results?.length > 0 ? (
          results?.slice(0, 3).map((x) => {
            return <ReviewItem key={x.id} review={x} />;
          })
        ) : (
          <p>No reviews</p>
        )}
      </div>
      {results?.length > 0 && (
        <Link to='/' className='social__full'>
          Read All Reviews
        </Link>
      )}
    </div>
  );
};

export default Social;
