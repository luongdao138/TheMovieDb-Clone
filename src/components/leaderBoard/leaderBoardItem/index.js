import React from 'react';
import './style.scss';
const LeaderBoardItem = () => {
  return (
    <div className='d-flex align-items-center py-2 leaderBoardItem'>
      <a href='sxaxa' className='leaderBoardItem__left'>
        <img
          src='https://secure.gravatar.com/avatar/ee75ee6ffc7c512afe600c6cabf72384.jpg?s=128'
          alt=''
        />
      </a>
      <div className='leaderBoardItem__right'>
        <a href='scdsvfd'>Anderson2502</a>
        <div className='leaderBoardItem__right__alltime d-flex align-items-center'>
          <span className='span1' style={{ width: '100%' }}></span>
          <span className='span2'>10248</span>
        </div>
        <div className='leaderBoardItem__right__thisweek d-flex align-items-center'>
          <span
            className='span1'
            className='span1'
            style={{ width: '100%' }}
          ></span>
          <span className='span2'>10248</span>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardItem;
