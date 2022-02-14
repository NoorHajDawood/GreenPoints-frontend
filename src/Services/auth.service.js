import axios from 'axios';
const API_URL = 'https://greenpoints-server.herokuapp.com/api/auth/';

const register = (email, password, name, age, gender, imgUrl) => {
    return axios.post(API_URL + 'signup', {
        email,
        password,
        name,
        age,
        gender,
        imgUrl,
    });
};

const login = (email, password) => {
    return axios.post(API_URL + 'login', {
        email,
        password,
    }).then((response) => {
        if (response.data.name) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem('user');
    // return axios.post(API_URL + 'signout').then((response) => {
    //     return response.data
    // });
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default AuthService;