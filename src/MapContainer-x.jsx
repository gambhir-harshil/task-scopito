import { useRef, useEffect, useState } from "react";
// import mapboxgl from "mapbox-gl";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

const Map = () => {
  // const mapContainer = useRef(null);

  // const [currentCoordinates, setCurrentCoordinates] = useState(null);
  // const [selectedImage, setSelectedImage] = useState(null);

  // useEffect(() => {
  //   mapboxgl.accessToken =
  //     "pk.eyJ1IjoibmlraXRhY2hhdWhhbjEyMyIsImEiOiJjbGwwaWxrdzEwZW02M2pxcjN4eHo1bDR1In0.I4yZh8CAQOz2c63IsCBOpg";

  //   const map = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: "mapbox://styles/mapbox/streets-v11", // choose your map style here
  //     center: [0, 0], // initial center position [lng, lat]
  //     zoom: 1, // initial zoom level
  //     pitch: 0, // Set pitch to 0
  //     bearing: 0, // Set bearing to 0
  //     pitchWithRotate: false, // Disable pitch rotation
  //   });

  //   const locations = [
  //     {
  //       coordinates: [31.2357, 30.0444],
  //       imageUrl:
  //         "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Cairo_From_Tower_%28cropped%29.jpg/278px-Cairo_From_Tower_%28cropped%29.jpg",
  //     },
  //     {
  //       coordinates: [36.8172, -1.2864],
  //       imageUrl:
  //         "https://imgproxy.natucate.com/ducA0KeKOPHVUR-Q94bo7GQmECyKTK-NyPFv0sbZ7qs/rs:fill/g:so/w:3840/h:2160/aHR0cHM6Ly93d3cubmF0dWNhdGUuY29tL21lZGlhL3BhZ2VzL3JlaXNlemllbGUvMDFlYzU2ZWEtYWVkYS00NDAxLTg5NTMtMTExNTA0MjVmZjIxLzE3MDZhNWJmNzYtMTY3OTQ4NjY5Ny9rZW5pYS1sYWVuZGVyaW5mb3JtYXRpb25lbi1lbGVwaGFudGVuLWtpbGltYW5kamFyby1uYXR1Y2F0ZS5qcGc",
  //     },
  //     // Add more locations as needed
  //   ];

  //   locations.forEach((location) => {
  //     const popup = new mapboxgl.Popup().setHTML(
  //       `<img src="${location.imageUrl}" alt="Image"><br><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="uploadImageButton">Upload Image</button>`
  //     );

  //     new mapboxgl.Marker()
  //       .setLngLat(location.coordinates)
  //       .setPopup(popup)
  //       .addTo(map);

  //     popup.on("open", () => {
  //       document
  //         .getElementById("uploadImageButton")
  //         .addEventListener("click", () => {
  //           setCurrentCoordinates(location.coordinates);
  //           console.log("Upload image for coordinates:", location.coordinates);
  //         });
  //     });

  //     popup.on("close", () => {
  //       setCurrentCoordinates(null);
  //     });
  //   });

  //   // Clean up
  //   return () => map.remove();
  // }, []);

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setSelectedImage(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <div ref={mapContainer} className="h-[600px]">
      {currentCoordinates && (
        <div className="fixed p-4 text-black bg-white border border-gray-300 shadow-md bottom-1/2 right-1/2">
          <p className="font-bold">Upload Image for Coordinates:</p>
          <p>Longitude: {currentCoordinates[0]}</p>
          <p>Latitude: {currentCoordinates[1]}</p>
          <input
            type="file"
            accept="image/*"
            id="imageUploadInput"
            onChange={handleImageChange}
            className="mb-2"
          />
          {selectedImage && (
            <img src={selectedImage} alt="Uploaded" className="w-full mb-2" />
          )}
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={() => {
              setCurrentCoordinates(null);
              console.log("Selected image:", selectedImage);
            }}
          >
            Upload Image
          </button>
        </div>
      )}
    </div>
  );
};

export default Map;
