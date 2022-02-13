import React, { useState, useEffect } from 'react';
import './TrashInformation.css';
const axios = require('axios');

const GEOCODE_API_KEY = 'ba5dcb074bff4418b611a6498727f73a';

const green = 'rgba(13,121,9,1)';
const red = 'rgba(121,31,9,1)';
const yellow = 'rgba(121,92,9,1)';

function TrashInformation(props) {
    const [address, setAddress] = useState('');
    const [percentCapacity, setPercentCapacity] = useState('');

    async function fetchAddress(lat, lng) {
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

    const getAddress = async (lat, lng) => {
        const result = await fetchAddress(lat, lng);
        setAddress(result);
    }

    useEffect(() => {
        getAddress(props.bin.location.lat, props.bin.location.lng);
        setPercentCapacity((props.bin.currentCapacity / props.bin.maxCapacity) * 100)
    }, [props]);

    return (
        <div className='trash-information'>
            <span className='trash-icon' />
            <div className='trash-properties'>
                <h2 className='overflow-text'>{address}</h2>
                <h4>{props.bin.type}</h4>
            </div>
            <div className='trash-container'
                style={{
                    background: `linear-gradient(0deg,  ${percentCapacity >= 80 ? red : percentCapacity >= 50 ? yellow : green}
                        0%, rgba(255,255,255,1)  ${percentCapacity}%)`
                }}>
                <div className='trash-hr-line'
                    style={{
                        bottom: `${percentCapacity}%`
                    }}
                ></div>
                <h5 className='trash-capacity'>{percentCapacity}%</h5>
            </div>

            {percentCapacity >= 80 ? <h6 className='trash-capacity-info'>Almost Full</h6> : ''}


            <button className='trash-navigation-button' >Take me there</button>

        </div>


    );


}

export default TrashInformation;