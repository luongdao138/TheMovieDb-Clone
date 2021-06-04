import * as types from '../constants';

const initState = {
  list: [],
  loading: false,
};

export const genreReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GENRES_REQUEST:
      return { ...state, loading: true };
    case types.GENRES_SUCCESS:
      return {
        ...state,
        list: payload,
        loading: false,
      };
    case types.GENRES_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const certificationReducer = (
  state = {
    list: [],
    loading: false,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case types.CERTIFICATIONS_REQUEST:
      return { ...state, loading: true };
    case types.CERTIFICATIONS_SUCCESS:
      return {
        ...state,
        list: payload,
        loading: false,
      };
    case types.CERTIFICATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const languagesReducer = (
  state = {
    list: [],
    loading: false,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case types.LANGUAGES_REQUEST:
      return { ...state, loading: true };
    case types.LANGUAGES_SUCCESS:
      return {
        ...state,
        list: payload,
        loading: false,
      };
    case types.LANGUAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const watchRegionsReducer = (
  state = {
    list: [],
    loading: false,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case types.WATCH_REGIONS_REQUEST:
      return { ...state, loading: true };
    case types.WATCH_REGIONS_SUCCESS:
      return {
        ...state,
        list: payload,
        loading: false,
      };
    case types.WATCH_REGIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
