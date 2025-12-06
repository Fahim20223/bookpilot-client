import React, { useRef, useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Coverage = () => {
  const [serviceCenters, setServiceCenters] = useState([]);
  const position = [23.685, 90.3563];
  const mapRef = useRef(null);

  useEffect(() => {
    fetch("/serviceCenters.json")
      .then((res) => res.json())
      .then((data) => setServiceCenters(data));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.trim();

    if (!location) return;

    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district) {
      mapRef.current.flyTo([district.latitude, district.longitude], 12, {
        animate: true,
      });
    } else {
      alert("No matching district found.");
    }
  };

  return (
    <div className="px-6 my-20 space-y-8 max-w-7xl mx-auto">
      <h2 className="text-center text-4xl font-bold">
        We are available in <span className="text-blue-600">64 Districts</span>
      </h2>

      {/* Search Box */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto">
        <label className="input input-bordered flex items-center gap-2">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>

          <input
            name="location"
            type="search"
            className="grow"
            placeholder="Search district..."
          />
        </label>
      </form>

      {/* Map */}
      <div className="border rounded-xl w-full h-[800px] overflow-hidden">
        <MapContainer
          center={position}
          zoom={7}
          scrollWheelZoom={true}
          className="h-full"
          whenCreated={(map) => {
            mapRef.current = map;
          }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {serviceCenters.map((center) => (
            <Marker
              key={center.district}
              position={[center.latitude, center.longitude]}
            >
              <Popup>
                <strong>{center.district}</strong> <br />
                Service Area: {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
