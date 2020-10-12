import axios from 'axios';
import { API } from '../config/constants';
import {resetAuthAsyncStorage, setAuthAsyncStorage} from "./getAuthAsyncStorage";

function capture(image_base64) {
  return new Promise((resolve, reject) => {
    axios.post(`${API.PYTHON}/predict`, {
      image_base64: image_base64
    }).then(async (res) => {
      try {
        //await setAuthAsyncStorage(res.data);
        resolve(res);
      } catch (e) { reject(e) }
    }).catch((err) => {
      reject(err)
    });
  });
}

export const cameraService = {
  capture,
};
