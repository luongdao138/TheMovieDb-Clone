import * as types from '../constants';
import axios from '../../api';

export const initSearch = (query) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.INIT_SEARCH_REQUEST,
    });

    const res = await Promise.all([
      axios.get(`/search/movie`, {
        params: {
          query,
        },
      }),
      axios.get(`/search/tv`, {
        params: {
          query,
        },
      }),
      axios.get(`/search/company`, {
        params: {
          query,
        },
      }),
      axios.get(`/search/keyword`, {
        params: {
          query,
        },
      }),
      axios.get(`/search/person`, {
        params: {
          query,
        },
      }),
      axios.get(`/search/collection`, {
        params: {
          query,
        },
      }),
    ]);

    console.log(res.map((res) => res.data));
    dispatch({
      type: types.INIT_SEARCH_SUCCESS,
      payload: res.map((res) => res.data),
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.INIT_SEARCH_FAILURE,
      payload: error.message,
    });
  }
};

export const searchList = (query, type, page) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.SEARCH_REQUEST,
    });

    const res = await axios.get(`/search/${type}`, {
      params: {
        page,
        query,
      },
    });

    dispatch({
      type: types.SEARCH_SUCCESS,
      payload: { ...res.data, type },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.SEARCH_FAILURE,
      payload: error.message,
    });
  }
};

export const filterList =
  (type, data, page, isNew) => async (dispatch, getState) => {
    try {
      dispatch({
        type: types.GET_LIST_REQUEST,
      });

      const res = await axios.get(`/discover/${type}`, {
        params: {
          page,
          ...data,
        },
      });

      dispatch({
        type: types.GET_LIST_SUCCESS,
        payload: { ...res.data, isNew },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.GET_LIST_FAILURE,
        payload: error.message,
      });
    }
  };
