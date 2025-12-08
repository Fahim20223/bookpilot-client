import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Search,
  Navigation,
  Package,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function Coverage() {
  const [serviceCenters, setServiceCenters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCenters, setFilteredCenters] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const mapRef = useRef(null);

  // Fetch service centers data from public folder
  useEffect(() => {
    fetch("/serviceCenters.json")
      .then((res) => res.json())
      .then((data) => {
        setServiceCenters(data);
        setFilteredCenters(data);
      })
      .catch((error) => {
        console.error("Error loading service centers:", error);
      });
  }, []);

  // Filter by search and region
  useEffect(() => {
    let filtered = serviceCenters;

    if (selectedRegion !== "All") {
      filtered = filtered.filter((center) => center.region === selectedRegion);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (center) =>
          center.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
          center.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          center.covered_area.some((area) =>
            area.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    setFilteredCenters(filtered);
  }, [searchTerm, selectedRegion, serviceCenters]);

  const regions = ["All", ...new Set(serviceCenters.map((c) => c.region))];

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    if (mapRef.current) {
      mapRef.current.flyTo([location.latitude, location.longitude], 12, {
        animate: true,
        duration: 1.5,
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (filteredCenters.length > 0) {
      handleLocationClick(filteredCenters[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
            <Navigation className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">
              Nationwide Coverage
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Book Delivery{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Across Bangladesh
            </span>
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We deliver books to 64 districts nationwide. Fast, reliable, and at
            your doorstep.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="search"
                placeholder="Search by district or area name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white shadow-lg text-gray-700 placeholder:text-gray-400 transition-colors"
              />
            </div>
          </form>

          {/* Region Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {regions.map((region) => (
              <motion.button
                key={region}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedRegion(region)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedRegion === region
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
              >
                {region}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Locations List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 space-y-4"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6 text-blue-600" />
                Available Locations ({filteredCenters.length})
              </h3>

              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredCenters.length > 0 ? (
                  filteredCenters.map((center, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleLocationClick(center)}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                        selectedLocation?.district === center.district
                          ? "bg-blue-50 border-2 border-blue-500 shadow-md"
                          : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <MapPin className="w-5 h-5 text-blue-600" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 mb-1">
                            {center.district}
                          </h4>
                          <p className="text-sm text-gray-500 mb-2">
                            {center.region} Region
                          </p>

                          <div className="flex flex-wrap gap-1">
                            {center.covered_area.slice(0, 3).map((area, i) => (
                              <span
                                key={i}
                                className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                              >
                                {area}
                              </span>
                            ))}
                            {center.covered_area.length > 3 && (
                              <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                                +{center.covered_area.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No locations found</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Map and Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Map Container */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="h-[600px]">
                <MapContainer
                  center={[23.685, 90.3563]}
                  zoom={9}
                  scrollWheelZoom={false}
                  className="h-full w-full"
                  ref={mapRef}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {filteredCenters.map((center, index) => (
                    <Marker
                      key={index}
                      position={[center.latitude, center.longitude]}
                      eventHandlers={{
                        click: () => handleLocationClick(center),
                      }}
                    >
                      <Popup>
                        <div className="p-2">
                          <strong className="text-lg">{center.district}</strong>
                          <p className="text-sm text-gray-600">
                            {center.region} Region
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            <strong>Service Areas:</strong>
                            <br />
                            {center.covered_area.join(", ")}
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>

            {/* Selected Location Details */}
            <AnimatePresence>
              {selectedLocation && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="bg-white rounded-2xl shadow-xl p-6 relative"
                >
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>

                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-blue-100 p-4 rounded-xl">
                      <MapPin className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {selectedLocation.district}
                      </h3>
                      <p className="text-gray-600">
                        {selectedLocation.region} Region
                      </p>
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Active
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Package className="w-5 h-5 text-blue-600" />
                        Covered Areas
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedLocation.covered_area.map((area, i) => (
                          <span
                            key={i}
                            className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Latitude</p>
                        <p className="font-bold text-gray-900">
                          {selectedLocation.latitude.toFixed(4)}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Longitude</p>
                        <p className="font-bold text-gray-900">
                          {selectedLocation.longitude.toFixed(4)}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: MapPin, label: "Districts", value: "64+", color: "blue" },
            {
              icon: Package,
              label: "Delivery Points",
              value: "500+",
              color: "green",
            },
            {
              icon: TrendingUp,
              label: "Daily Orders",
              value: "1000+",
              color: "purple",
            },
            {
              icon: Users,
              label: "Happy Customers",
              value: "50K+",
              color: "orange",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${stat.color}-100 mb-3`}
              >
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }
      `}</style>
    </div>
  );
}
