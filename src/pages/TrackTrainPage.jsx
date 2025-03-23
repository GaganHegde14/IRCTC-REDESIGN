import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaMapMarkedAlt,
  FaClock,
  FaTrain,
  FaSearch,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { cityOptions } from "../components/cities";

gsap.registerPlugin(ScrollTrigger);

const trainTrackingData = [
  {
    pnr: "1234567890",
    trainNumber: "12301",
    source: "Delhi",
    destination: "Mumbai",
    position: [28.7041, 77.1025],
    status: "On Time",
    eta: "2:30 PM",
    nextStop: "Surat",
    timeline: [
      { step: 1, location: "Delhi", scheduled: "8:00 AM", platform: 3 },
      { step: 2, location: "Surat", scheduled: "11:00 AM", platform: 2 },
      { step: 3, location: "Mumbai", scheduled: "2:30 PM", platform: 5 },
    ],
  },
  {
    pnr: "0987654321",
    trainNumber: "12302",
    source: "Mumbai",
    destination: "Chennai",
    position: [19.076, 72.8777],
    status: "Delayed",
    eta: "3:00 PM",
    nextStop: "Pune",
    timeline: [
      { step: 1, location: "Mumbai", scheduled: "9:00 AM", platform: 1 },
      { step: 2, location: "Pune", scheduled: "12:00 PM", platform: 4 },
      { step: 3, location: "Chennai", scheduled: "3:00 PM", platform: 2 },
    ],
  },
];

