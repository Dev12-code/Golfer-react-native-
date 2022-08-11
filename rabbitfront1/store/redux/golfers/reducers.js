import * as constants from '../../constants';

const initialState = {
  loading: false,
  error: undefined,
  golfers: [],
  golfer: undefined,
  bio: [],
  tab: ''
};

export default golfersReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_ALL_GOLFERS:
      return { ...state, loading: true, error: undefined };
    case constants.GET_ALL_GOLFERS_SUCCESS:
      return {
        ...state,
        loading: false,
        golfers: action.payload,
        error: undefined,
      };
    case constants.GET_ALL_GOLFERS_ERROR:
      return { ...state, loading: false, error: action.error };
    case constants.GET_GOLFER:
      return { ...state, loading: true, error: undefined };
    case constants.GET_GOLFER_SUCCESS:
      return {
        ...state,
        loading: false,
        golfer: action.payload,
        error: undefined,
      };
    case constants.GET_GOLFER_ERROR:
      return { ...state, loading: false, error: action.error };
    case constants.SET_TAB:
      // TODO: SHOULD GET MOVED
      return { ...state, tab: action.payload, error: undefined };
    default:
      return state;
  }
};

export const golfers = (state) => state.golfers;
