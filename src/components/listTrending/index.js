import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getHomeTrending } from '../../redux/actions/home';
import Movie from '../movie';
import './styleTrending.scss';

const ListTrending = ({ list }) => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([
    {
      label: 'Today',
      isActive: true,
      value: 'day',
    },
    {
      label: 'This week',
      isActive: false,
      value: 'week',
    },
  ]);
  const handleChange = (index) => {
    if (!options[index].isActive) {
      setOptions((old) =>
        old.map((x, _index) =>
          index === _index
            ? { ...x, isActive: true }
            : { ...x, isActive: false }
        )
      );
      dispatch(getHomeTrending('movie', options[index].value));
    }
  };
  return (
    <div className='listTrending'>
      <div className='listTrending__header'>
        <h2>Trending</h2>
        <div>
          {options.map((x, index) => {
            return (
              <span
                style={{
                  borderRadius: '50px',
                  padding: '10px',
                  cursor: 'pointer',
                }}
                onClick={() => handleChange(index)}
                key={index}
                className={x.isActive ? 'active' : ''}
              >
                {x.label}
              </span>
            );
          })}
        </div>
      </div>
      <div className='listTrending__main'>
        {list?.map((movie, index) => (
          <div key={index} className='listTrending__main__item'>
            <Movie movie={movie} type='movie' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListTrending;