const TrackTrainPage = () => {
  const [trackingMethod, setTrackingMethod] = useState("pnr");
  const [pnr, setPnr] = useState("");
  const [trainNumber, setTrainNumber] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [position, setPosition] = useState([20.5937, 78.9629]);
  const [status, setStatus] = useState("On Time");
  const [eta, setEta] = useState("2:30 PM");
  const [nextStop, setNextStop] = useState("Central Station");
  const [timeline, setTimeline] = useState([]);
  const [showSourceOptions, setShowSourceOptions] = useState(false);
  const [showDestOptions, setShowDestOptions] = useState(false);

  const handleDemoPnr = () => {
    setPnr("1234567890");
    setTrackingMethod("pnr");
  };

  const handleDemoTrainNumber = () => {
    setTrainNumber("12301");
    setTrackingMethod("trainNumber");
  };

  const handleTrack = () => {
    let train = null;
    if (trackingMethod === "pnr") {
      train = trainTrackingData.find((t) => t.pnr === pnr);
    } else if (trackingMethod === "trainNumber") {
      train = trainTrackingData.find((t) => t.trainNumber === trainNumber);
    } else if (trackingMethod === "sourceDestination") {
      train = trainTrackingData.find(
        (t) =>
          t.source.toLowerCase() === source.toLowerCase() &&
          t.destination.toLowerCase() === destination.toLowerCase()
      );
    }

    if (train) {
      setSelectedTrain(train);
      setPosition(train.position);
      setStatus(train.status);
      setEta(train.eta);
      setNextStop(train.nextStop);
      setTimeline(train.timeline);
    } else {
      alert("Train not found. Please check your input.");
    }
  };

  useEffect(() => {
    if (selectedTrain) {
      const interval = setInterval(() => {
        setPosition([position[0] + 0.001, position[1] + 0.001]);
        setStatus(Math.random() > 0.5 ? "On Time" : "Delayed");
        setEta(Math.random() > 0.5 ? "2:30 PM" : "3:00 PM");
        setNextStop(Math.random() > 0.5 ? "Central Station" : "North Station");
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [position, selectedTrain]);

  const filteredSourceOptions = cityOptions.filter(
    (city) =>
      city.name.toLowerCase().includes(source.toLowerCase()) &&
      city.name.toLowerCase() !== destination.toLowerCase()
  );

  const filteredDestOptions = cityOptions.filter(
    (city) =>
      city.name.toLowerCase().includes(destination.toLowerCase()) &&
      city.name.toLowerCase() !== source.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative min-h-[50vh] flex items-center justify-center text-center bg-gradient-to-r from-blue-900 to-blue-600">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4 gradient-text"
          >
            Track Your Train in Real-Time
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-gray-200"
          >
            Stay updated with live train locations and statuses.
          </motion.p>
        </div>
        <div className="moving-train">
          <div className="train">
            <FaTrain className="text-5xl text-white" />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass p-6 rounded-xl shadow-lg max-w-2xl mx-auto relative z-10"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Track Your Train
            </h2>
            <div className="flex space-x-4 mb-4">
              <button
                onClick={() => setTrackingMethod("pnr")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  trackingMethod === "pnr"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                PNR
              </button>
              <button
                onClick={() => setTrackingMethod("trainNumber")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  trackingMethod === "trainNumber"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                Train Number
              </button>
              <button
                onClick={() => setTrackingMethod("sourceDestination")}
                className={`px-4 py-2 rounded-lg font-medium ${
                  trackingMethod === "sourceDestination"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                Source & Destination
              </button>
            </div>

            <div className="flex space-x-4 mb-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDemoPnr}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-medium"
              >
                Demo PNR
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleDemoTrainNumber}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-medium"
              >
                Demo Train Number
              </motion.button>
            </div>

            {trackingMethod === "pnr" && (
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={pnr}
                  onChange={(e) => setPnr(e.target.value)}
                  placeholder="Enter PNR (e.g., 1234567890)"
                  className="flex-1 p-3 glass rounded-lg border border-gray-200 focus:border-blue-400 outline-none text-gray-900"
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleTrack}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center gap-2"
                >
                  <FaSearch />
                  Track
                </motion.button>
              </div>
            )}

            {trackingMethod === "trainNumber" && (
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={trainNumber}
                  onChange={(e) => setTrainNumber(e.target.value)}
                  placeholder="Enter Train Number (e.g., 12301)"
                  className="flex-1 p-3 glass rounded-lg border border-gray-200 focus:border-blue-400 outline-none text-gray-900"
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleTrack}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center gap-2"
                >
                  <FaSearch />
                  Track
                </motion.button>
              </div>
            )}

            {trackingMethod === "sourceDestination" && (
              <div className="flex space-x-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    onFocus={() => setShowSourceOptions(true)}
                    placeholder="Source (e.g., Delhi)"
                    className="w-full p-3 glass rounded-lg border border-gray-200 focus:border-blue-400 outline-none text-gray-900"
                  />
                  <FaMapMarkerAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  <AnimatePresence>
                    {showSourceOptions && filteredSourceOptions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 left-0 right-0 mt-2 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto border border-gray-200"
                      >
                        {filteredSourceOptions.map((city, index) => (
                          <motion.div
                            key={city.code}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03 }}
                            className="p-3 hover:bg-blue-50 cursor-pointer flex items-center transition-colors"
                            onClick={() => {
                              setSource(city.name);
                              setShowSourceOptions(false);
                            }}
                          >
                            <div className="ml-2">
                              <div className="font-medium text-gray-900">
                                {city.name}
                              </div>
                              <div className="text-xs text-gray-500 flex items-center">
                                <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-medium">
                                  {city.code}
                                </span>
                                <span className="mx-1">•</span>
                                <span>{city.state}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onFocus={() => setShowDestOptions(true)}
                    placeholder="Destination (e.g., Mumbai)"
                    className="w-full p-3 glass rounded-lg border border-gray-200 focus:border-blue-400 outline-none text-gray-900"
                  />
                  <FaMapMarkerAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  <AnimatePresence>
                    {showDestOptions && filteredDestOptions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-50 left-0 right-0 mt-2 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto border border-gray-200"
                      >
                        {filteredDestOptions.map((city, index) => (
                          <motion.div
                            key={city.code}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.03 }}
                            className="p-3 hover:bg-blue-50 cursor-pointer flex items-center transition-colors"
                            onClick={() => {
                              setDestination(city.name);
                              setShowDestOptions(false);
                            }}
                          >
                            <div className="ml-2">
                              <div className="font-medium text-gray-900">
                                {city.name}
                              </div>
                              <div className="text-xs text-gray-500 flex items-center">
                                <span className="bg-red-100 text-red-700 px-1.5 py-0.5 rounded text-xs font-medium">
                                  {city.code}
                                </span>
                                <span className="mx-1">•</span>
                                <span>{city.state}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleTrack}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center gap-2"
                >
                  <FaSearch />
                  Track
                </motion.button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {selectedTrain && (
        <>
          <section className="py-20">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="glass p-8 rounded-xl shadow-lg"
              >
                <MapContainer
                  center={position}
                  zoom={5}
                  style={{
                    height: "500px",
                    width: "100%",
                    borderRadius: "12px",
                  }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={position}>
                    <Popup>Your train is here!</Popup>
                  </Marker>
                </MapContainer>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <div className="glass p-4 rounded-lg text-center hover-grow">
                    <FaClock className="text-yellow-400 text-2xl mx-auto mb-2" />
                    <p className="text-lg text-gray-900">
                      <span className="font-semibold">Estimated Arrival:</span>{" "}
                      {eta}
                    </p>
                  </div>
                  <div className="glass p-4 rounded-lg text-center hover-grow">
                    <FaTrain className="text-yellow-400 text-2xl mx-auto mb-2" />
                    <p className="text-lg text-gray-900">
                      <span className="font-semibold">Current Status:</span>{" "}
                      {status}
                    </p>
                  </div>
                  <div className="glass p-4 rounded-lg text-center hover-grow">
                    <FaMapMarkedAlt className="text-yellow-400 text-2xl mx-auto mb-2" />
                    <p className="text-lg text-gray-900">
                      <span className="font-semibold">Next Stop:</span>{" "}
                      {nextStop}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-6">
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 gradient-text">
                Journey Timeline
              </h2>
              <div className="space-y-8">
                {timeline.map((stop) => (
                  <motion.div
                    key={stop.step}
                    initial={{ opacity: 0, x: stop.step % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="glass p-6 rounded-xl flex items-center gap-4 hover-grow"
                  >
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {stop.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {stop.step === 1
                          ? `Departure: ${stop.location}`
                          : stop.step === timeline.length
                          ? `Arrival: ${stop.location}`
                          : `Stop: ${stop.location}`}
                      </h3>
                      <p className="text-gray-600">
                        Scheduled: {stop.scheduled} | Platform: {stop.platform}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default TrackTrainPage;
