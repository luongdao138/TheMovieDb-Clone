import React from 'react';
import './style.scss';
import { BsStarFill } from 'react-icons/bs';

const ReviewItem = ({ review }) => {
  const src = review.author_details.avatar_path
    ? review.author_details.avatar_path.slice(1).startsWith('https')
      ? review.author_details.avatar_path.slice(1)
      : `https://www.themoviedb.org/t/p/w128_and_h128_face${review.author_details.avatar_path}`
    : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg';

  return (
    <div className='reviewItem d-flex'>
      <div className='reviewItem__logo'>
        <img src={src} alt='' />
      </div>
      <div className='reviewItem__info'>
        <h3 className='reviewItem__info__title'>
          A review by {review.author}
          <span>
            <span>
              <BsStarFill />
            </span>{' '}
            <span>{review.author_details.rating}</span>
          </span>
        </h3>
        <p className='reviewItem__info__time'>
          Written by <strong>{review.author}</strong> on May 26, 2021
        </p>
        <p className='reviewItem__info__content'>{review.content}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
