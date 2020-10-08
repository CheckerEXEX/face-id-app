import {
  AUTH_ERR_LOG_IN,
  AUTH_ERR_LOG_OUT,
  AUTH_LOGGED_IN,
  AUTH_LOGGING_IN,
  AUTH_LOGGING_OUT,
  AUTH_LOGOUT
} from "../constants/auth";
import {navigate} from "../services/navRef";
import {loginService} from "../services/loginService";

export const loggingIn = (loggingIn) => ({
  type: AUTH_LOGGING_IN,
  payload: loggingIn
});

export const loggedIn = (data) => ({
  type: AUTH_LOGGED_IN,
  payload: data,
});

export const errorLogIn = (errorMessage) => ({
  type: AUTH_ERR_LOG_IN,
  payload: errorMessage,
});

export const login = (loginId, loginPassword) => (dispatch) => {
  console.log(loginId + ' ' + loginPassword);
  dispatch(loggingIn(true));
  loginService.login(loginId, loginPassword).then(async (res) => {
    await dispatch(loggedIn(res.data));
    await navigate('InitScreen');
  }).catch((err) => {
    dispatch(errorLogIn('Wrong Id or password'));
  }).finally(() => {
    dispatch(loggingIn(false));
  });
};

export const loggedOut = () => ({
  type: AUTH_LOGOUT,
});

export const loggingOut = (lOut) => ({
  type: AUTH_LOGGING_OUT,
  payload: lOut,
});

export const errorLogOut = (errorMessage) => ({
  type: AUTH_ERR_LOG_OUT,
  payload: errorMessage,
});

export const logout = () => async (dispatch, getState) => {
  dispatch(loggingOut(true));
  await loginService.logout(getState).then((res) => {
    dispatch(loggedOut());
  }).catch((err) => {
    dispatch(errorLogOut('Error logging out.'));
  }).finally(() => {
    dispatch(loggingOut(false));
  });
};
