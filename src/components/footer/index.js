import React from 'react';
import './style.scss';

const Footer = () => {
  return (
    <div className='footer-container d-flex align-items-center'>
      <div className='footer'>
        <div className='footer__logo'>
          <img src='/images/logo_footer.svg' alt='' />
          <button>Hi luongdao!</button>
        </div>
        <div className='footer__list'>
          <h3>The basics</h3>
          <ul>
            <li>
              <a href='/about/staying-in-touch?language=vi'>Contact Us</a>
            </li>
            <li>
              <a href='/about?language=vi'>Giới thiệu về TMDb</a>
            </li>
            <li>
              <a href='/talk?language=vi'>Support Forums</a>
            </li>
            <li>
              <a href='/documentation/api?language=vi'>API</a>
            </li>
            <li>
              <a
                href='https://status.themoviedb.org/'
                target='_blank'
                rel='noopener'
              >
                System Status
              </a>
            </li>
          </ul>
        </div>
        <div className='footer__list'>
          <h3>Get Involved</h3>
          <ul>
            <li>
              <a href='/bible?language=vi'>Contribution Bible</a>
            </li>
            <li>
              <a href='/apps?language=vi'>Ứng dụng của bên thứ 3</a>
            </li>
            <li>
              <a href='/movie/new?language=vi'>Add New Movie</a>
            </li>
            <li>
              <a href='/tv/new?language=vi'>Add New TV Show</a>
            </li>
          </ul>
        </div>
        <div className='footer__list'>
          <h3>Community</h3>
          <ul>
            <li>
              <a href='/documentation/community/guidelines?language=vi'>
                Guidelines
              </a>
            </li>
            <li>
              <a href='/discuss?language=vi'>Discussions</a>
            </li>
            <li>
              <a href='/leaderboard?language=vi'>Leaderboard</a>
            </li>
            <li>
              <a
                href='https://twitter.com/themoviedb'
                target='_blank'
                rel='noopener'
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
        <div className='footer__list'>
          <h3>Legal</h3>
          <ul>
            <li>
              <a href='/documentation/website/terms-of-use?language=vi'>
                Terms of Use
              </a>
            </li>
            <li>
              <a href='/documentation/api/terms-of-use?language=vi'>
                API Terms of Use
              </a>
            </li>
            <li>
              <a href='/privacy-policy?language=vi'>Privacy Policy</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
