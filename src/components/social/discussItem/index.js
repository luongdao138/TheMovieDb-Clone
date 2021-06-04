import React from 'react';
import './style.scss';
const DiscussItem = () => {
  return (
    <div className='discussItem d-flex'>
      <div className='discussItem__left d-flex align-items-center'>
        <img
          src='https://www.themoviedb.org/t/p/w90_and_h90_face/sOHvvWHsZWoZh4fGCe5EvQyuaYJ.jpg'
          alt=''
        />
        <p>So who's going to sympathize with a dog killer?</p>
      </div>
      <div className='discussItem__right d-flex align-items-center'>
        <span className='discussItem__right__status'>Open</span>
        <span className='discussItem__right__rep'>2</span>
        <span className='discussItem__right__time'>
          Mar 05, 2021 at 9:18 AM by <strong>jorgito2001</strong>
        </span>
      </div>
    </div>
  );
};

export default DiscussItem;
