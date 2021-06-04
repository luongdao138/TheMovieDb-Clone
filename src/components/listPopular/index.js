import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getHomePopular } from '../../redux/actions/home';
import Movie from '../movie';
import './style.scss';

const ListPopular = ({ list }) => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([
    {
      label: 'On TV',
      isActive: true,
      value: 'tv',
    },
    {
      label: 'In Theaters',
      isActive: false,
      value: 'movie',
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
      setCurrentIndex(index);
      dispatch(getHomePopular(options[index].value));
    }
  };
  return (
    <div className='listPopular'>
      <div className='listPopular__header'>
        <h2>What's Popular</h2>
        <div>
          {options.map((x, index) => {
            return (
              <span
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
      <div className='listPopular__main'>
        {list.map((movie, index) => (
          <div key={index} className='listPopular__main__item'>
            <Movie movie={movie} type={options[currentIndex].value} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListPopular;
