import axios from '../../api';
import * as types from '../constants';

export const getAllGenres = (type) => async (dispatch) => {
  try {
    dispatch({
      type: types.GENRES_REQUEST,
    });

    const res = await axios.get(`/genre/${type}/list`);
    dispatch({
      type: types.GENRES_SUCCESS,
      payload: res.data.genres,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.GENRES_FAILURE,
      payload: error.message,
    });
  }
};

export const getAllCertifacations = (type) => async (dispatch) => {
  try {
    dispatch({
      type: types.CERTIFICATIONS_REQUEST,
    });

    const res = await axios.get(`/certification/${type}/list`);
    dispatch({
      type: types.CERTIFICATIONS_SUCCESS,
      payload: res.data.certifications,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.CERTIFICATIONS_FAILURE,
      payload: error.message,
    });
  }
};

export const getAllLanguages = () => async (dispatch) => {
  try {
    dispatch({
      type: types.LANGUAGES_REQUEST,
    });

    const res = await axios.get(`/configuration/languages`);
    dispatch({
      type: types.LANGUAGES_SUCCESS,
      payload: res.data,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.LANGUAGES_FAILURE,
      payload: error.message,
    });
  }
};

export const getAllWatchRegions = () => async (dispatch) => {
  try {
    dispatch({
      type: types.WATCH_REGIONS_REQUEST,
    });

    const res = await axios.get(`/watch/providers/regions`);
    dispatch({
      type: types.WATCH_REGIONS_SUCCESS,
      payload: res.data.results,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.WATCH_REGIONS_FAILURE,
      payload: error.message,
    });
  }
};
