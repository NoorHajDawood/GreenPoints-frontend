// function initMap() {
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: {lat: 32.089433, lng: 34.80363},
//         zoom: 17,
//         mapId: 'f0ee40db14646c1b'
//       });
// }

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 32.089433, lng: 34.80363 },
        zoom: 17,
        mapId: 'f0ee40db14646c1b',
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
    });
    infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Location found.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                },
                () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                }
            );
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    });

    const iconBase =
        "./images/icons/";
    const icons = {
        battery: {
            icon: iconBase + "battery-bin.png",
        },
        ewaste: {
            icon: iconBase + "ewaste-bin.png",
        },
        glass: {
            icon: iconBase + "glass-bin.png",
        },
        lightBulbs: {
            icon: iconBase + "light-bubls-bin.png",
        },
        metal: {
            icon: iconBase + "metal-bin.png",
        },
        organic: {
            icon: iconBase + "organic-bin.png",
        },
        paper: {
            icon: iconBase + "paper-bin.png",
        },
        plastic: {
            icon: iconBase + "plastic-bin.png",
        },
        location: {
            icon: iconBase + "location.png",
        },
    };
    const features = [
        {
            position: { lat: 32.089433, lng: 34.80363 },
            type: "location",
            title: "Location",
        },
        {
            position: { lat: 32.08938856151897, lng: 34.80317547458683 },
            type: "plastic",
            title: "Plastic bin",
        },
        {
            position: { lat: 32.09013762006465, lng: 34.803689719448656 },
            type: "paper",
            title: "Paper bin",
        },
        {
            position: { lat: 32.09015290690907, lng: 34.80441146662424 },
            type: "glass",
            title: "Glass bin",
        },
        {
            position: { lat: 32.08722542941173, lng: 34.80357243553262 },
            type: "organic",
            title: "Organic bin",
        },
    ];

    // Create markers.
    for (let i = 0; i < features.length; i++) {
        const marker = new google.maps.Marker({
            position: features[i].position,
            icon: icons[features[i].type].icon,
            title: features[i].title,
            map: map,
        });
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}