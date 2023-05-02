import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState } from "react";
import React from "react";

const containerStyle = {
  width: "100%",
  height: "100%",
  minHeight: "266px",
};

function MyComponent({ lat, lng }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBvIp4w94o1HTQau0zKP4t9vUpH3a4usu8",
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds({ lat, lng });
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (!lat || !lng) return <></>;

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat, lng }}
      zoom={5}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
