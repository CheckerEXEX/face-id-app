import { Dimensions} from 'react-native';

import Constants from 'expo-constants';

export const STYLE_CONST = {
  PRIMARY_BACKGROUND_COLOR : '#19224d',
  SECONDARY_BACKGROUND_COLOR : '#a91b4b',
  SCREEN_HEIGHT : Dimensions.get('window').height,
  STATUSBAR_HEIGHT : Constants.statusBarHeight,
  HEADER_HEIGHT : 70,
  FOOTER_HEIGHT : 80,
};
