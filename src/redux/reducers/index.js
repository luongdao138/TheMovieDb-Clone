import { combineReducers } from 'redux';
import { countryReducer } from './country';
import { detailReducer } from './detail';
import {
  certificationReducer,
  genreReducer,
  languagesReducer,
  watchRegionsReducer,
} from './genre';
import { homeReducer } from './home';
import { keywordReducer } from './keyword';
import { listReducer } from './list';
import { searchReducer } from './search';
import { seasonReducer } from './season';

const reducers = combineReducers({
  home: homeReducer,
  list: listReducer,
  search: searchReducer,
  detailReducer,
  genres: genreReducer,
  languages: languagesReducer,
  certifications: certificationReducer,
  watchRegions: watchRegionsReducer,
  keyword: keywordReducer,
  seasonReducer,
  countries: countryReducer,
});

export default reducers;
