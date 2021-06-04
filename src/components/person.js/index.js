import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const Person = ({ person }) => {
  return (
    <Link className='person' to={`/detail/person/${person.id}`}>
      <div className='person__thumbnail'>
        <img
          src={
            person.profile_path
              ? `https://www.themoviedb.org/t/p/w470_and_h470_face${person.profile_path}`
              : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
          }
          alt=''
        />
      </div>
      <div className='person__info'>
        <span className='person__info__name'> {person.name}</span>
        <span className='person__info__character'>
          {person.known_for
            ?.map((x) => {
              return x.title || x.name;
            })
            .join(',')}
        </span>
      </div>
    </Link>
  );
};

export default Person;
