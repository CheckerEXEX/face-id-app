import axios from 'axios';
import { API } from '../config/constants';
import {resetAuthAsyncStorage, setAuthAsyncStorage} from "./getAuthAsyncStorage";

function login(loginId, loginPassword) {
  return new Promise((resolve, reject) => {
    axios.post(`${API.DATABASE}/login`, {
      loginId: loginId,
      loginPassword : loginPassword
    }).then(async (res) => {
      try {
        console.log(res.data.message);
        await setAuthAsyncStorage(res.data);
        resolve(res);
      } catch (e) { reject(e) }
    }).catch((err) => {
      reject(err)
    });
  });
}

async function logout(getState) {
  return new Promise((resolve, reject) => {
    const currentState = getState();
    const { token } = currentState.auth;
    axios.post(`${API.DATABASE}/logout`, {
      headers: {
        authorization: `${token}`,
      },
    }).then(async (response) => {
      resolve(response);
      await resetAuthAsyncStorage();
    }).catch((err) => reject(err));
  });
}

export const loginService = {
  login,
  logout,
};
