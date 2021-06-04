import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const PeopleSearch = ({ data }) => {
  return (
    <Link to={`/detail/person/${data.id}`} className='peopleSearch d-flex'>
      <img
        src={
          data.profile_path
            ? `https://www.themoviedb.org/t/p/w90_and_h90_face/${data.profile_path}`
            : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
        }
        alt=''
      />
      <div className='peopleSearch__info d-flex flex-column justify-content-center '>
        <h3>{data.name}</h3>
        <p>
          {data.known_for_department} •{' '}
          {data.known_for.map((x) => x.title || x.name).join(', ')}
        </p>
      </div>
    </Link>
  );
};

export default PeopleSearch;
