import { useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaUser, FaTicketAlt, FaCog } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const bookings = [
  {
    id: 1,
    train: "Rajdhani Express",
    date: "2025-04-01",
    status: "Confirmed",
    from: "Delhi",
    to: "Mumbai",
    fare: 2000,
  },
  {
    id: 2,
    train: "Shatabdi Express",
    date: "2025-04-05",
    status: "Pending",
    from: "Mumbai",
    to: "Pune",
    fare: 800,
  },
  {
    id: 3,
    train: "Duronto Express",
    date: "2025-04-10",
    status: "Cancelled",
    from: "Chennai",
    to: "Bangalore",
    fare: 600,
  },
];

const ProfilePage = () => {
  const [user] = useState({
    name: "Amit Sharma",
    email: "amit.sharma@example.com",
    phone: "9876543210",
  });

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-blue-900 to-gray-900">
      {/* Hero Section */}
      <section
        className="relative min-h-[50vh] flex items-center justify-center text-center bg-cover bg-center parallax-bg"
        style={{ backgroundImage: "url('/assets/hero/profile-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
          >
            Your Travel Dashboard
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-gray-200"
          >
            Manage your bookings, preferences, and settings.
          </motion.p>
        </div>
      </section>

      {/* User Details */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass p-10 rounded-xl max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6 text-center text-white">
              User Details
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaUser className="text-yellow-400 text-xl" />
                <p className="text-lg">
                  <span className="font-semibold">Name:</span> {user.name}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaUser className="text-yellow-400 text-xl" />
                <p className="text-lg">
                  <span className="font-semibold">Email:</span> {user.email}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FaUser className="text-yellow-400 text-xl" />
                <p className="text-lg">
                  <span className="font-semibold">Phone:</span> {user.phone}
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="neo-button w-full bg-yellow-400 text-gray-800 p-3 rounded-lg font-semibold mt-6"
            >
              Edit Profile
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Booking History */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
            Booking History
          </h2>
          <div className="space-y-6">
            {bookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass p-6 rounded-xl flex justify-between items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold">{booking.train}</h3>
                  <p className="text-gray-200">
                    From: {booking.from} | To: {booking.to}
                  </p>
                  <p className="text-gray-200">Date: {booking.date}</p>
                  <p className="text-gray-200">Fare: ₹{booking.fare}</p>
                </div>
                <div
                  className={`text-lg font-semibold ${
                    booking.status === "Confirmed"
                      ? "text-green-400"
                      : booking.status === "Pending"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {booking.status}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section className="py-20 bg-blue-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
            Travel Preferences
          </h2>
          <div className="glass p-10 rounded-xl max-w-2xl mx-auto">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-xl font-semibold mb-2">
                  Preferred Seat Type
                </h3>
                <select className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                  <option>Window</option>
                  <option>Aisle</option>
                  <option>Middle</option>
                </select>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-xl font-semibold mb-2">Preferred Class</h3>
                <select className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400">
                  <option>AC First Class</option>
                  <option>AC 2-Tier</option>
                  <option>Sleeper</option>
                </select>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="neo-button w-full bg-yellow-400 text-gray-800 p-3 rounded-lg font-semibold"
              >
                <FaCog className="inline mr-2" /> Save Preferences
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
