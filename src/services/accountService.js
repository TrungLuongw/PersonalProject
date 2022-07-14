import axiosClient from '../utils/api';

export const signup = async (params) => {
    try {
        //params name,username,password
        const response = await axiosClient.post('signup', params);
        return response;
    } catch (error) {
        return error;
    }
};
export const signin = async (params) => {
    try {
        //params username, password
        const response = await axiosClient.post('signin', params);
        return response;
    } catch (error) {
        return error;
    }
};
export const refreshToken = async () => {
    try {
        const response = await axiosClient.post(
            'refresh',
            {},
            {
                isRefresh: true,
                headers: { Authorization: sessionStorage.getItem('refreshToken') },
            },
        );
        return response;
    } catch (error) {
        return error;
    }
};
