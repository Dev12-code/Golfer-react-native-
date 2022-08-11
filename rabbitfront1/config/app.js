import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageUtils } from "../utils/storage";

export const appConfig = {
  emailAuthAPIEndPoint: "https://api.rabbitcards.com/api",
  golferBioEndPoint: 'https://tourapi.pgatourhq.com:8243/SyndPlayerBio/1.0.0',
  // emailAuthAPIEndPoint:
  //   StorageUtils.getStringValue("url") != null
  //     ? StorageUtils.getStringValue("url")
  //     : "https://api.rabbitcards.com/api",

  defaultTimeout: 5000,
};

export const getBaseUrl = async () => {
  try {
    return url;
  } catch (e) {
  }
};
