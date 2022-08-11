import * as constant from '../../constants';

export const getAllGolfers = (payload) => ({
  type: constant.GET_ALL_GOLFERS,
  payload,
});

export const getAllGolfersSuccess = (payload) => ({
  type: constant.GET_ALL_GOLFERS_SUCCESS,
  payload,
});

export const getAllGolfersError = (payload) => ({
  type: constant.GET_ALL_GOLFERS_ERROR,
  payload,
});

export const getGolfer = (payload) => ({
  type: constant.GET_GOLFER,
  payload,
});

export const getGolferSuccess = (payload) => ({
  type: constant.GET_GOLFER_SUCCESS,
  payload,
});

export const getGolferError = (payload) => ({
  type: constant.GET_GOLFER_ERROR,
  payload,
});

export const setTab = (payload) => ({
  type: constant.SET_TAB,
  payload,
});
