import { StyleSheet } from 'react-native';

const PRIMARY_BACKGROUND_COLOR = '#19224d';


export default StyleSheet.create({
  current: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  currentTemp: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  currentDescription: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 15,
  },
  largeIcon: {
    width: 50,
    height: 50,
  }
});
