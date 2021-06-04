import * as types from '../constants';

export const homeReducer = (
  state = { popular: [], trending: [], loading: false },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case (types.GET_POPULAR_REQUEST, types.GET_TRENDING_REQUEST):
      return { ...state, loading: true };
    case types.GET_POPULAR_SUCCESS:
      return { ...state, loading: false, popular: payload.items };
    case types.GET_TRENDING_SUCCESS:
      return { ...state, loading: false, trending: payload.items };
    case types.GET_POPULAR_FAILURE:
      return { ...state, loading: false, errorPopular: payload };
    case types.GET_TRENDING_FAILURE:
      return { ...state, loading: false, errorTrending: payload };
    default:
      return state;
  }
};
