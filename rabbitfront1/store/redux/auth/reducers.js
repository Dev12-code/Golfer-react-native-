import * as constants from '../../constants';

const initialState = {
  signUpLoading: false,
  signUpSuccess: false,
  user: {},
  signUpErrorMsg: undefined,
  loginError: undefined,
  appLoading: true,
  loggedIn: false,
  updateProfileLoading: false,
  updateProfileError: '',
  uploadImageLoading: false,
  uploadImageError: undefined,
  fbSignUpLoading: false,
  appleSignUpLoading: false,
  socialAuthError: undefined,
  logOutLoading: false,
  resetPasswordLoading: false,
  resetPasswordError: undefined,
  loading: false,
};

export default authReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SIGNUP:
      return { ...state, signUpSuccess: false, signUpLoading: true, signUpErrorMsg: undefined };
    case constants.SIGNUP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpSuccess: true,
        user: action.user,
        signUpErrorMsg: undefined,
        loggedIn: false,
      };
    case constants.SIGNUP_ERROR:
      return { ...state, signUpSuccess: false, signUpLoading: false, signUpErrorMsg: action.error };

    case constants.LOGIN:
      return { ...state, signUpLoading: true, loginError: undefined };
    case constants.LOGIN_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        user: action.user,
        loginError: undefined,
        loggedIn: action.user ? true : false,
        Introduce: action.user.signin_flag,

      };
    case constants.LOGIN_ERROR:
      return { ...state, signUpLoading: false, loginError: action.error };

    case constants.CLEAR_SIGNUP_ERROR:
      return { ...state, signUpErrorMsg: undefined };

    case constants.CLEAR_LOGIN_ERROR:
      return { ...state, loginError: undefined };

    case constants.GET_LOGGED_USER:
      return { ...state, appLoading: true };
    case constants.GET_LOGGED_USER_SUCCESS:
      return {
        ...state,
        appLoading: false,
        user: action.user,
        loggedIn: action.user ? true : false,
      };
   case constants.GET_LOGGED_USER_ERROR:
    return { ...state,  user: {}, loggedIn: false, appLoading: false };

    case constants.UPDATE_PROFILE:
      return { ...state, updateProfileLoading: true };
    case constants.UPDATE_PROFILE_SUCCESS:
      return { ...state, updateProfileLoading: false, user: action.user };
    case constants.UPDATE_PROFILE_ERROR:
      return {
        ...state,
        updateProfileLoading: false,
        updateProfileError: action.error,
      };

    case constants.UPLOAD_IMAGE:
      return { ...state, uploadImageLoading: true, uploadImageError: undefined };
    case constants.UPLOAD_IMAGE_SUCCESS:
      return { ...state, uploadImageLoading: false, user: action.user };
    case constants.UPLOAD_IMAGE_ERROR:
      return {
        ...state,
        uploadImageLoading: false,
        uploadImageError: action.error,
      };

    case constants.FACEBOOK_SIGNUP:
      return { ...state, fbSignUpLoading: true, socialAuthError: undefined };
    case constants.FACEBOOK_SIGNUP_SUCCESS:
      return {
        ...state,
        fbSignUpLoading: false,
        user: { ...action.user },
        socialAuthError: undefined,
        loggedIn: action.user ? true : false,
      };
    case constants.FACEBOOK_SIGNUP_ERROR:
      return { ...state, fbSignUpLoading: false, socialAuthError: action.error };

    case constants.APPLE_SIGNUP:
      return { ...state, appleSignUpLoading: true, socialAuthError: undefined };
    case constants.APPLE_SIGNUP_SUCCESS:
      return {
        ...state,
        appleSignUpLoading: false,
        user: { ...action.user },
        socialAuthError: undefined,
        loggedIn: action.user ? true : false,
      };
    case constants.APPLE_SIGNUP_ERROR:
      return {
        ...state,
        appleSignUpLoading: false,
        socialAuthError: action.error,
      };

    case constants.LOGOUT_USER:
      return { ...state, logOutLoading: true };
    case constants.LOGOUT_USER_SUCCESS:
      return { ...state, logOutLoading: false, user: {}, loggedIn: false, appLoading: false };
    case constants.LOGOUT_USER_ERROR:
      return { ...state, logOutLoading: false };
    case constants.UPDATE_NOTIFICATION_IN_USER:
      return { ...state, user: { ...state.user, ...action.notifications, appLoading: false } };
    case constants.RESET_PASSWORD:
      return { ...state, resetPasswordLoading: true, error: undefined };
    case constants.RESET_PASSWORD_SUCCESS:
      return { ...state, resetPasswordLoading: false, error: undefined };
    case constants.RESET_PASSWORD_ERROR:
      return { ...state, resetPasswordLoading: false, error: action.error };
    case constants.RESET_TEMP_PASSWORD:
      return { ...state, loading: true, error: undefined };
    case constants.RESET_TEMP_PASSWORD_SUCCESS:
      return { ...state, loading: false, error: undefined };
    case constants.RESET_TEMP_PASSWORD_ERROR:
      return { ...state, loading: false, error: action.error };
    case constants.VERIFY_CODE:
      return { ...state, loading: true, error: undefined };
    case constants.VERIFY_CODE_SUCCESS:
      return { ...state, loading: false, error: undefined };
    case constants.VERIFY_CODE_ERROR:
      return { ...state, loading: false, error: action.error };
    case constants.VERIFY_EMAIL:
      return { ...state, loading: true, error: undefined };
    case constants.VERIFY_EMAIL_SUCCESS:
      return { ...state, loading: false, error: undefined };
    case constants.VERIFY_EMAIL_ERROR:
      return { ...state, loading: false, error: action.error };
    case constants.TOKEN_CODE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export const user = (state) => state.auth;
