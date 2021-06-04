import React from 'react';
import './style.scss';

const DetailStats = ({ title, number, data }) => {
  return (
    <div className='detailStats'>
      <div className='detailStats__header d-flex justify-content-between align-items-center'>
        <p>{title}</p>
        <span>{number}</span>
      </div>
      <div className='detailStats__main'>
        <ul>
          {data &&
            data?.map((x, index) => {
              return (
                <li key={index}>
                  <span className='title'>{x.label}</span>
                  <span className='value'>{x.value}</span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default DetailStats;
