import React, { useState, useCallback, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import mapStyling from './mapStyling.json'
import axios from 'axios';

const containerStyle = {
    width: '100vw',
    height: '100vh'
};

const center = {
    lat: 32.089433,
    lng: 34.80363
};

const options = {
    mapTypeControl: false,
    fullscreenControl: false,
    streetViewControl: false,
    zoomControl: false,
    styles: mapStyling
}

const iconBase = '../../Images/icons/';
const binDict = {
    battery: {
        icon: iconBase + "battery-bin.png",
    },
    ewaste: {
        icon: iconBase + "ewaste-bin.png",
        info: "Batteries and electronic devices such as cables, chargers, calculators, phones, timepieces, electric shavers, lamps and battery-powered toys. At the large collection sites in the city, you can also discard big electric appliances such as washing machines and televisions.",
        imgUrl: "https://www.ramat-gan.muni.il/files/poi/battery_150.jpg",
    },
    glass: {
        icon: iconBase + "glass-bin.png",
        info: "Glass containers, such as olive oil bottles, perfume bottles, coffee jars, jam or honey jars, and baby food jars. The glass containers should be empty and their lids should be removed.",
        imgUrl: "https://www.ramat-gan.muni.il/files/poi/glass.jpg",
    },
    lightBulbs: {
        icon: iconBase + "light-bubls-bin.png",
    },
    metal: {
        icon: iconBase + "metal-bin.png",
    },
    organic: {
        icon: iconBase + "organic-bin.png",
        info: "Food scraps, excluding meat and dairy products.",
        imgUrl: "https://www.hiriya.co.il/prdPics/1011_ar_body_heb_3_1_1557146966.jpg",
    },
    paper: {
        icon: iconBase + "paper-bin.png",
        info: "Newspapers, brochures, books, cereal boxes, egg cartons (but not milk cartons!)",
        imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/%D7%90%D7%9E%D7%A0%D7%99%D7%A8.jpg/440px-%D7%90%D7%9E%D7%A0%D7%99%D7%A8.jpg",
    },
    plastic: {
        icon: iconBase + "plastic-bin.png",
        info: "Soft drink and mineral water bottles containing at least 1.5 liters, as well as plastic bottles containing cleaning agents or detergents, such as dishwashing liquid,  fabric softener,  shampoo, conditioner, et al.",
        imgUrl: "https://www.ramat-gan.muni.il/files/poi/bottles.jpg",
    },
    textile: {
        icon: iconBase + "textile-bin.png",
        info: "Old clothes, shoes, linens and cloth bags.",
        imgUrl: "https://www.ramat-gan.muni.il/files/poi/CLOTHS.jpg",
    },
    location: {
        icon: iconBase + "location.png",
    },
};

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