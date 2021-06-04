import * as types from '../constants';
import axios from '../../api';

export const getDetailSeason =
  (id, season_number) => async (dispatch, getState) => {
    try {
      dispatch({
        type: types.DETAIL_SEASON_REQUEST,
      });

      const res = await axios.get(`/tv/${id}/season/${season_number}`);

      dispatch({
        type: types.DETAIL_SEASON_SUCCESS,
        payload: res.data,
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.DETAIL_SEASON_FAILURE,
        payload: error.message,
      });
    }
  };
