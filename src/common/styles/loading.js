import { StyleSheet} from 'react-native';
import { STYLE_CONST } from './types';

export default StyleSheet.create({
  modalBackground: {
    top: STYLE_CONST.STATUSBAR_HEIGHT,
    flexDirection: "column",
  },
  activityIndicatorWrapper: {
    backgroundColor: STYLE_CONST.PRIMARY_BACKGROUND_COLOR,
    height: STYLE_CONST.SCREEN_HEIGHT - STYLE_CONST.FOOTER_HEIGHT,
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    position:"relative"
  },
  text: {
    color: 'white',
    fontWeight: "bold",
    top: 110,
    fontSize: 16
  },
  lottie: {
    width: 100,
    height: 100,
    position: 'relative',
  }
});

