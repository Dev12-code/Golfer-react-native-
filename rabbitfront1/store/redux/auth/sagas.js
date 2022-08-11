import { Alert } from "react-native";
import { put, call, takeEvery, takeLatest } from "redux-saga/effects";
import { request, signUpRequestProd, signUpRequestTest, setAuthorizationToken } from "../../../utils/http";
import * as actions from "./actions";
import * as constants from "../../constants";
import { getServerError } from "../../../utils/helpers";
import { StorageUtils } from "../../../utils/storage";

// function signUp(auth) {
//   request.defaults.headers["x-access-token"] = null;
//   return request.post("/auth/signup", auth);
// }

function signUpProd(auth) {
  signUpRequestProd.defaults.headers["x-access-token"] = null;
  console.log("API : url : signUpProd : /auth/signup")
  console.log("API : params : signUpProd : ",auth)
  return signUpRequestProd.post("/auth/signup", auth);
}
function signUpTest(auth) {
  signUpRequestTest.defaults.headers["x-access-token"] = null;
  console.log("API : url : signUpTest : /auth/signup")
  console.log("API : params : signUpTest : ",auth)
  return signUpRequestTest.post("/auth/signup", auth);
}

function login(auth) {
  request.defaults.headers["x-access-token"] = null;
  console.log("login payload : ",auth );
  return request.post("/auth/signin", auth);
}

function* handleSignUp({ auth }) {
  try {

    // const result = yield call(signUp, auth);
    // const result1 = yield call(signUpTest, auth);
    const result = yield call(signUpProd, auth);
    StorageUtils.setStringValue("@token", result.data.accessToken);
    StorageUtils.setStringValue("@userId", result.data.id.toString());
    setAuthorizationToken(result.data.accessToken);

    yield put(actions.signUpSuccess(result.data));
  } catch (err) {
    const error =
      getServerError(err.response.data.message) ||
      JSON.stringify(err.response || err);
    yield put(
      actions.signUpError(error || "An error occurred when trying to sign Up")
    );
  }
}

function* handleLogin({ auth }) {
  try {
    const result = yield call(login, auth);
    console.log("signin result success : ",result);
    StorageUtils.setStringValue("@token", result.data.accessToken);

    StorageUtils.setStringValue("@userId", result.data.id.toString());
    
    setAuthorizationToken(result.data.accessToken);
    yield put(actions.loginSuccess(result.data));
  } catch (err) {
    console.log("signin result error : ",err);
    const error =
      getServerError(err.response.data.message) ||
      JSON.stringify(err.response || err);
    yield put(
      actions.loginError(error || "An error occurred when trying to sign Up")
    );
  }
}

function getMyProfileApi({ userId }) {
  return request.get(`/user/${userId}/`);
}

function* handleLoggedInUser() {
  try {
    const token = yield call(StorageUtils.getStringValue, "@token");
    setAuthorizationToken(token);

    if (token) {

      const result = yield call(getUserDataFromTokenApi);
      const user = result.data;
      yield put(actions.getLoggedUserSuccess(user));
    } else {

      yield put(actions.getLoggedUserError());
    }
  } catch (err) {

    const error =
      getServerError(err.response?.data) || JSON.stringify(err.response || err);
    yield put(
      actions.logOut(error || "Your session is expired. Please login again.")
    );
  }
}

function updateProfileApi(id, profile) {
  return request.patch(`/user/${id}/`, profile);
}

function* handleUpdateProfile({ id, profile, onSuccess, onError }) {
  try {
    const { email, name, ...newProfile } = profile;
    const token = yield call(StorageUtils.getStringValue, "@token");
    request.defaults.headers["x-access-token"] = `${token}`;
    const result = yield call(updateProfileApi, id, newProfile);
    yield put(actions.updateProfileSuccess(result.data));
    yield call(onSuccess);
  } catch (e) {
    yield call(onError, e.response.data);
    console.error(e.response.data);
    yield put(
      actions.updateProfileError(
        e.response?.data?.message || "An error occurred when updating data"
      )
    );
  }
}

