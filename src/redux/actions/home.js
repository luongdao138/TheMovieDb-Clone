import axios from '../../api';
import * as types from '../constants';

export const getHomePopular = (type) => async (dispatch) => {
  try {
    dispatch({
      type: types.GET_POPULAR_REQUEST,
    });

    const res = await axios.get(`/${type}/popular`);
    dispatch({
      type: types.GET_POPULAR_SUCCESS,
      payload: { items: res.data.results },
    });
    console.log(res);
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.GET_POPULAR_FAILURE,
      payload: error.message,
    });
  }
};

export const getHomeTrending = (type, time) => async (dispatch) => {
  try {
    dispatch({
      type: types.GET_TRENDING_REQUEST,
    });

    const res = await axios.get(`/trending/${type}/${time}`);
    console.log(res);
    dispatch({
      type: types.GET_TRENDING_SUCCESS,
      payload: { items: res.data.results },
    });
  } catch (error) {
    console.log(error);
    console.log(error);
    dispatch({
      type: types.GET_TRENDING_FAILURE,
      payload: error.message,
    });
  }
};
