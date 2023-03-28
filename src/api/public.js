import request from './request';
import { loginRequest } from './request';

export const BASE_URL = request.defaults.baseURL;

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

export function patch(url, data) {
    return request({
        url: url,
        baseURL: BASE_URL,
        method: 'patch',
        data: data,
    })
}

export function remove(url, data) {
    return request({
        url: url,
        baseURL: BASE_URL,
        method: 'delete',
        data: data,
    })
}