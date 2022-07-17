export const cutString = (str, max) => {
    if (str.length > max) {
        return str.substr(0, max) + '...';
    } else {
        return str;
    }
};
export const calculatorTimeStamp = (oldDate) => {
    let time = (Date.now() - new Date(oldDate)) / 1000;
    if (time <= 60) {
        return 'few seconds ago';
    } else if (time / 60 <= 60) {
        return `${Math.floor(time / 60)} minutes ago`;
    } else if (time / 3600 <= 24) {
        let output = Math.floor(time / 3600);
        if (output > 1) return `${output} hours ago`;
        return `${output} hour ago`;
    } else if (time / (3600 * 24) <= 31) {
        let output = Math.floor(time / (3600 * 24));
        if (output > 1) return `${output} days ago`;
        return `${output} day ago`;
    } else if (time / (3600 * 24 * 30) <= 12) {
        let output = Math.floor(time / (3600 * 24 * 30));
        if (output > 1) return `${output} months ago`;
        return `${output} month ago`;
    } else {
        let output = Math.floor(time / (3600 * 24 * 30 * 12));
        if (output > 1) return `${output} years ago`;
        return `${output} year ago`;
    }
};
