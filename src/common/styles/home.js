import { StyleSheet, Dimensions } from 'react-native';
import { STYLE_CONST } from './types';

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: STYLE_CONST.PRIMARY_BACKGROUND_COLOR,
    width: '100%',
    height: STYLE_CONST.HEADER_HEIGHT,
    paddingTop: 10
  },
  location: {
    // height: screenHeight - 65 - 100,
  },
  body: {
    flex: 1,
    width: '100%',
    height: STYLE_CONST.SCREEN_HEIGHT - STYLE_CONST.HEADER_HEIGHT - STYLE_CONST.FOOTER_HEIGHT,
    backgroundColor: STYLE_CONST.PRIMARY_BACKGROUND_COLOR
  },
  footer: {
    height : STYLE_CONST.FOOTER_HEIGHT,
    width: '100%',
    backgroundColor: STYLE_CONST.PRIMARY_BACKGROUND_COLOR,
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
    width: 140,
    height: 140,
  },
  circle: {
    top: -18,
    width: 70,
    height: 70,
    borderRadius: 70/2,
    backgroundColor: 'white',
    borderColor: STYLE_CONST.SECONDARY_BACKGROUND_COLOR,
    borderWidth: 3,
    zIndex: 100,
    elevation: 5, // works on android
    position: 'relative'
  },
  tabFocusIn: {
    paddingTop: 8,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: STYLE_CONST.SECONDARY_BACKGROUND_COLOR
  },
  tabFocusOut: {
    paddingTop: 8,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: STYLE_CONST.PRIMARY_BACKGROUND_COLOR
  },
  tabBarBarStyle : {
    flex: 1,
    height: 60,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    elevation: 24,
  },
})
