import { StyleSheet, Dimensions} from 'react-native';

const width = '20%';
const height = '100%';

export default StyleSheet.create({
  boxContainer: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gold',
    color: '#FFF'
  },
  textIcon: {
    top: -15,
    fontSize: 12,
  }
});