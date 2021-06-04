import React, { useContext } from 'react';
import './style.scss';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { BiPlusCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { MediaContext } from '../../pages/media';

const MediaFilter = ({ type, media_type, id }) => {
  const { data, setCurrent, current } = useContext(MediaContext);
  const handleClick = (key) => {
    // setCurrent(d]);
    setCurrent(key);
  };
  return (
    <div className='mediaFilter'>
      <div
        style={{
          backgroundColor: type === 'person' ? '#01B4E4' : '#1A1F29',
        }}
        className='mediaFilter__header d-flex justify-content-between'
      >
        <span>{type === 'person' ? 'Images' : media_type}</span>
        <div className='mediaFilter__header__icons'>
          <Link to='/'>
            <BsFillQuestionCircleFill />
          </Link>
          <Link to='/'>
            <BiPlusCircle />
          </Link>
        </div>
      </div>
      <div className='mediaFilter__main'>
        <ul>
          {data &&
            Object.keys(data)?.map((x, index) => {
              return (
                <li
                  key={index}
                  onClick={() => handleClick(x)}
                  className={`${x === current ? 'active' : ''}`}
                >
                  <span className='title'>{x}</span>
                  <span className='value'>{data[x].length}</span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default MediaFilter;
