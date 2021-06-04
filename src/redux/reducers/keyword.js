import * as types from '../constants';

export const keywordReducer = (
  state = {
    results: [],
    page: 0,
    type: 'movie',
    total_pages: 0,
    total_results: 0,
    loading: false,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case types.SEARCH_BY_KEYWORD_REQUEST:
      return { ...state, loading: true };
    case types.SEARCH_BY_KEYWORD_SUCCESS:
      return {
        ...state,
        results: payload.isNew
          ? payload.results
          : [...state.results, ...payload.results],
        page: payload.page,
        type: payload.type,
        total_pages: payload.total_pages,
        total_results: payload.total_results,
        loading: false,
      };
    case types.SEARCH_BY_KEYWORD_FAILURE:
      return { ...state, loading: false, errorPopular: payload };
    default:
      return state;
  }
};
