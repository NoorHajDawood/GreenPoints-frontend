import React, { useState, useCallback, useEffect, useRef } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import mapStyling from './mapStyling.json'
import axios from 'axios';
import { MdLocationPin } from 'react-icons/md';
import classes from './Map.module.css';
import Popup from 'reactjs-popup';
import TrashInformation from '../TrashInformation/Trashinformation';
import RecycleBinService from '../../Services/recycleBin.service';

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
    const [zoom, setZoom] = useState(17);
    const [bins, setBins] = useState([]);
    const [markers, setMarkers] = useState(null);
    const [currentBin, setCurrentBin] = useState({});
    const [openInfo, setOpenInfo] = useState(false);

    const panToLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setPos({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            });
        }
    }

    const loadBins = async () => {
        let result;
        try {
            result = await RecycleBinService.getBins();
        } catch (err) {
            console.log(`${err}`);
            return;
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
        panToLocation();
    }, [map]);

    useEffect(() => {
        if (map) {
            map.panTo(pos)
            setZoom(16);
            setZoom(17);
        }
    }, [pos, map])

    useEffect(() => {
        setMarkers(bins.map((bin, i) => {
            return <Marker key={i + 1}
                bin={bin}
                onClick={()=>updateCurrentBin(bin)}
                position={bin.location}
                icon={require(`../../Images/icons/${bin.type}-bin.png`)}
            />
        }))
        setZoom(16);
        setZoom(17);
    }, [bins]);

    const updateCurrentBin = (bin) => {
        setCurrentBin(bin);
        setOpenInfo(true);
    };

    const closeInfo = () => {
        setOpenInfo(false);
    }

    return isLoaded ? (
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={pos}
                zoom={zoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={options}
            >

                <Marker key={0}
                    position={pos}
                    icon={require(`../../Images/icons/location2.png`)}
                />
                {markers}

                <></>
            </GoogleMap>
            <div className={classes.pan} onClick={panToLocation}>
                <MdLocationPin size={35} style={{ verticalAlign: 'middle' }} />
            </div>
            <Popup open={openInfo} onClose={closeInfo}  modal>
                <TrashInformation bin={currentBin}/>
            </Popup>
        </>
    ) : <></>
}

export default Map;//React.memo(MyComponent)