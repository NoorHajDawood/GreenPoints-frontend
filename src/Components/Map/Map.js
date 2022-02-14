import React, { useState, useCallback, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import mapStyling from './mapStyling.json'
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
    const [origin, setOrigin] = useState({ lat: 32.089433, lng: 34.80363 });
    const [zoom, setZoom] = useState(17);
    const [bins, setBins] = useState([]);
    const [markers, setMarkers] = useState(null);
    const [currentBin, setCurrentBin] = useState({});
    const [openInfo, setOpenInfo] = useState(false);
    const [destination, setDestination] = useState('');
    const [response, setResponse] = useState(null);
    const travelMode = 'WALKING';

    useEffect(() => {
        setDestination(props.destination ?? '');
    }, [props]);

    const directionsCallback = (response) => {
        if (response !== null) {
            if (response.status === 'OK') {
                setResponse(response);
            } else {
                console.error('response: ', response)
            }
        }
    }

    const panToLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setOrigin({
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
        googleMapsApiKey: "AIzaSyBtzOrftwBHWy3-WjjU0X8re7ybte6ZutY"
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
            map.panTo(origin)
            setZoom(16);
            setZoom(17);
        }
    }, [origin, map])

    useEffect(() => {
        setMarkers(bins.map((bin, i) => {
            return <Marker key={i + 1}
                bin={bin}
                onClick={() => updateCurrentBin(bin)}
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

    const setDest = (lat, lng) => {
        setDestination(`${lat}, ${lng}`);
    }
    
    return isLoaded ? (
        <>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={origin}
                zoom={zoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={options}
            >

                <Marker key={0}
                    position={origin}
                    icon={require(`../../Images/icons/location2.png`)}
                />
                {markers}

                {
              (
                destination !== '' && origin
              ) && (
                <DirectionsService
                  options={{
                    destination: destination,
                    origin: `${origin.lat}, ${origin.lng}`,
                    travelMode: travelMode
                  }}
                  callback={directionsCallback}
                />
              )
            }
            {
              response !== null && (
                <DirectionsRenderer
                  options={{
                    directions: response
                  }}
                />
              )
            }
            </GoogleMap>
            <div className={classes.pan} onClick={panToLocation}>
                <MdLocationPin size={35} style={{ verticalAlign: 'middle' }} />
            </div>
            <Popup open={openInfo} onClose={closeInfo} modal>
                <TrashInformation bin={currentBin} onNav={setDest} />
            </Popup>
        </>
    ) : <></>
}

export default Map;//React.memo(MyComponent)