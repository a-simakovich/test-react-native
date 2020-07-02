import { Dimensions } from 'react-native';

export const Cons = {
  screen: {
    width: Dimensions.get("window").screen.width,
    height: Dimensions.get("window").scale.height
  }
};