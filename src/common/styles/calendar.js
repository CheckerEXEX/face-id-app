import { StyleSheet} from 'react-native';
import { STYLE_CONST } from './types';

export default StyleSheet.create({
  headerStyle: {
      top: -12,
      position: 'relative',
      height: 40,
      marginBottom: -24,
      justifyContent: 'center',
      // borderTopColor: STYLE_CONST.PRIMARY_BACKGROUND_COLOR,
      // borderTopWidth: 1,
      // borderBottomColor: STYLE_CONST.PRIMARY_BACKGROUND_COLOR,
      // borderBottomWidth: 1
  },
  dayHeaderStyle: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  saturdayHeaderStyle: {
      color: '#1976d2',
      fontWeight: 'bold',
  },
  sundayHeaderStyle: {
      color: '#f44336',
      fontWeight: 'bold',
  },
  
  dayBodyStyle: {
    color: '#FFF',
  },
  saturdayBodyStyle: {
      color: '#1976d2',
  },
  sundayBodyStyle: {
      color: '#f44336',
  },
});

