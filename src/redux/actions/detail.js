import axios from '../../api';
import * as types from '../constants';

export const getDetail = (type, id) => async (dispatch) => {
  try {
    dispatch({
      type: types.DETAIL_REQUEST,
    });

    const res = await axios.get(`/${type}/${id}`);
    dispatch({
      type: types.DETAIL_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.DETAIL_FAILURE,
      payload: error.message,
    });
  }
};

export const getCastAnCrew = (type, id) => async (dispatch) => {
  try {
    dispatch({
      type: types.CAST_CREW_REQUEST,
    });

    const res = await axios.get(
      type === 'movie'
        ? `/${type}/${id}/credits`
        : `/${type}/${id}/aggregate_credits`
    );

    dispatch({
      type: types.CAST_CREW_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.CAST_CREW_FAILURE,
      payload: error.message,
    });
  }
};

export const getReviews = (type, id, page) => async (dispatch) => {
  try {
    dispatch({
      type: types.REVIEW_REQUEST,
    });

    const res = await axios.get(`/${type}/${id}/reviews`, {
      params: {
        page,
      },
    });

    dispatch({
      type: types.REVIEW_SUCCESS,
      payload: { ...res.data, type },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.REVIEW_FAILURE,
      payload: error.message,
    });
  }
};

export const getVideos = (type, id) => async (dispatch) => {
  try {
    dispatch({
      type: types.VIDEO_REQUEST,
    });

    const res = await axios.get(`/${type}/${id}/videos`, {});

    dispatch({
      type: types.VIDEO_SUCCESS,
      payload: res.data.results,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.VIDEO_FAILURE,
      payload: error.message,
    });
  }
};

export const getImages = (type, id) => async (dispatch) => {
  try {
    dispatch({
      type: types.IMAGES_REQUEST,
    });

    const res = await axios.get(`/${type}/${id}/images`, {});

    dispatch({
      type: types.IMAGES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.IMAGES_FAILURE,
      payload: error.message,
    });
  }
};

export const getRecommendations = (type, id, page) => async (dispatch) => {
  try {
    dispatch({
      type: types.IMAGES_REQUEST,
    });

    const res = await axios.get(`/${type}/${id}/recommendations`, {
      params: {
        page,
      },
    });

    dispatch({
      type: types.RECOMMENDATIONS_SUCCESS,
      payload: res.data.results,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.RECOMMENDATIONS_FAILURE,
      payload: error.message,
    });
  }
};

export const getPersonCredits = (id, page) => async (dispatch) => {
  try {
    dispatch({
      type: types.PERSON_CREDITS_REQUEST,
    });

    const res = await axios.get(`/person/${id}/combined_credits`);

    dispatch({
      type: types.PERSON_CREDITS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.PERSON_CREDITS_FAILURE,
      payload: error.message,
    });
  }
};

export const getExternals = (type, id) => async (dispatch) => {
  try {
    dispatch({
      type: types.EXTERNALS_REQUEST,
    });

    const res = await axios.get(`/${type}/${id}/external_ids`);

    dispatch({
      type: types.EXTERNALS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.EXTERNALS_FAILURE,
      payload: error.message,
    });
  }
};

export const getKeywords = (type, id) => async (dispatch) => {
  try {
    dispatch({
      type: types.KEYWORDS_REQUEST,
    });

    const res = await axios.get(`/${type}/${id}/keywords`);

    dispatch({
      type: types.KEYWORDS_SUCCESS,
      payload: type === 'movie' ? res.data.keywords : res.data.results,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.KEYWORDS_FAILURE,
      payload: error.message,
    });
  }
};

export const getAlternativeTitles = (type, id) => async (dispatch) => {
  try {
    dispatch({
      type: types.ALTERNATIVE_TITLES_REQUEST,
    });

    const res = await axios.get(`/${type}/${id}/alternative_titles`);

    dispatch({
      type: types.ALTERNATIVE_TITLES_SUCCESS,
      payload: res.data.titles || res.data.results,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.ALTERNATIVE_TITLES_FAILURE,
      payload: error.message,
    });
  }
};

export const getReleasesDate = (id) => async (dispatch) => {
  try {
    dispatch({
      type: types.RELEASES_DATE_REQUEST,
    });

    const res = await axios.get(`/movie/${id}/release_dates`);

    dispatch({
      type: types.RELEASES_DATE_SUCCESS,
      payload: res.data.results,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.RECOMMENDATIONS_FAILURE,
      payload: error.message,
    });
  }
};
