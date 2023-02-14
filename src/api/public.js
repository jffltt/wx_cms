import request from './request';
import { loginRequest } from './request';

const BASE_URL = 'http://127.0.0.1:8000';

export function login(url, data) {
    return loginRequest({
        url: url,
        baseURL: BASE_URL,
        method: 'post',
        data: data,
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