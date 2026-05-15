import React, { useEffect, useState } from "react";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const RouteMap = ({ pickup, drop }) => {

    const [pickupCoords, setPickupCoords] = useState(null);
    const [dropCoords, setDropCoords] = useState(null);
    const [route, setRoute] = useState([]);

    useEffect(() => {

        if (!pickup || !drop) return;

        const getRoute = async () => {

            try {

                // PICKUP LOCATION
                const pickRes = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${pickup}`
                );

                const pickData = await pickRes.json();

                if (!pickData.length) {
                    console.log("Pickup not found");
                    return;
                }

                const pickupLat = parseFloat(pickData[0].lat);
                const pickupLng = parseFloat(pickData[0].lon);

                setPickupCoords({
                    lat: pickupLat,
                    lng: pickupLng,
                });

                // DROP LOCATION
                const dropRes = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${drop}`
                );

                const dropData = await dropRes.json();

                if (!dropData.length) {
                    console.log("Drop not found");
                    return;
                }

                const dropLat = parseFloat(dropData[0].lat);
                const dropLng = parseFloat(dropData[0].lon);

                setDropCoords({
                    lat: dropLat,
                    lng: dropLng,
                });

                // ROUTE API
                const routeRes = await fetch(
                    `https://router.project-osrm.org/route/v1/driving/${pickupLng},${pickupLat};${dropLng},${dropLat}?overview=full&geometries=geojson`
                );

                const routeData = await routeRes.json();

                const coordinates =
                    routeData.routes[0].geometry.coordinates.map((item) => [
                        item[1],
                        item[0],
                    ]);

                setRoute(coordinates);

            } catch (err) {
                console.log(err);
            }
        };

        getRoute();

    }, [pickup, drop]);

    // LOADING
    if (!pickupCoords || !dropCoords) {
        return <h1>Loading Map...</h1>;
    }

    return (
        <div style={{width:'99vw', marginTop:"15px"}}>
            <MapContainer
                center={pickupCoords}
                zoom={10}
                style={{
                    height: "40vh",
                    width: "90%",
                }}
            >

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* PICKUP MARKER */}
                <Marker position={pickupCoords}>
                    <Popup>Pickup</Popup>
                </Marker>

                {/* DROP MARKER */}
                <Marker position={dropCoords}>
                    <Popup>Drop</Popup>
                </Marker>

                {/* ROUTE */}
                <Polyline
                    positions={route}
                    color="red"
                    weight={5}
                />

            </MapContainer>
        </div>

    );
};

export default RouteMap;