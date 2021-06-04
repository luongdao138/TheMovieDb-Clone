import React, { useState } from 'react';
import './style.scss';
import { BiPlusMedical } from 'react-icons/bi';
import { BsBellFill } from 'react-icons/bs';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { Drawer, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useHistory } from 'react-router-dom';
const initMenu = [
  {
    title: 'Movies',
    status: false,
    submenu: [
      { label: 'Popular', link: '/list/movie/popular' },
      { label: 'Top Rated', link: '/list/movie/top_rated' },
      { label: 'Upcoming', link: '/list/movie/upcoming' },
      { label: 'Now Playing', link: '/list/movie/now_playing' },
    ],
  },
  {
    title: 'TV Shows',
    status: false,
    submenu: [
      { label: 'Popular', link: '/list/tv/popular' },
      { label: 'Top Rated', link: '/list/tv/top_rated' },
      { label: 'On TV', link: '/list/tv/on_the_air' },
      { label: 'Airing Today', link: '/list/tv/airing_today' },
    ],
  },
  {
    title: 'People',
    status: false,
    submenu: [{ label: 'Popular People', link: '/list/person/popular' }],
  },
  {
    title: 'More',
    status: false,
    submenu: [
      { label: 'Discussions', link: '/' },
      { label: 'Leaderboard', link: '/' },
      { label: 'Support', link: '/' },
      { label: 'API', link: '/' },
    ],
  },
];

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [menu, setMenu] = useState(initMenu);
  const [openSearch, setOpenSearch] = useState(false);
  const [value, setValue] = useState('');
  const history = useHistory();
  const toggleOpenMenu = (index) => {
    setMenu((old) =>
      old.map((x, _index) =>
        index === _index ? { ...x, status: !x.status } : x
      )
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (value === '') return;
    setValue('');
    setOpenSearch(false);
    history.push(`/search?query=${value}`);
  };

  return (
    <div className='header'>
      <div className={`header__search ${!openSearch ? 'disappear' : ''}`}>
        <form action='' onSubmit={handleSearch}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            type='text'
            placeholder='Search for a movie, tv show, person...'
          />
        </form>
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)}>
        <div className='header__small-menu'>
          <ul>
            {menu.map((x, index) => (
              <li key={index}>
                <span onClick={() => toggleOpenMenu(index)}>{x.title}</span>
                <ul className={x.status ? 'open' : ''}>
                  {x.submenu.map((y, _index) => (
                    <li key={_index}>
                      <Link to={y.link}>{y.label}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </Drawer>
      <div className='header__left'>
        <span className='header__left__list'>
          <IconButton
            onClick={() => setOpenMenu(true)}
            style={{ color: '#fff' }}
          >
            <MenuIcon />
          </IconButton>
        </span>
        <img onClick={() => history.push('/')} src='/images/logo.svg' alt='' />
        <div className='header__left__menu'>
          <ul style={{ margin: 0 }}>
            <li>
              <Link to='' onClick={(e) => e.preventDefault()}>
                Movies
              </Link>
              <ul>
                <li>
                  <Link to='/list/movie/popular'>Popular</Link>
                </li>
                <li>
                  <Link to='/list/movie/now_playing'>Now Playing</Link>
                </li>
                <li>
                  <Link to='/list/movie/upcoming'>Upcoming</Link>
                </li>
                <li>
                  <Link to='/list/movie/top_rated'>Top Rated</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to='' onClick={(e) => e.preventDefault()}>
                TV Shows
              </Link>
              <ul>
                <li>
                  <Link to='/list/tv/popular'>Popular</Link>
                </li>
                <li>
                  <Link to='/list/tv/airing_today'> Airing Today</Link>
                </li>
                <li>
                  <Link to='/list/tv/on_the_air'>On TV</Link>
                </li>
                <li>
                  <Link to='/list/tv/top_rated'>Top Rated</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to='' onClick={(e) => e.preventDefault()}>
                People
              </Link>
              <ul>
                <li>
                  <Link to='/list/person/popular'>Popular People</Link>
                </li>
              </ul>
            </li>
            <li>
              <a href=''>More</a>
              <ul>
                <li>
                  <a href=''>Discussions</a>
                </li>
                <li>
                  <a href=''>Leadeboard</a>
                </li>
                <li>
                  <a href=''>Support</a>
                </li>
                <li>
                  <a href=''>API</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className='header__right'>
        <div className='header__right__add'>
          <BiPlusMedical />
        </div>
        <span className='header__right__language'>VI</span>
        <span className='header__right__nof'>
          <BsBellFill />
          <span>
            <span>1</span>
          </span>
        </span>
        <span className='header__right__user'>
          <span>L</span>
        </span>
        {openSearch ? (
          <span
            style={{ color: 'grey' }}
            className='header__right__icon-search'
            onClick={() => setOpenSearch(false)}
          >
            <AiOutlineClose />
          </span>
        ) : (
          <span
            className='header__right__icon-search'
            onClick={() => setOpenSearch(true)}
          >
            <AiOutlineSearch />
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
