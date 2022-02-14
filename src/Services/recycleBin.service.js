import axios from 'axios';
import AuthService from './auth.service';
const API_URL = 'https://greenpoints-server.herokuapp.com/api/recycleBins/';

const getBins = () => {
    return axios.get(API_URL, {
        headers: { "x-access-token": `${AuthService.getCurrentUser().accessToken}` }
    });
};

const getBin = (id) => {
    return axios.get(API_URL + id, {
        headers: { "x-access-token": `${AuthService.getCurrentUser().accessToken}` }
    });
};

const addBin = (type, lat, lng, maxCapacity, currentCapacity = 0) => {
    return axios.post(API_URL, {
        type,
        location: {
            lat,
            lng,
        },
        maxCapacity,
        currentCapacity,
    }, {
        headers: { "x-access-token": `${AuthService.getCurrentUser().accessToken}` }
    });
};

const deleteBin = (id) => {
    return axios.delete(API_URL + id, {
        headers: { "x-access-token": `${AuthService.getCurrentUser().accessToken}` }
    });
}

const updateBin = (id ,type, lat, lng, maxCapacity, currentCapacity) => {
    return axios.patch(API_URL + id, {
        type,
        location: {
            lat,
            lng,
        },
        maxCapacity,
        currentCapacity,
    }, {
        headers: { "x-access-token": `${AuthService.getCurrentUser().accessToken}` }
    });
};

const RecycleBinService = {
    getBins,
    getBin,
    addBin,
    deleteBin,
    updateBin,
};

export default RecycleBinService;
