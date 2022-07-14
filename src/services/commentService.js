import axiosClient from '../utils/api';

export const get = async (id) => {
    try {
        console.log(`comment/${id}`);
        const res = await axiosClient.get(`comment/${id}`);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};
export const post = async (params) => {
    try {
        //params comment postId username
        const res = await axiosClient.post('comment/', params);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const remove = async (id) => {
    try {
        console.log(id);
        const res = await axiosClient.delete(`comment/${id}`);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};
