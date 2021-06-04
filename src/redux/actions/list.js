import * as types from '../constants';
import axios from '../../api';

export const getList =
  (param1, param2, page, isNew) => async (dispatch, getState) => {
    try {
      dispatch({
        type: types.GET_LIST_REQUEST,
      });

      const res = await axios.get(`/${param1}/${param2}`, {
        params: {
          page,
        },
      });

      dispatch({
        type: types.GET_LIST_SUCCESS,
        payload: { ...res.data, isNew },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.GET_LIST_FAILURE,
        payload: error.message,
      });
    }
  };
