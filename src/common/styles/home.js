import { StyleSheet, Dimensions } from 'react-native';
const PRIMARY_BACKGROUND_COLOR = '#19224d';

const screenHeight = Dimensions.get('window').height;

const heightHeader = 70;
const heightFooter = 70;

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
    width: '100%',
    height: heightHeader,
    paddingTop: 10
  },
  location: {
    // height: screenHeight - 65 - 100,
  },
  body: {
    flex: 1,
    width: '100%',
    height: screenHeight - heightHeader - heightFooter,
    backgroundColor: PRIMARY_BACKGROUND_COLOR
  },
  footer: {
    height : heightFooter,
    width: '100%',
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
    flexDirection: 'row',
  },
  position: {
    fontSize: 25,
    color: '#FFF',
    fontWeight: 'bold'
  },
  positionName: {
    textAlign: 'center',
    color:'#FFF',
    marginLeft: 5,
    fontSize: 15,
    justifyContent: 'center'
  },
  clock: {
    color: '#FFF',
    marginTop: 20
  },
  title: {
    fontSize: 18,
    color: '#4eab52',
    fontWeight: '700'
  },
  content_title: {
    fontSize: 12,
    color: '#4eab52',
    fontWeight: '700'
  },
  logo: {
    resizeMode: 'stretch',
    height: '100%',
    width: 65
  },
  avatar: {
    marginTop: 0,
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    width: 50,
    borderRadius: 100
  },
  avatarTitle: {
    color: '#FFF',
    fontWeight: 'bold',
    top: -5
  },
  avatarCaption: {
    color: '#FFF',
    fontSize: 12,
    lineHeight: 12,
    fontWeight: 'bold',
    top: -10
  },
  titleHeader: {
    fontSize: 10
  },
    
  lottie: {
    alignItems: "center",
    justifyContent: "center",
    width: 65,
    height: 65,
    top: -10,
  },
  // circle: {
  //   top: -15,
  //   width: 70,
  //   height: 70,
  //   borderRadius: 10,
  //   backgroundColor: 'white',
  //   zIndex: 5,
  //   elevation: 5, // works on android
  //   position: 'relative'
  // }
})
