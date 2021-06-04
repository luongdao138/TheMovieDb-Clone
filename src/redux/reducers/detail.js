import * as types from '../constants';

const initState = {
  detail: null,
  cast: [],
  crew: [],
  keywords: [],
  reviews: {
    results: [],
    page: [],
    type: '',
    total_pages: 0,
    total_results: 0,
  },
  videos: [],
  images: {
    posters: [],
    backdrops: [],
  },
  recommendations: [],
  credits: {
    cast: [],
    crew: [],
  },
  externals: {
    facebook_id: null,
    instagram_id: null,
    twitter_id: null,
  },
  titles: [],
  releases_date: [],
  loading: false,
};

export const detailReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.DETAIL_REQUEST:
      return { ...state, loading: true };
    case types.DETAIL_SUCCESS:
      return {
        ...state,
        detail: payload,
        loading: false,
      };
    case types.DETAIL_FAILURE:
    case types.CAST_CREW_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case types.CAST_CREW_SUCCESS:
      return {
        ...state,
        cast: payload.cast,
        crew: payload.crew,
      };
    case types.REVIEW_SUCCESS:
      return {
        ...state,
        reviews: payload,
      };
    case types.IMAGES_SUCCESS:
      return {
        ...state,
        images: {
          posters: payload.posters,
          backdrops: payload.backdrops,
          profiles: payload.profiles,
        },
        loading: false,
      };
    case types.VIDEO_SUCCESS:
      return {
        ...state,
        videos: payload,
        loading: false,
      };
    case types.RECOMMENDATIONS_SUCCESS:
      return {
        ...state,
        recommendations: payload,
        loading: false,
      };
    case types.PERSON_CREDITS_SUCCESS:
      return {
        ...state,
        credits: payload,
        loading: false,
      };
    case types.EXTERNALS_SUCCESS:
      return {
        ...state,
        externals: {
          facebook_id: payload.facebook_id,
          instagram_id: payload.instagram_id,
          twitter_id: payload.twitter_id,
        },
      };
    case types.KEYWORDS_SUCCESS:
      return {
        ...state,
        keywords: payload,
      };
    case types.ALTERNATIVE_TITLES_SUCCESS:
      return {
        ...state,
        titles: payload,
      };
    case types.RELEASES_DATE_SUCCESS:
      return {
        ...state,
        releases_date: payload,
      };
    default:
      return state;
  }
};
