import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style.scss';

const Header = () => {
  const [value, setValue] = useState('');
  const history = useHistory();
  const handleSearch = (e) => {
    e.preventDefault();
    if (!value) return;
    history.push(`/search?query=${value}`);
  };

  return (
    <div className='banner'>
      <div className='banner__wrapper'>
        <h1 className='banner__wrapper__bigtext'>Welcome.</h1>
        <h2 className='banner__wrapper__smalltext'>
          Millions of movies, TV shows and people to discover. Explore now.
        </h2>
        <div className='banner__wrapper__search'>
          <form onSubmit={handleSearch}>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type='text'
              placeholder='Search...'
            />
            <button type='submit'>Search</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
