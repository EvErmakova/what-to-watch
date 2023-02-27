import axios from 'axios';
import {ActionCreator} from "./reducer/user/user";

export const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://6.react.pages.academy/wtw`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => response;
  const onFail = (err) => {
    if (err.response.status === 401) {
      dispatch(ActionCreator.requireAuthorization(false));
      return;
    }
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
