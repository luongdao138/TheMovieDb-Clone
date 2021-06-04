import * as types from '../constants';
export const countryReducer = (
  state = {
    results: [],
    loading: false,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case types.COUNTRIES_REQUEST:
      return { ...state, loading: true };
    case types.COUNTRIES_SUCCESS:
      return {
        ...state,
        results: payload,
        loading: false,
      };
    case types.COUNTRIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
