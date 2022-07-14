export const cutString = (str, max) => {
    if (str.length > max) {
        return str.substr(0, max) + '...';
    } else {
        return str;
    }
};
