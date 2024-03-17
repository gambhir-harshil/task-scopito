import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";

const cities = [
  {
    name: "Egypt",
    position: {
      lng: -1.2864,
      lat: 36.8172,
    },
  },
  {
    name: "Kenya",
    position: {
      lng: 30.0444,
      lat: 31.2357,
    },
  },
];

const Map = () => {
  const [mapPosition, setMapPosition] = useState([0, 0]);
  return (
    <>
      <MapContainer
        center={mapPosition}
        zoom={2}
        scrollWheelZoom={false}
        className="h-full"
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
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        {/* <DetectClick /> */}
      </MapContainer>
    </>
  );
};

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

// function DetectClick() {
//   //   const navigate = useNavigate();

//   useMapEvents({
//     click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
//   });
// }

export default Map;
