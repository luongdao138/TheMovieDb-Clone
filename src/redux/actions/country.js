import * as types from '../constants';
import axios from '../../api';

export const getAllCountries = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.COUNTRIES_REQUEST,
    });

    const res = await axios.get('/configuration/countries');

    dispatch({
      type: types.COUNTRIES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.COUNTRIES_FAILURE,
      payload: error.message,
    });
  }
};