function uploadImageApi(id, body) {
  return request.patch(`/user/${id}/`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

function* handleUploadImage({ id, picture }) {
  try {
    const data = new FormData();
    data.append("profile_picture", {
      uri: picture.uri,
      type: picture.type,
      name: picture.name,
    });

    const result = yield call(uploadImageApi, id, data);
    yield put(actions.uploadImageSuccess(result.data));
  } catch (e) {
    yield put(
      actions.uploadImageError(
        "An error occurred when trying to upload pet image"
      )
    );
  }
}

function facebookSignUp(auth) {
  request.defaults.headers.Authorization = null;
  return request.post("/facebook/", auth);
}

function* handleFacebookSignUp({ auth, onSuccess }) {
  try {
    const result = yield call(facebookSignUp, auth);
    request.defaults.headers["x-access-token"] = result.data.accessToken;
    StorageUtils.setStringValue("@token", result.data.accessToken);
    StorageUtils.setStringValue("@userId", result.data.id.toString());
    yield put(actions.facebookSignUpSuccess(result.data));
    onSuccess && onSuccess();
  } catch (e) {
    const error = (e.response?.data?.non_field_errors).toString();
    const message = error || "An error occurred when sign Up";
    Alert.alert(message);
    yield put(actions.facebookSignUpError(message));
  }
}

const appleSignUpApi = (auth) => {
  request.defaults.headers.Authorization = null;
  return request.post("/social/token/apple-id/", auth);
};

const getUserDataFromTokenApi = () => {
  return request.get("/auth/me");
};

function* handleAppleSignUp({ auth, onSuccess, onError }) {
  try {
    const result = yield call(appleSignUpApi, auth);
    const userData = yield call(getUserDataFromTokenApi, result.data.token);
    request.defaults.headers["x-access-token"] = result.data.token;
    StorageUtils.setStringValue("@token", result.data.token);
    StorageUtils.setStringValue("@userId", userData.data.user.id.toString());
    setAuthorizationToken(result.data.token);
    yield put(actions.appleSignUpSuccess(userData.data.user));
    onSuccess && onSuccess();
  } catch (e) {
    yield call(onError);
    yield put(
      actions.appleSignUpError(
        e.response?.data?.message || "An error occurred when sign Up"
      )
    );
  }
}

function logOutApi() {
  return request.post("/logout/");
}

function* handleLogOut() {
  try {
    // yield call(logOutApi);
    yield call(StorageUtils.removeValue, "@token");
    request.defaults.headers["x-access-token"] = "";
    yield put(actions.logOutSuccess());
  } catch (e) {
    yield put(actions.logOutError());
  }
}

export function resetPass(payload) {
  return request.post("/profile/reset", payload);
}

function* handleResetPassword({ payload }) {
  try {
    const { inputs, navigation } = payload;
    const result = yield call(resetPass, inputs);
    yield put(actions.resetPasswordSuccess());
    yield put(actions.logOut());
    Alert.alert("Success");
  } catch (err) {
    const error =
      getServerError(err.response?.data.message) ||
      JSON.stringify(err.response || err);
    yield put(
      actions.resetPasswordError(
        error || "An error occurred when trying to sign Up"
      )
    );
  }
}

export function resetTempPass(payload) {
  return request.post("/auth/reset", payload);
}

function* handleResetTempPassword({ payload }) {
  try {
    const { inputs, navigation } = payload;
    const result = yield call(resetTempPass, inputs);
    yield put(actions.resetTempPasswordSuccess());
    yield put(actions.logOut());
    navigation.navigate("Sign In");
    Alert.alert("Success");
  } catch (err) {
    const error =
      getServerError(err.response?.data.message) ||
      JSON.stringify(err.response || err);
    yield put(
      actions.resetTempPasswordError(
        error || "An error occurred when trying to sign Up"
      )
    );
  }
}

export function verifyEmail(payload) {
  return request.post("/auth/verify/email", payload);
}

function* handleVerifyEmail({ payload }) {
  try {
    const { inputs, navigation, nextScreen } = payload;
    const result = yield call(verifyEmail, inputs);
    yield put(actions.verifyEmailSuccess());
    navigation.navigate("SentEmail", { inputs });
  } catch (err) {
    const { inputs, navigation, nextScreen } = payload;
    navigation.navigate(nextScreen);
    const error =
      getServerError(err.response?.data) || JSON.stringify(err.response || err);
    yield put(
      actions.verifyEmailError(
        error || "An error occurred when trying to sign Up"
      )
    );
  }
}

export function verifyCode(params) {
  request.defaults.headers.Authorization = null;
  return request.post("/auth/verify/code", params);
}

function* handleVerifyCode({ payload }) {
  try {
    const { params, navigation } = payload;
    const result = yield call(verifyCode, params);
    yield put(actions.verifyCodeSuccess());
    navigation.navigate("Reset Password", { params });
  } catch (err) {
    const error =
      getServerError(err.response?.data) || JSON.stringify(err.response || err);
    yield put(
      actions.verifyCodeError(
        error || "An error occurred when trying to sign Up"
      )
    );
  }
}

export function UpdateToken(params) {
  // request.defaults.headers.Authorization = null;
  // console.log("/test/user/update_device_token", params , request.toString());
  return request.post("/test/user/update_device_token", params);
}

function* handleUpdateToken({ payload }) {
  try {
    // const { params, navigation } = payload;
    const result = yield call(UpdateToken, payload);
    yield put(actions.updateDeviceTokenSuccess());
    // navigation.navigate("Reset Password", { params });
  } catch (err) {
    const error =
      getServerError(err.response?.data) || JSON.stringify(err.response || err);
    yield put(
      actions.updateDeviceTokenError(
        error || "An error occurred when trying to sign Up"
      )
    );
  }
}

export default [
  takeLatest(constants.VERIFY_CODE, handleVerifyCode),
  takeLatest(constants.VERIFY_EMAIL, handleVerifyEmail),
  takeLatest(constants.RESET_PASSWORD, handleResetPassword),
  takeLatest(constants.RESET_TEMP_PASSWORD, handleResetTempPassword),
  takeLatest(constants.SIGNUP, handleSignUp),
  takeEvery(constants.GET_LOGGED_USER, handleLoggedInUser),
  takeLatest(constants.UPDATE_PROFILE, handleUpdateProfile),
  takeLatest(constants.UPLOAD_IMAGE, handleUploadImage),
  takeLatest(constants.LOGIN, handleLogin),
  takeLatest(constants.FACEBOOK_SIGNUP, handleFacebookSignUp),
  takeLatest(constants.LOGOUT_USER, handleLogOut),
  takeLatest(constants.APPLE_SIGNUP, handleAppleSignUp),
  takeLatest(constants.TOKEN_CODE, handleUpdateToken),

];
