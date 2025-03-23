import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaMapMarkedAlt, FaClock, FaTrain } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const TrackTrainPage = () => {
  const [position, setPosition] = useState([51.505, -0.09]);
  const [status, setStatus] = useState("On Time");
  const [eta, setEta] = useState("2:30 PM");
  const [nextStop, setNextStop] = useState("Central Station");

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition([position[0] + 0.001, position[1] + 0.001]);
      setStatus(Math.random() > 0.5 ? "On Time" : "Delayed");
      setEta(Math.random() > 0.5 ? "2:30 PM" : "3:00 PM");
      setNextStop(Math.random() > 0.5 ? "Central Station" : "North Station");
    }, 5000);
    return () => clearInterval(interval);
  }, [position]);

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-blue-900 to-gray-900">
      {/* Hero Section */}
      <section
        className="relative min-h-[50vh] flex items-center justify-center text-center bg-cover bg-center parallax-bg"
        style={{ backgroundImage: "url('/assets/hero/track-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
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
      </section>

      {/* Map Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="glass p-10 rounded-xl"
          >
            <MapContainer
              center={position}
              zoom={13}
              style={{ height: "500px", width: "100%", borderRadius: "12px" }}
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
              <div className="glass p-4 rounded-lg text-center">
                <FaClock className="text-yellow-400 text-2xl mx-auto mb-2" />
                <p className="text-lg">
                  <span className="font-semibold">Estimated Arrival:</span>{" "}
                  {eta}
                </p>
              </div>
              <div className="glass p-4 rounded-lg text-center">
                <FaTrain className="text-yellow-400 text-2xl mx-auto mb-2" />
                <p className="text-lg">
                  <span className="font-semibold">Current Status:</span>{" "}
                  {status}
                </p>
              </div>
              <div className="glass p-4 rounded-lg text-center">
                <FaMapMarkedAlt className="text-yellow-400 text-2xl mx-auto mb-2" />
                <p className="text-lg">
                  <span className="font-semibold">Next Stop:</span> {nextStop}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
            Journey Timeline
          </h2>
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="glass p-6 rounded-xl flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold">Departure: Mumbai</h3>
                <p className="text-gray-200">
                  Scheduled: 8:00 AM | Platform: 3
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="glass p-6 rounded-xl flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold">Stop: Surat</h3>
                <p className="text-gray-200">
                  Scheduled: 11:00 AM | Platform: 2
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="glass p-6 rounded-xl flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-gray-900 font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold">Arrival: Delhi</h3>
                <p className="text-gray-200">
                  Scheduled: 2:30 PM | Platform: 5
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrackTrainPage;
