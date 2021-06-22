import axios from "axios";

import store from "../store/index"

const defaultOptions = {
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

let instance = axios.create(defaultOptions);

instance.interceptors.request.use(function (config) {
  const token = store.getState().loginUser.token;
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
});

export default instance;


