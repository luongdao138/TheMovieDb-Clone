import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.scss';

const PersonInfo = () => {
  const { detail: person } = useSelector((state) => state.detailReducer);

  if (!person) return null;

  return (
    <div className='personInfo'>
      <div className='personInfo__img'>
        <img
          src={
            person?.profile_path
              ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${person?.profile_path}`
              : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg'
          }
          alt=''
        />
      </div>
      <Link
        style={{ marginBottom: '20px', display: 'block  ' }}
        to={`/person/${person?.id}/images/profiles`}
      >
        View all images
      </Link>
      <h1 className='text-center person__name'>{person?.name}</h1>
      <div className='personInfo__main'>
        <h1>Personal Info</h1>
        <div className='personInfo__main__item'>
          <p className='personInfo__main__item__title'>Known For</p>
          <span>{person?.known_for_department}</span>
        </div>
        <div className='personInfo__main__item'>
          <p className='personInfo__main__item__title'>Known Credits</p>
          <p className='personInfo__main__item__value'>65</p>
        </div>
        <div className='personInfo__main__item'>
          <p className='personInfo__main__item__title'>Gender</p>
          <p className='personInfo__main__item__value'>
            {person?.gender === 1 ? 'Female' : 'Male'}
          </p>
        </div>
        <div className='personInfo__main__item'>
          <p className='personInfo__main__item__title'>Birthday</p>
          {person.birthday && (
            <p className='personInfo__main__item__value'>
              {person?.birthday} (
              {new Date().getFullYear() -
                new Date(person?.birthday)?.getFullYear()}{' '}
              years old)
            </p>
          )}
        </div>
        <div className='personInfo__main__item'>
          <p className='personInfo__main__item__title'>Place of Birth</p>
          <p className='personInfo__main__item__value'>
            {person?.place_of_birth}
          </p>
        </div>
        <div className='personInfo__main__item'>
          <p className='personInfo__main__item__title'>Also Known As</p>
          {person?.also_known_as?.map((x, index) => (
            <p key={index}>{x}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonInfo;
