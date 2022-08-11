import * as constant from '../../constants';

export const signUp = (auth) => ({
  type: constant.SIGNUP,
  auth,
});

export const signUpSuccess = (user) => ({
  type: constant.SIGNUP_SUCCESS,
  user,
});

export const signUpError = (error) => ({
  type: constant.SIGNUP_ERROR,
  error,
});

export const login = (auth) => ({
  type: constant.LOGIN,
  auth,
});

export const loginSuccess = (user) => ({
  type: constant.LOGIN_SUCCESS,
  user,
});

export const loginError = (error) => ({
  type: constant.LOGIN_ERROR,
  error,
});

export const clearSignUpError = () => ({
  type: constant.CLEAR_SIGNUP_ERROR,
});

export const clearLoginError = () => ({
  type: constant.CLEAR_LOGIN_ERROR,
});

export const getLoggedUser = () => ({
  type: constant.GET_LOGGED_USER,
});

export const getLoggedUserSuccess = (user) => ({
  type: constant.GET_LOGGED_USER_SUCCESS,
  user,
});

export const getLoggedUserError = () => ({
  type: constant.GET_LOGGED_USER_ERROR,
});


export const updateProfile = (id, profile, onSuccess, onError) => ({
  type: constant.UPDATE_PROFILE,
  id,
  profile,
  onSuccess,
  onError,
});

export const updateProfileSuccess = (user) => ({
  type: constant.UPDATE_PROFILE_SUCCESS,
  user,
});

export const updateProfileError = (error) => ({
  type: constant.UPDATE_PROFILE_ERROR,
  error,
});

export const uploadImage = (id, picture) => ({
  type: constant.UPLOAD_IMAGE,
  id,
  picture,
});

export const uploadImageSuccess = (user) => ({
  type: constant.UPLOAD_IMAGE_SUCCESS,
  user,
});

export const uploadImageError = (error) => ({
  type: constant.UPLOAD_IMAGE_ERROR,
  error,
});

export const facebookSignUp = (auth, onSuccess) => ({
  type: constant.FACEBOOK_SIGNUP,
  auth,
  onSuccess,
});

export const facebookSignUpSuccess = (user) => ({
  type: constant.FACEBOOK_SIGNUP_SUCCESS,
  user,
});

export const facebookSignUpError = (error) => ({
  type: constant.FACEBOOK_SIGNUP_ERROR,
  error,
});

export const appleSignUp = (auth, onSuccess, onError) => ({
  type: constant.APPLE_SIGNUP,
  auth,
  onSuccess,
  onError,
});

export const appleSignUpSuccess = (user) => ({
  type: constant.APPLE_SIGNUP_SUCCESS,
  user,
});

export const appleSignUpError = (error) => ({
  type: constant.APPLE_SIGNUP_ERROR,
  error,
});

export const logOut = () => ({
  type: constant.LOGOUT_USER,
});

export const logOutSuccess = () => ({
  type: constant.LOGOUT_USER_SUCCESS,
});

export const logOutError = (error) => ({
  type: constant.LOGOUT_USER_ERROR,
  error
});

export const resetPassword = (payload) => ({
  type: constant.RESET_PASSWORD,
  payload
})

export const resetPasswordError = (error) => ({
  type: constant.RESET_PASSWORD_ERROR,
  error
})

export const resetPasswordSuccess = () => ({
  type: constant.RESET_PASSWORD_SUCCESS,
})

export const resetTempPassword = (payload) => ({
  type: constant.RESET_TEMP_PASSWORD,
  payload
})

export const resetTempPasswordError = (error) => ({
  type: constant.RESET_TEMP_PASSWORD_ERROR,
  error
})

export const resetTempPasswordSuccess = () => ({
  type: constant.RESET_TEMP_PASSWORD_SUCCESS,
})

export const verifyEmail = (payload) => ({
  type: constant.VERIFY_EMAIL,
  payload
})

export const verifyEmailError = (error) => ({
  type: constant.VERIFY_EMAIL_ERROR,
  error
})

export const verifyEmailSuccess = () => ({
  type: constant.VERIFY_EMAIL_SUCCESS,
})

export const verifyCode = (payload) => ({
  type: constant.VERIFY_CODE,
  payload
})

export const verifyCodeError = (error) => ({
  type: constant.VERIFY_CODE_ERROR,
  error
})

export const verifyCodeSuccess = () => ({
  type: constant.VERIFY_CODE_SUCCESS,
})

export const updateNotificationInUser = (notifications) => ({
  type: constant.UPDATE_NOTIFICATION_IN_USER,
  notifications,
});


export const updateDeviceToken = (payload) => ({
  type: constant.TOKEN_CODE,
  payload
})

export const updateDeviceTokenError = (error) => ({
  type: constant.TOKEN_CODE_ERROR,
  error
})

export const updateDeviceTokenSuccess = () => ({
  type: constant.TOKEN_CODE_SUCCESS,
})


