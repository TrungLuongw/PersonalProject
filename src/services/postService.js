import axiosClient from '../utils/api';

export const getPosts = async (category) => {
    try {
        const res = await axiosClient.get(`post/?category=${category}`);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};
export const getPost = async (id) => {
    try {
        const res = await axiosClient.get(`post/${id}`);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};
export const publicPost = async (params) => {
    try {
        // params  title description avatar username category
        const res = await axiosClient.post('post/', params);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};
export const putPost = async (id, params) => {
    try {
        // params  title description avatar username category
        const res = await axiosClient.put(`post/${id}`, params);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};
export const removePost = async (id) => {
    try {
        // params  title description avatar username category
        const res = await axiosClient.delete(`post/${id}`);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const upload = async (file) => {
    try {
        const res = await axiosClient.post('upload', file);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};
