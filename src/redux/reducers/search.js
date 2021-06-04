import * as types from '../constants';

const initState = {
  data: {
    movie: 0,
    tv: 0,
    company: 0,
    keyword: 0,
    person: 0,
    collection: 0,
  },
  current: {
    type: '',
    page: 0,
    results: [],
    totalpages: 0,
    total_results: 0,
  },
  loading: false,
};

export const searchReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.INIT_SEARCH_REQUEST:
      return { ...state, loading: true };
    case types.INIT_SEARCH_SUCCESS:
      return {
        ...state,
        data: {
          movie: payload[0].total_results,
          tv: payload[1].total_results,
          company: payload[2].total_results,
          keyword: payload[3].total_results,
          person: payload[4].total_results,
          collection: payload[5].total_results,
        },
        current: {
          type: 'movie',
          page: payload[0].page,
          results: payload[0].results,
          total_pages: payload[0].total_pages,
          total_results: payload[0].total_results,
        },
        loading: false,
      };
    case types.INIT_SEARCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          [payload.type]: payload.total_results,
        },
        current: {
          type: payload.type,
          page: payload.page,
          results: payload.results,
          total_pages: payload.total_pages,
          total_results: payload.total_results,
        },
      };
    case types.SEARCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
