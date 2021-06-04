import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import './style.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import MovieSearch from './movie';
import PeopleSearch from './people';
import CompanySearch from './company';
import KeywordSearch from './keyword';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { initSearch, searchList } from '../../redux/actions/search';
import { Pagination } from '@material-ui/lab';
const initOptions = [
  {
    label: 'Movies',
    value: 1825,
    isActive: true,
    type: 'movie',
  },
  {
    label: 'TV Shows',
    value: 1825,
    isActive: false,
    type: 'tv',
  },
  {
    label: 'People',
    value: 1825,
    isActive: false,
    type: 'person',
  },
  {
    label: 'Company',
    value: 1825,
    isActive: false,
    type: 'company',
  },
  {
    label: 'Keywords',
    value: 1825,
    isActive: false,
    type: 'keyword',
  },
  {
    label: 'Collections',
    value: 1825,
    isActive: false,
    type: 'collection',
  },
];

const SearchPage = () => {
  const [options, setOptions] = useState(initOptions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const query = new URLSearchParams(useLocation().search).get('query');
  const [value, setValue] = useState(query);
  const { data, current } = useSelector((state) => state.search);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initSearch(query));
  }, [query, dispatch]);

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
      dispatch(searchList(query, options[index].type, 1));
    }
  };

  const handleChangePage = (e, newPage) => {
    dispatch(searchList(query, options[currentIndex].type, newPage));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;

    history.push(`/search?query=${value}`);
    setOptions(initOptions);
  };

  const renderSearch = () => {
    let result;
    switch (current.type) {
      case 'movie':
        result = current.results.map((x) => (
          <MovieSearch data={x} key={x.id} />
        ));
        break;
      case 'tv':
        result = current.results.map((x) => (
          <MovieSearch data={x} key={x.id} />
        ));
        break;
      case 'person':
        result = current.results.map((x) => (
          <PeopleSearch data={x} key={x.id} />
        ));
        break;
      case 'company':
        result = current.results.map((x) => (
          <CompanySearch data={x} key={x.id} />
        ));
        break;
      case 'keyword':
        result = current.results.map((x, index) => (
          <KeywordSearch data={x} key={x.id || index} />
        ));
        break;
      case 'collection':
        result = current.results.map((x, index) => (
          <MovieSearch collection data={x} key={x.id || index} />
        ));
        break;
      default:
        result = null;
        break;
    }

    return result;
  };

  return (
    <div className='search'>
      <div className='search__input'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Search for a movie, TV shows, person... '
          />
        </form>
        <span>
          <AiOutlineSearch />
        </span>
      </div>
      <div className='search__wrapper'>
        <Row>
          <Col xs={12} lg={3} className='search__results'>
            <div>
              <h3>Search Results</h3>
              <div>
                <ul>
                  {options.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => handleChange(index)}
                      className={option.isActive ? 'active' : ''}
                    >
                      <span className='label'>{option.label}</span>
                      <span className='value'>{data[option.type]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={9} className='search__list'>
            {renderSearch()}
            <div className='search__list_pagination'>
              <Pagination
                count={current.total_pages}
                page={current.page}
                onChange={handleChangePage}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SearchPage;
