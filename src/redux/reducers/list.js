import * as types from '../constants';
export const listReducer = (
  state = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
    loading: false,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_LIST_REQUEST:
      return { ...state, loading: true };
    case types.GET_LIST_SUCCESS:
      return {
        ...state,
        page: payload.page,
        results: payload.isNew
          ? payload.results
          : [...state.results, ...payload.results],
        total_pages: payload.total_pages,
        total_results: payload.total_results,
        loading: false,
      };
    case types.GET_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
