import axios from 'axios'
const token = localStorage.getItem('token');
const BASE_URL = "https://project.amasion.cn";

const instance = axios.create({
    baseURL: BASE_URL
});

export const loginRequest = axios.create({
    baseURL: BASE_URL
})

instance.interceptors.request.use(function(config) {
  config.headers.Authorization = `Token ${token}`;
  return config;
}, function(error) {
    return Promise.reject(error);
})

instance.interceptors.response.use(function(res) {
    return res;
})

export default instance
  