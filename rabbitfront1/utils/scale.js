
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const w = (input) => {
  return input / 640 * width;
}

export const h = (input) => {
  return input / 1136 * height;
}