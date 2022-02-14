import axios from 'axios';
import AuthService from './auth.service';
const API_URL = 'https://greenpoints-server.herokuapp.com/api/coupons/';

const getCoupons = () => {
    return axios.get(API_URL, {
        headers: { "x-access-token": `${AuthService.getCurrentUser().accessToken}` }
    });
};

const getCoupon = (id) => {
    return axios.get(API_URL + id, {
        headers: { "x-access-token": `${AuthService.getCurrentUser().accessToken}` }
    });
};

const addCoupon = (name, info, code, imgUrl, cost) => {
    return axios.post(API_URL, {
        name,
        info,
        code,
        imgUrl,
        cost,
    }, {
        headers: { "x-access-token": `${AuthService.getCurrentUser().accessToken}` }
    });
};

const deleteCoupon = (id) => {
    return axios.delete(API_URL + id, {
        headers: { "x-access-token": `${AuthService.getCurrentUser().accessToken}` }
    });
};

const updateCoupon = (id, name, info, code, imgUrl, cost) => {
    return axios.patch(API_URL + id, {
        name,
        info,
        code,
        imgUrl,
        cost,
    }, {
        headers: { "x-access-token": `${AuthService.getCurrentUser().accessToken}` }
    });
};

const CouponService = {
    getCoupons,
    getCoupon,
    addCoupon,
    deleteCoupon,
    updateCoupon,
};

export default CouponService;
