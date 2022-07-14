import axiosClient from '../utils/api';
const typeAPI = 'category/';
export const get = async () => {
    try {
        // console.log(typeAPI);
        const response = await axiosClient.get(typeAPI);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};
