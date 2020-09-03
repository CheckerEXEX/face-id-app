import { StyleSheet, Dimensions } from 'react-native';

const PRIMARY_BACKGROUND_COLOR = '#19224d';

const screenHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
    width: "100%",
    height: 65,
    paddingTop: 5,
  },
  location: {
    // height: screenHeight - 65 - 100,
  },
  body: {
    justifyContent: "center",
    width: "100%",
    height: screenHeight - 65 - 100,
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
  },
  footer: {
    width: "100%",
    height: 100,
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
  },
  position: {
    fontSize: 25,
    color: "#000",
    fontWeight: "bold",
  },
  positionName: {
    textAlign: "center",
    marginLeft: 5,
    fontSize: 15,
    justifyContent: "center",
  },
  clock: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    color: "#4eab52",
    fontWeight: "700",
  },
  content_title: {
    fontSize: 12,
    color: "#4eab52",
    fontWeight: "700",
  },
  logo:{
    resizeMode: "stretch",
    height: '100%',
    width: 65,
  },
  avatar :{
    marginTop: 0,
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    width: 50,
    borderRadius: 100
  },
  avatarTitle: {
    color: '#FFF',
    fontWeight: "bold",
    top: -5
  },
  avatarCaption: {
    color: '#FFF',
    fontSize: 12,
    lineHeight: 12,
    fontWeight: "bold",
    top: -10
  },
  titleHeader: {
    fontSize: 10
  },
});
