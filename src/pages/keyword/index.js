import React, { useEffect, useState } from 'react';
import './style.scss';
import MovieHorizontal from '../search/movie';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { searchByKeyword } from '../../redux/actions/keyword';
import { BiCaretDown } from 'react-icons/bi';

const KeywordPage = () => {
  const { query, type } = useParams();
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState('');
  const [currentType, setCurrentType] = useState(type);
  const [options, setOptions] = useState({});
  const { page, total_pages, total_results, results } = useSelector(
    (state) => state.keyword
  );

  useEffect(() => {
    setOptions({
      [currentType === 'movie' ? 'Movies' : 'TV Shows']: [
        {
          label: 'Movies',
          type: 'media_type',
          value: 'movie',
          isActive: currentType === 'movie',
        },
        {
          label: 'TV Shows',
          type: 'media_type',
          value: 'tv',
          isActive: currentType === 'tv',
        },
      ],
      Sort: [
        {
          label: 'Popularity Desc',
          type: 'sort',
          value: 'popularity.desc',
          isActive: sortBy === 'popularity.desc',
        },
        {
          label: 'Popularity Asc',
          type: 'sort',
          value: 'popularity.asc',
          isActive: sortBy === 'popularity.asc',
        },
        {
          label:
            currentType === 'movie'
              ? 'Release Date Desc'
              : 'First Air Date Desc',
          type: 'sort',
          value:
            currentType === 'movie'
              ? 'primary_release_date.desc'
              : 'first_air_date.desc',
          isActive:
            currentType === 'movie'
              ? sortBy === 'primary_release_date.desc'
              : sortBy === 'first_air_date.desc',
        },
        {
          label:
            currentType === 'movie' ? 'Release Date Asc' : 'First Air Date Asc',
          type: 'sort',
          value:
            currentType === 'movie'
              ? 'primary_release_date.asc'
              : 'first_air_date.asc',
          isActive:
            type === 'movie'
              ? sortBy === 'primary_release_date.asc'
              : sortBy === 'first_air_date.asc',
        },
        {
          label: 'Rating Desc',
          type: 'sort',
          value: 'vote_average.desc',
          isActive: sortBy === 'vote_average.desc',
        },
        {
          label: 'Rating Asc',
          type: 'sort',
          value: 'vote_average.asc',
          isActive: sortBy === 'vote_average.asc',
        },
      ],
    });
  }, [currentType, sortBy]);
  console.log(options);

  useEffect(() => {
    let params = {
      page: 1,
    };
    if (sortBy) {
      params.sort_by = sortBy;
    }
    dispatch(searchByKeyword(query.split('-')[0], currentType, params, true));
  }, [dispatch, currentType, sortBy]);

  const handleLoadMore = () => {
    let params = {
      page: page + 1,
    };
    if (sortBy) {
      params.sort_by = sortBy;
    }
    dispatch(searchByKeyword(query.split('-')[0], currentType, params, false));
  };

  const handleChange = (option) => {
    console.log(option);
    if (option.type === 'media_type') setCurrentType(option.value);
    if (option.type === 'sort') setSortBy(option.value);
  };

  return (
    <div className='keywordPage'>
      <div className='wrapper'>
        <div className='keywordPage__header d-flex justify-content-between align-items-center'>
          <h2 style={{ fontWeight: 700 }}>{query.split('-')[1]}</h2>
          <h4 style={{ fontWeight: 700, opacity: '0.6' }}>
            {total_results} {currentType === 'movie' ? 'movies' : 'tv shows'}
          </h4>
        </div>
      </div>
      <div className='keywordPage__filter d-flex justify-content-center align-items-center'>
        <ul className='main-menu d-flex align-items-center'>
          {Object.keys(options).map((key, index) => {
            return (
              <li key={index}>
                <span>{key}</span>
                <span>
                  <BiCaretDown />
                </span>
                <ul className='sub-menu'>
                  {options[key].map((x, _index) => {
                    return (
                      <li
                        className={`${x.isActive ? 'active' : ''}`}
                        key={_index}
                        onClick={() => handleChange(options[key][_index])}
                      >
                        {x.label}
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='keywordPage__main'>
        {results?.map((x, index) => (
          <MovieHorizontal
            key={index}
            keyword
            keywordType={currentType}
            data={x}
          />
        ))}
        {page + 1 <= total_pages && (
          <button
            className='keywordPage__main__loadmore'
            onClick={handleLoadMore}
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
};

export default KeywordPage;
