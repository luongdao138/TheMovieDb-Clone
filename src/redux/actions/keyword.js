import axios from '../../api';
import * as types from '../constants';

export const searchByKeyword =
  (id, type, params, isNew) => async (dispatch) => {
    try {
      dispatch({
        type: types.SEARCH_BY_KEYWORD_REQUEST,
      });

      const res = await axios.get(`/discover/${type}`, {
        params: { ...params, with_keywords: id },
      });
      dispatch({
        type: types.SEARCH_BY_KEYWORD_SUCCESS,
        payload: { ...res.data, type, isNew },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.SEARCH_BY_KEYWORD_FAILURE,
        payload: error.message,
      });
    }
  };
