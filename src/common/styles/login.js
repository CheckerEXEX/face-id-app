import { StyleSheet } from 'react-native';

const PRIMARY_BACKGROUND_COLOR = '#19224d';
export default StyleSheet.create({
  logoGroup: {
    position: 'absolute',
    top:0,
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  logoCompany: {
    width: 300,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    resizeMode:"stretch"
  },
  logoApp: {
    marginTop: 40,
    marginBottom: 10,
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    paddingBottom: 60,
    fontWeight: 'bold',
    color: "black",
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  loginGroup: {
    position: 'absolute',
    bottom:0,
    paddingBottom: 50
  },
  input: {
    flexDirection: "row",
    borderTopColor: "#FFF",
    borderRightColor: "#FFF",
    borderLeftColor: "#FFF",
    borderBottomColor: PRIMARY_BACKGROUND_COLOR,
    borderWidth: 1,
    backgroundColor: "#FFF",
    paddingLeft: 10,
    width: 300,
  },
  textInput: {
    flex: 1,
    color: "gray",
    height: 45,
    padding: 5,
  },
  buttonGroup: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginTop: 13,
    paddingRight: 15,
  },
  iconButton: {
    paddingLeft: 5
  },
  loginBtn: {
    flexDirection: 'row',
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    backgroundColor: PRIMARY_BACKGROUND_COLOR,
  },
  loginText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },

});