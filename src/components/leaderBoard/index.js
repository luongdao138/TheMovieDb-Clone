import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LeaderBoardItem from './leaderBoardItem';
import './style.scss';

const LeaderBoard = () => {
  return (
    <div className='leaderBoard'>
      <div className='d-flex align-items-center mb-1'>
        <h4 className='mr-3'>Leaderboard</h4>
        <div>
          <span className='d-flex align-items-center m-1 leaderBoard__alltime '>
            <span></span>
            All Time Edits
          </span>
          <span className='d-flex align-items-center m-1 leaderBoard__thisweek'>
            <span></span>
            Edits This Week
          </span>
        </div>
      </div>
      <Row>
        {[...new Array(10)].map((_, index) => (
          <Col key={index} xs={12} md={6}>
            <LeaderBoardItem />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default LeaderBoard;
