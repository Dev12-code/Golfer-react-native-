import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageUtils = {
  getStringValue: async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      // read error
    }
  },

  getObjectValue: async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // read error
    }
  },

  setStringValue: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // save error
    }
  },

  setObjectValue: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // save error
    }
  },

  removeValue: async (key) => {
    try {
      return await AsyncStorage.removeItem(key);
    } catch (e) {
      // read error
    }
  },
};
