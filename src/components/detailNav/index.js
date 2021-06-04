import React from 'react';
import './style.scss';
import { BiCaretDown } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const DetailNav = ({ options }) => {
  return (
    <div className='detailNav'>
      <ul className='mainMenu'>
        {options.map((option, index) => {
          return (
            <li key={index} className={`${option.isActive ? 'active' : ''}`}>
              <p>
                {option.label}
                <span>
                  <BiCaretDown />
                </span>
              </p>
              <ul className='subMenu'>
                {option.options.map((x, _index) => {
                  return (
                    <li key={_index}>
                      <Link to={x.link}>
                        <span>{x.title}</span>
                        <span>{x.number}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DetailNav;
