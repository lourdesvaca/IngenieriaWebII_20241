export const redirectOnError = (error, reject) => {
    console.log(error);
    if (error.response.status === 401) {
        window.location.href = '/login';
        return;
    }
    reject(error);
}
export const getCommonHeaders = () => {
    return {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    };
}