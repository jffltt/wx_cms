import axios from 'axios'
import { ElMessage } from 'element-plus';
const token = localStorage.getItem('token');
const BASE_URL = "https://backend.zjhylgbb.cn";

const instance = axios.create({
    baseURL: BASE_URL
});

export const loginRequest = axios.create({
    baseURL: BASE_URL
})

instance.interceptors.request.use(function (config) {
    config.headers.Authorization = `Token ${token}`;
    return config;
}, function (error) {
    return Promise.reject(error);
})

instance.interceptors.response.use(function (res) {
    return res;
}, function (error) {
    switch (error.response.status) {
        case 401:
            {
                ElMessage.error('权限认证过期,即将跳转登录页面');
                localStorage.removeItem('token');
                location.href = '/login';
            }
            break;

        default:
            break;
    }
    return Promise.reject(error);
})

export default instance
