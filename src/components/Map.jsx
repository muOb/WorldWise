import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import App from "../App";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContexts";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlLocation } from "../hooks/useUrlLocation";
function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities, flagemojiToPNG } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();
  // navigate is a function
  //navigate use to move to a new URL
  //without the user having to click on any link
  const navigate = useNavigate();
  const [mapLat, mapLng] = useUrlLocation();
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geoLocationPosition)
        setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    },
    [geoLocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "...Loading" : "use your position"};
        </Button>
      )}
      {/* <h1>
        lat is :{lat}, lng is :{lng}
        <button onClick={() => setSearchParams({ lat: 10, lng: 20 })}>
          change
        </button>
      </h1> */}
      <MapContainer
        center={mapPosition}
        // center={[mapLat, mapLng]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{flagemojiToPNG(city.emoji)}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  // useMap hooks basically get the current instance
  //of the map that is currently being displayed
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  //useMapEvents we can define a few properties
  //for different type of events
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
export default Map;
