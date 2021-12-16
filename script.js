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
        zoomControl: false,
    });

    const iconBase =
        "./images/icons/";
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

    const bins = [
        {
            _id: "1",
            type: "textile",
            location: { lat: 32.08938856151897, lng: 34.80317547458683 },
            QRCode: "kj1h612sd6",
            maxCapacity: 200,
            currentCapacity: 30,
        },
        {
            _id: "2",
            location: { lat: 32.09013762006465, lng: 34.803689719448656 },
            type: "paper",
            QRCode: "kj1h612sd6",
            maxCapacity: 200,
            currentCapacity: 180,
        },
        {
            _id: "3",
            location: { lat: 32.09015290690907, lng: 34.80441146662424 },
            type: "glass",
            QRCode: "kj1h612sd6",
            maxCapacity: 200,
            currentCapacity: 125,
        },
        {
            _id: "4",
            location: { lat: 32.08722542941173, lng: 34.80357243553262 },
            type: "organic",
            QRCode: "kj1h612sd6",
            maxCapacity: 200,
            currentCapacity: 83,
        },
    ];

    // Create markers.
    const locationMarker = new google.maps.Marker({
        position: { lat: 32.089433, lng: 34.80363 },
        icon: binDict['location'].icon,
        title: "Current location",
        map,
        animation: google.maps.Animation.DROP,
    });

    const binsMarkers = bins.map((bin, i) => {
        const marker = new google.maps.Marker({
            _id: bin._id,
            position: bin.location,
            type: bin.type,
            icon: binDict[bin.type].icon,
            title: `${bin.type} recycle bin`,
            QRCode: bin.QRCode,
            maxCapacity: bin.maxCapacity,
            currentCapacity: bin.currentCapacity,
            imgUrl: bin.imgUrl ?? binDict[bin.type].imgUrl ?? null,
            map,
            animation: google.maps.Animation.DROP,
        });
        google.maps.event.addListener(marker, 'click', function() {
            $('#content').css('display', 'grid');
            $('#bin-capacity').css('width', `${this.currentCapacity*100/this.maxCapacity}%`)
            $('#bin-capacity').text(`${this.currentCapacity*100/this.maxCapacity}%`)
            $('#bin-img').attr('src', this.imgUrl)
            $('#bin-info').text(binDict[this.type].info)
        });
        // marker.addListener("click", () => {
        //     $('#content').css('display', 'grid');
        //     console.log(this.currentCapacity,this.maxCapacity);
        //     $('#bin-capacity').css('width', `${10}%`)
        // })
        return marker;
    });

    // Add a marker clusterer to manage the markers.
    const markerCluster = new markerClusterer.MarkerClusterer({ map, markers: binsMarkers });

    // const centerControlDiv = document.createElement("div");
    // CenterControl(centerControlDiv, map);
    // map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
    const plusControlDiv = document.createElement('div');
    $(plusControlDiv).addClass('btn-circle');
    $(plusControlDiv).text('+');
    $(plusControlDiv).css('margin', '0.5rem');
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(plusControlDiv);

    const panControlDiv = document.createElement('div');
    $(panControlDiv).addClass('btn-circle');
    $(panControlDiv).text('📍');
    $(panControlDiv).css('margin', '0.5rem 0.5rem 0');
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(panControlDiv);
    panControlDiv.classList.add("custom-map-control-button");
    panControlDiv.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    map.setCenter(pos);
                    locationMarker.position = pos;
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
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    // infoWindow.setPosition(pos);
    // infoWindow.setContent(
    //     browserHasGeolocation
    //         ? "Error: The Geolocation service failed."
    //         : "Error: Your browser doesn't support geolocation."
    // );
    // infoWindow.open(map);
    alert( browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation.");
}

/**
 * The CenterControl adds a control to the map that recenters the map on
 * Chicago.
 * This constructor takes the control DIV as an argument.
 * @constructor
 */
function CenterControl(controlDiv, map) {
    // Set CSS for the control border.
    const controlUI = document.createElement("div");

    controlUI.style.backgroundColor = "#fff";
    controlUI.style.border = "2px solid #fff";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginTop = "8px";
    controlUI.style.marginBottom = "22px";
    controlUI.style.textAlign = "center";
    controlUI.title = "Click to recenter the map";
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    const controlText = document.createElement("div");

    controlText.style.color = "rgb(25,25,25)";
    controlText.style.fontFamily = "Roboto,Arial,sans-serif";
    controlText.style.fontSize = "16px";
    controlText.style.lineHeight = "38px";
    controlText.style.paddingLeft = "5px";
    controlText.style.paddingRight = "5px";
    controlText.innerHTML = "Center Map";
    controlUI.appendChild(controlText);
    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener("click", () => {
        map.setCenter(chicago);
    });
}

$('#content-close').click(() => {
    $('#content').css('display', 'none');
})