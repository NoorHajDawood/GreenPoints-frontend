import axios from 'axios';
import AuthService from './auth.service';
const API_URL = 'https://greenpoints-server.herokuapp.com/api/users/';

const getUsers = () => {
    return axios.get(API_URL, {
        headers: { "x-access-token": `${AuthService.getCurrentUser().accessToken}` }
    });
};

const getUser = (id) => {
    return axios.get(API_URL + id, {
        headers: { "x-access-token": `${AuthService.getCurrentUser().accessToken}` }
    });
};

const addActivity = (dateTime, recycleBinID, type, address) => {
    return axios.post(API_URL + AuthService.getCurrentUser().id + '/activities/', {
        dateTime,
        recycleBinID,
        type,
        address
    }, {
        headers: { "x-access-token": `${AuthService.getCurrentUser().accessToken}` }
    });
};

const updateCurrentUser = () => {
    const currentUser = AuthService.getCurrentUser();
    getUser(currentUser.id).then((response) => {
        if (response.data.name) {

            localStorage.setItem('user', JSON.stringify({ id: response.data._id, ...response.data, accessToken: currentUser.accessToken }));
        }
        return response.data;
    });
}

const buyCoupon = (id) => {
    return axios.post(API_URL + AuthService.getCurrentUser().id + '/coupons', {
        couponId: id,
    }, {
        headers: { "x-access-token": `${AuthService.getCurrentUser().accessToken}` }
    });
};

const UserService = {
    getUsers,
    getUser,
    addActivity,
    updateCurrentUser,
    buyCoupon,
};

export default UserService;
