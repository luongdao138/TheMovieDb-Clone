import { Grid } from '@material-ui/core';
import React, { createContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Filter from '../../components/filter';
import Movie from '../../components/movie';
import Person from '../../components/person.js';
import { getList } from '../../redux/actions/list';
import { filterList } from '../../redux/actions/search';
import './style.scss';

export const ListContext = createContext();

const ListPage = () => {
  const { param1, param2 } = useParams();
  const dispatch = useDispatch();
  const [isFilter, setIsFilter] = useState(false);
  const [searchData, setSearchData] = useState(null);
  useEffect(() => {
    dispatch(getList(param1, param2, 1, true));
  }, [param1, param2]);

  const { page, results, total_pages, total_results, loading } = useSelector(
    (state) => state.list
  );

  const handleLoadmore = () => {
    if (!isFilter) {
      dispatch(getList(param1, param2, page + 1, false));
    } else {
      dispatch(filterList(param1, searchData, page + 1, false));
    }
  };

  return (
    <div style={{ marginTop: '82px' }}>
      <ListContext.Provider value={{ setIsFilter, setSearchData }}>
        <h2 className='list__title'>
          {param2} {param1 === 'person' ? 'People' : param1}
        </h2>
        <Grid container className='list'>
          {param1 !== 'person' && (
            <Grid item xs={12} md={3}>
              <div className='list__left'>
                <Filter type={param1} type2={param2} />
              </div>
            </Grid>
          )}
          <Grid item xs={12} md={param1 !== 'person' ? 9 : 12}>
            <div className='list__right'>
              {results?.map((data, index) => (
                <div className='list__right__item' key={index}>
                  {param1 === 'person' ? (
                    <Person person={data} list />
                  ) : (
                    <Movie type={param1} movie={data} list />
                  )}
                </div>
              ))}
              {page < total_pages && (
                <button onClick={handleLoadmore} className='list__right__btn'>
                  Load More
                </button>
              )}
            </div>
          </Grid>
        </Grid>
      </ListContext.Provider>
    </div>
  );
};

export default ListPage;
