import { StyleSheet} from 'react-native';
import { STYLE_CONST } from './types';

export default StyleSheet.create({

  topSafeArea: {
    flex: 0,
    backgroundColor: STYLE_CONST.PRIMARY_BACKGROUND_COLOR
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: "center",
    height: '100%',
    resizeMode: 'contain'
  }
});