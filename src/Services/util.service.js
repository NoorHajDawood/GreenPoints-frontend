const GEOCODE_API_KEY = 'ba5dcb074bff4418b611a6498727f73a';

const fetchAddress = async (lat, lng) => {
    const requestOptions = {
        method: 'GET',
    };
    try {
        const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${GEOCODE_API_KEY}`, requestOptions);
        const result = (await response.json()).features[0].properties;
        return `${result.address_line1}, ${result.city}`
    } catch (error) {
        console.log('error', error)
    }
    return '';
}

const UtilService = {
    fetchAddress,
};

export default UtilService;
