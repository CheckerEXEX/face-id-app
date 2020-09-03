import { StyleSheet} from 'react-native';

const PRIMARY_BACKGROUND_COLOR = '#19224d';

export default StyleSheet.create({

  topSafeArea: {
    flex: 0,
    backgroundColor: PRIMARY_BACKGROUND_COLOR
  },
  bottomSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: "center",
    height: '100%',
    resizeMode: 'contain'
  }
});