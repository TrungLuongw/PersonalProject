import axiosClient from '../utils/api';

export const get = async (id) => {
    try {
        const res = await axiosClient.get(`like/${id}`);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};
export const post = async (params) => {
    try {
        // params postId,username
        const res = await axiosClient.post('like/', params);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const remove = async (id) => {
    try {
        const res = await axiosClient.delete(`like/${id}`);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};
