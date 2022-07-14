export const storageToken = (response) => {
    console.log(response);
    sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
    sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
};
