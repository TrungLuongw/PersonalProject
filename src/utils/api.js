import axios from 'axios';
import { API_SERVER } from '../contants/initValue';

const axiosClient = axios.create({
    baseURL: API_SERVER,
    timeout: 5000,
    headers: { 'content-type': 'application/json' },
});

axiosClient.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const accessToken = sessionStorage.getItem('accessToken');
        if (!config.isRefresh) {
            if (accessToken) {
                config.headers.common.Authorization = accessToken;
            }
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(processError(error));
    },
);

axiosClient.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return processResponse(response);
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(processError(error));
    },
);
const processResponse = (response) => {
    if (response.status === 200) {
        return {
            isSuccess: true,
            data: response.data,
        };
    } else {
        return {
            isFailure: true,
            msg: response.data.msg,
            status: response.status || '',
        };
    }
};
const processError = (error) => {
    console.log(error);
    return {
        isError: true,
        msg: error.message,
        status: error.status || '',
        code: error.code || '',
    };
};

export default axiosClient;
