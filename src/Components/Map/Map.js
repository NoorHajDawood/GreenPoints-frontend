import React, { useState, useCallback, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import mapStyling from './mapStyling.json'
import axios from 'axios';

const containerStyle = {
    width: '100vw',
    height: '100vh'
};

const options = {
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    zoomControl: false,
    styles: mapStyling
}


function Map(props) {
    const [map, setMap] = useState(null);
    const [pos, setPos] = useState({ lat: 32.089433, lng: 34.80363 });
    const [zoom, setZoom] = useState(19);
    const [bins, setBins] = useState([]);
    const [markers, setMarkers] = useState(null);


    const loadBins = async () => {
        let result;
        try {
            result = await axios.get(`https://greenpoints-server.herokuapp.com/api/recycleBins`);
        } catch (err) {
            console.log(err);
        }
        setBins(result.data);
    };

    useEffect(() => {
        loadBins();
    }, []);

    const { isLoaded } = useJsApiLoader({
        id: 'f0ee40db14646c1b',
        googleMapsApiKey: "AIzaSyAT5yEpu5gIzZyhb0252fC1eWd7zzUHJZY"
    })


    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setPos({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            });
        }
    }, [map]);

    useEffect(() => {
        if (map) {
            map.panTo(pos)
        }
    }, [pos, map])

    useEffect(() => {
        setMarkers(bins.map(bin => {
            return <Marker
                position={bin.location}
                icon={require(`../../Images/icons/${bin.type}-bin.png`)}
            />
        }))
        setZoom(17);
    }, [bins]);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={pos}
            zoom={zoom}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={options}
        >
            {
                markers
            }
            <></>
        </GoogleMap>
    ) : <></>
}

export default Map;//React.memo(MyComponent)