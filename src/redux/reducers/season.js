import * as types from '../constants';

export const seasonReducer = (
  state = {
    season: {},
    loading: false,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case types.DETAIL_SEASON_REQUEST:
      return { ...state, loading: true };
    case types.DETAIL_SEASON_SUCCESS:
      return {
        ...state,
        season: payload,
        loading: false,
      };
    case types.DETAIL_SEASON_FAILURE:
      return { ...state, loading: false, errorPopular: payload };
    default:
      return state;
  }
};
