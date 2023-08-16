import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

export const MapComponent = () => {
  useEffect(() => {
    mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-79.4512, 43.6568],
      zoom: 13,
    });

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );
  }, []);

  return (
    <div>
      <div
        id="map"
        style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
      />
    </div>
  );
};
