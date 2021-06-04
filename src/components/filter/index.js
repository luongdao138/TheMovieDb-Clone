import React, { useState, useEffect, useContext } from 'react';
import './style.scss';
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io';
// import { sortOptions } from './options';
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  Divider,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCertifacations,
  getAllGenres,
  getAllLanguages,
  getAllWatchRegions,
} from '../../redux/actions/genre';
import { Slider } from '@material-ui/core';
import axios from '../../api';
import { TiTick } from 'react-icons/ti';
import { filterList } from '../../redux/actions/search';
import { ListContext } from '../../pages/list';

const Filter = ({ type, type2 }) => {
  console.log(type);
  const [sortOptions, setSortOptions] = useState([]);
  const { setSearchData, setIsFilter } = useContext(ListContext);

  const initState = {
    sort_by: 'popularity.desc',
    'primary_release_date.gte': '',
    'primary_release_date.lte': '',
    with_genres: '',
    release_option: 'espisode',
    certification: '',
    certification_country: 'US',
    with_original_language: '',
    watch_region: 'US',
    with_watch_providers: [],
    'vote_average.lte': 10,
    'vote_average.gte': 0,
    'vote_count.gte': 0,
    'with_runtime.lte': 400,
    'with_runtime.gte': 0,
  };

  const [values, setValues] = useState(initState);
  const [openSort, setOpenSort] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [openWatch, setOpenWatch] = useState(false);
  const [score, setScore] = useState([0, 10]);
  const [minimumVote, setMinimumVote] = useState(0);
  const [runtime, setRuntime] = useState([0, 400]);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('2021-11-30');
  const [canSearch, setCanSearch] = useState(false);
  const [watchProviders, setWatchProviders] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllGenres(type));
    dispatch(getAllCertifacations(type));
    dispatch(getAllWatchRegions());
  }, [type, dispatch]);

  useEffect(() => {
    dispatch(getAllLanguages());
  }, [dispatch]);

  useEffect(() => {
    const getWatchProviders = async () => {
      const res = await axios.get(`/watch/providers/${type}`, {
        params: {
          watch_region: values.watch_region,
        },
      });
      console.log(res);
      setWatchProviders(res.data.results);
      setValues({
        ...values,
        with_watch_providers: [],
      });
    };
    getWatchProviders();
  }, [values.watch_region]);
  useEffect(() => {
    setCanSearch(false);
    setSortOptions([
      {
        label: 'Popular descending',
        value: 'popularity.desc',
      },
      {
        label: 'Popular ascending',
        value: 'popularity.asc',
      },
      {
        label: 'Rate descending',
        value: 'vote_average.desc',
      },
      {
        label: 'Rate ascending',
        value: 'vote_average.asc',
      },
      {
        label:
          type === 'movie'
            ? 'Release date descending'
            : 'First air date descending',
        value:
          type === 'movie'
            ? 'primary_release_date.desc'
            : 'first_air_date.desc',
      },
      {
        label:
          type === 'movie'
            ? 'Release date ascending'
            : 'First air date ascending',
        value:
          type === 'movie' ? 'primary_release_date.asc' : 'first_air_date.asc',
      },

      {
        label: 'Title (A-Z)',
        value: type === 'movie' ? 'original_title.asc' : 'title.asc',
      },
      {
        label: 'Title (Z-A)',
        value: type === 'movie' ? 'original_title.desc' : 'title.desc',
      },
    ]);
    setValues(initState);
    setFrom('');
    setTo('2021-11-30');
    setOpenSort(false);
    setOpenSort(false);
    setOpenWatch(false);
    setScore([0, 10]);
    setMinimumVote(0);
    setRuntime([0, 400]);
    setOpenFilter(false);
  }, [type, type2]);

  const { list: genres } = useSelector((state) => state.genres);
  const { list: certifications } = useSelector((state) => state.certifications);
  const { list: languages } = useSelector((state) => state.languages);
  const { list: watchRegions } = useSelector((state) => state.watchRegions);

  const handleChange = ({ target }) => {
    setCanSearch(true);
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  const handleChooseGenre = (field, name) => {
    const isExist = values[field].indexOf(name);
    setCanSearch(true);

    if (isExist < 0)
      setValues((old) => ({
        ...old,
        [field]: old[field] === '' ? name : old[field].concat(`,${name}`),
      }));
    else {
      if (values[field] === name) {
        setValues((old) => ({
          ...old,
          [field]: '',
        }));
      } else {
        setValues((old) => ({
          ...old,
          [field]:
            isExist === 0
              ? old[field].replace(`${name},`, '')
              : old[field].replace(`,${name}`, ''),
        }));
      }
    }
  };

  const handleChangeScore = (e, data) => {
    setCanSearch(true);
    setScore(data);
    setValues({
      ...values,
      'vote_average.gte': data[0],
      'vote_average.lte': data[1],
    });
  };

  const handleChangeMinimumVote = (e, data) => {
    setCanSearch(true);
    setMinimumVote(data);
    setValues({
      ...values,
      'vote_count.gte': data,
    });
  };

  const handleChangeRuntime = (e, data) => {
    setCanSearch(true);
    setRuntime(data);
    setValues({
      ...values,
      'with_runtime.gte': data[0],
      'with_runtime.lte': data[1],
    });
  };

  const handleAddProvider = (id) => {
    setCanSearch(true);
    if (values.with_watch_providers?.includes(id)) {
      setValues((old) => {
        return {
          ...old,
          with_watch_providers: old.with_watch_providers?.filter(
            (x) => x !== id
          ),
        };
      });
    } else {
      setValues((old) => {
        return {
          ...old,
          with_watch_providers: [...old.with_watch_providers, id],
        };
      });
    }
  };

  const handleSubmit = () => {
    let data = {};
    data.sort_by = values.sort_by;
    if (type === 'movie') {
      data['primary_release_date.gte'] = from;
      data['primary_release_date.lte'] = to;
    } else {
      if (values.release_option === 'espisode') {
        data['air_date.gte'] = from;
        data['air_date.lte'] = to;
      } else {
        data['first_air_date.gte'] = from;
        data['first_air_date.lte'] = to;
      }
    }
    data.with_genres = values.with_genres;
    data.certification_country = values.certification_country;
    if (values.certification === '') {
      data.certification = '';
    } else {
      data.certification = values.certification
        .split(',')
        .map((x) => {
          return certifications[values.certification_country]?.find(
            (_x) => _x.order === Number(x)
          )?.certification;
        })
        .join(',');
    }
    data.with_original_language = values.with_original_language;
    data['vote_average.lte'] = values['vote_average.lte'];
    data['vote_average.gte'] = values['vote_average.gte'];
    data['vote_count.gte'] = values['vote_count.gte'];
    data['with_runtime.gte'] = values['with_runtime.gte'];
    data['with_runtime.lte'] = values['with_runtime.lte'];
    data['watch_region'] = values['watch_region'];
    data['with_watch_providers'] = values['with_watch_providers'].join(',');
    dispatch(filterList(type, data, 1, true));
    setCanSearch(false);
    setSearchData(data);
    setIsFilter(true);
  };

  return (
    <div className='filter'>
      <div className='filter__panel'>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => setOpenSort((x) => !x)}
          className='filter__panel__header d-flex justify-content-between h-54 px-3'
        >
          <span className='filter__panel__header__title'>Sort</span>
          <span>
            {openSort ? (
              <span>
                <IoIosArrowDown />
              </span>
            ) : (
              <span>
                <IoIosArrowForward />
              </span>
            )}
          </span>
        </div>
        <div className={`filter__panel__main px-3 ${!openSort && 'disappear'}`}>
          <FormControl fullWidth variant='filled'>
            <InputLabel>Sort results by</InputLabel>
            <Select
              name='sort_by'
              value={values.sort_by}
              onChange={handleChange}
            >
              {sortOptions.map((x, index) => (
                <MenuItem value={x.value} key={index}>
                  {x.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className='filter__panel'>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => setOpenFilter((x) => !x)}
          className='filter__panel__header d-flex justify-content-between h-54 px-3'
        >
          <span className='filter__panel__header__title'>Filters</span>
          <span>
            {openFilter ? (
              <span>
                <IoIosArrowDown />
              </span>
            ) : (
              <span>
                <IoIosArrowForward />
              </span>
            )}
          </span>
        </div>
        <div
          className={`filter__panel__main px-3 ${!openFilter && 'disappear'}`}
        >
          <InputLabel>
            {type === 'movie' ? 'Release date' : 'Air date'}
          </InputLabel>
          {type === 'tv' && (
            <FormControl component='fieldset'>
              <RadioGroup
                aria-label='gender'
                name='release_option'
                value={values.release_option}
                onChange={handleChange}
              >
                <FormControlLabel
                  value='espisode'
                  control={<Radio />}
                  label='Search all espisodes?'
                />
                <FormControlLabel
                  value='first'
                  control={<Radio />}
                  label='Search first air date?'
                />
              </RadioGroup>
            </FormControl>
          )}

          <TextField
            variant='filled'
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              setCanSearch(true);
            }}
            label='From'
            type='date'
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginBottom: '20px ' }}
          />
          <TextField
            variant='filled'
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              setCanSearch(true);
            }}
            label='To'
            type='date'
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Divider style={{ margin: '20px 0' }} />
          <InputLabel>Genres</InputLabel>
          <div className='genre-wrapper'>
            {genres.map((x) => (
              <span
                key={x.id}
                className={`genre-item ${
                  values.with_genres.indexOf(x.id.toString()) >= 0
                    ? 'active'
                    : ''
                }`}
                onClick={() =>
                  handleChooseGenre('with_genres', x.id.toString())
                }
              >
                {x.name}
              </span>
            ))}
          </div>
          <Divider style={{ margin: '15px 0 20px 0' }} />
          <InputLabel>Certification</InputLabel>
          <div className='genre-wrapper'>
            {certifications[values.certification_country]
              ?.sort((a, b) => a.order - b.order)
              .map((x) => (
                <span
                  key={x.certification}
                  className={`genre-item ${
                    values.certification.indexOf(x.order.toString()) >= 0
                      ? 'active'
                      : ''
                  }`}
                  onClick={() =>
                    handleChooseGenre('certification', x.order.toString())
                  }
                >
                  {x.certification}
                </span>
              ))}
          </div>
          <Divider style={{ margin: '15px 0 20px 0' }} />
          <InputLabel>Language</InputLabel>
          <FormControl fullWidth variant='filled'>
            <InputLabel>Language</InputLabel>
            <Select
              name='with_original_language'
              value={values.with_original_language}
              onChange={handleChange}
            >
              {languages?.map((x, index) => (
                <MenuItem value={x.iso_639_1} key={index}>
                  {x.english_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Divider style={{ margin: '20px 0 20px 0' }} />
          <div className='filter-slider'>
            <InputLabel>User Score</InputLabel>
            <Slider
              max={10}
              value={score}
              onChange={handleChangeScore}
              valueLabelDisplay='auto'
              step={1}
            />
          </div>
          <div className='filter-slider'>
            <InputLabel>Minimum User Votes</InputLabel>
            <Slider
              max={500}
              value={minimumVote}
              onChange={handleChangeMinimumVote}
              valueLabelDisplay='auto'
              step={50}
            />
          </div>
          <div className='filter-slider'>
            <InputLabel>Runtime</InputLabel>
            <Slider
              max={400}
              value={runtime}
              onChange={handleChangeRuntime}
              valueLabelDisplay='auto'
              step={15}
            />
          </div>
        </div>
      </div>
      <div className='filter__panel'>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => setOpenWatch((x) => !x)}
          className='filter__panel__header d-flex justify-content-between h-54 px-3'
        >
          <span className='filter__panel__header__title'>Where to watch</span>
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => setOpenWatch((x) => !x)}
          >
            {openWatch ? (
              <span>
                <IoIosArrowDown />
              </span>
            ) : (
              <span>
                <IoIosArrowForward />
              </span>
            )}
          </span>
        </div>
        <div
          className={`filter__panel__main px-3 ${!openWatch && 'disappear'}`}
        >
          <InputLabel>Country</InputLabel>
          <FormControl
            fullWidth
            variant='filled'
            style={{ marginBottom: '20px' }}
          >
            <InputLabel>Country</InputLabel>
            <Select
              name='watch_region'
              value={values.watch_region}
              onChange={handleChange}
            >
              {watchRegions?.map((x, index) => (
                <MenuItem value={x.iso_3166_1} key={index}>
                  {x.english_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <div className='watch-providers-wrapper'>
            {watchProviders
              ?.sort((a, b) => a.display_priority - b.display_priority)
              .map((x, index) => {
                return (
                  <div
                    key={index}
                    className={`watch-provider ${
                      values.with_watch_providers?.includes(x.provider_id)
                        ? 'active'
                        : ''
                    }`}
                  >
                    <div
                      style={{ position: 'relative', cursor: 'pointer' }}
                      onClick={() => handleAddProvider(x.provider_id)}
                    >
                      <img
                        src={`https://www.themoviedb.org/t/p/original${x.logo_path}`}
                        alt=''
                      />
                      <div className='check'>
                        <span>
                          <TiTick />
                        </span>
                      </div>
                    </div>
                    <span className='name'>{x.provider_name}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <button
        disabled={!canSearch}
        className={`filter__search ${canSearch ? '' : 'disabled'}`}
        onClick={handleSubmit}
      >
        Search
      </button>
    </div>
  );
};

export default Filter;
