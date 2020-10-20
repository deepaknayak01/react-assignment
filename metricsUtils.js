import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: '',
    withCredentials: false
});

axiosInstance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

