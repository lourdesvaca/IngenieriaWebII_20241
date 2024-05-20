import axios from "axios";

export const postLogin = (credentials) => {
    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_BASE_URL + 'login', credentials)
            .then((res) => {
                resolve(res.data);
            }).catch((error) => {
                reject(error);
            });
    });
}
export const postRegister = (credentials) => {
    return new Promise((resolve, reject) => {
        axios.post(import.meta.env.VITE_BASE_URL + 'register', credentials)
            .then((res) => {
                resolve(res.data);
            }).catch((error) => {
                reject(error);
            });
    });
}