import axios from "axios";
import { appConfig } from "../config/app";
import { StorageUtils } from "./storage";

export const request = axios.create({
  baseURL: "https://api.rabbitcards.com/api",
  // baseURL: "http://api.rabbitcards.com:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export function setupHttpConfig() {
  request.defaults.baseURL = appConfig.emailAuthAPIEndPoint;
  request.defaults.timeout = appConfig.defaultTimeout;
  axios.defaults.headers['Content-Type'] = "application/json";
}

export const signUpRequestProd = axios.create({
  baseURL: "https://api.rabbitcards.com/api",
  // baseURL: "http://api.rabbitcards.com:3000/api",

  headers: {
    "Content-Type": "application/json",
  },
});

export const signUpRequestTest = axios.create({
  baseURL: "http://3.143.227.24:3000/test/api",
  headers: {
    "Content-Type": "application/json",
  },
});


request.interceptors.request.use(async (config) => {
  const newConfig = { ...config };
  const newURL = await StorageUtils.getStringValue("url");
  newConfig.baseURL =
    newURL != null ? newURL : "https://api.rabbitcards.com/api";
    // newURL != null ? newURL : "http://api.rabbitcards.com:3000/api";

  return newConfig;
});

export const setAuthorizationToken = (key) => {
  request.defaults.headers["x-access-token"] = key;
};
