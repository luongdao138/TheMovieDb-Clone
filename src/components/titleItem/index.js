import React from 'react';
import './style.scss';

const TitleItem = ({ code, name, titles }) => {
  return (
    <div className='titleItem'>
      <div className='titleItem__header'>
        {code && (
          <img src={`https://www.countryflags.io/${code}/flat/24.png`} alt='' />
        )}
        <span>{name}</span>
      </div>
      <div className='titleItem__main'>
        <ul>
          <li>
            <span className='title'>Title</span>
            <span className='value'>Type</span>
          </li>
          {titles &&
            titles.map((title, index) => (
              <li key={index}>
                <span className='title'>{title.title}</span>
                <span className='value'>{title.type}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TitleItem;
