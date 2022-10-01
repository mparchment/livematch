import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

function Map() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibXBhcmNobWVudCIsImEiOiJjbDhxNXNmd24wY28wM25vdGF0NXJkbW15In0.C0whavm9nB9QyGg-DTDZng';

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-76.7115);
    const [lat, setLat] = useState(39.25525);
    const [zoom, setZoom] = useState(16);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mparchment/cl8q6pu4d000p15qrql4vtq6i',
            center: [lng, lat],
            zoom: zoom
        });
    });

    return (
        <div ref={mapContainer} className="map-container"/>
    )
}

export default Map;