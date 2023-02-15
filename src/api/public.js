import request from './request';
import { loginRequest } from './request';

const BASE_URL = request.defaults.baseURL;

export function login(url, data) {
    return loginRequest({
        url: url,
        baseURL: BASE_URL,
        method: 'post',
        data: data,
    })
}

export function public_view(url, params) {
    return loginRequest({
        url: url,
        baseURL: BASE_URL,
        method: 'get',
        params: params,
    })
}

export function post(url, data) {
    return request({
        url: url,
        baseURL: BASE_URL,
        method: 'post',
        data: data,
    })
}

export function get(url, params) {
    return request({
        url: url,
        baseURL: BASE_URL,
        method: 'get',
        params: params,
    })
}