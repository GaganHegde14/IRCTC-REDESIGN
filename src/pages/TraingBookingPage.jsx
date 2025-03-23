import { useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SeatSelector from "../components/SeatSelector";
import {
  FaTrain,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCreditCard,
} from "react-icons/fa";
import toast from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

const trainClasses = ["AC First Class", "AC 2-Tier", "Sleeper", "General"];
const travelDates = ["2025-04-01", "2025-04-02", "2025-04-03"];

const TrainBookingPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    trainClass: "",
    seats: [],
    fare: 0,
  });

  const handleNextStep = () => {
    if (
      step === 1 &&
      (!formData.from || !formData.to || !formData.date || !formData.trainClass)
    ) {
      toast.error("Please fill all fields!");
      return;
    }
    setStep(step + 1);
  };

  const updateFare = (selectedSeats) => {
    const baseFare = formData.trainClass.includes("AC") ? 1000 : 500;
    setFormData({
      ...formData,
      seats: selectedSeats,
      fare: baseFare * selectedSeats.length,
    });
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-gray-900 to-blue-900">
      {/* Hero Section */}
      <section
        className="relative min-h-[50vh] flex items-center justify-center text-center bg-cover bg-center parallax-bg"
        style={{ backgroundImage: "url('/assets/hero/booking-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
          >
            Book Your Train Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-gray-200"
          >
            Choose your route, pick your seats, and travel in comfort.
          </motion.p>
        </div>
      </section>

      {/* Booking Steps */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-between mb-12">
            {[1, 2, 3].map((s) => (
              <motion.div
                key={s}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: s * 0.2 }}
                className={`w-1/3 text-center p-4 rounded-lg ${
                  step >= s
                    ? "bg-yellow-400 text-gray-900"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                Step {s}:{" "}
                {s === 1
                  ? "Journey Details"
                  : s === 2
                  ? "Seat Selection"
                  : "Summary"}
              </motion.div>
            ))}
          </div>

          {step === 1 && (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="glass p-10 rounded-xl max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-6 text-center text-white">
                Enter Journey Details
              </h2>
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-yellow-400 text-xl" />
                  <input
                    type="text"
                    placeholder="From"
                    value={formData.from}
                    onChange={(e) =>
                      setFormData({ ...formData, from: e.target.value })
                    }
                    className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-yellow-400 text-xl" />
                  <input
                    type="text"
                    placeholder="To"
                    value={formData.to}
                    onChange={(e) =>
                      setFormData({ ...formData, to: e.target.value })
                    }
                    className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-yellow-400 text-xl" />
                  <select
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="">Select Date</option>
                    {travelDates.map((date) => (
                      <option key={date} value={date}>
                        {date}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <FaTrain className="text-yellow-400 text-xl" />
                  <select
                    value={formData.trainClass}
                    onChange={(e) =>
                      setFormData({ ...formData, trainClass: e.target.value })
                    }
                    className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="">Select Class</option>
                    {trainClasses.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextStep}
                className="neo-button w-full bg-yellow-400 text-gray-800 p-3 rounded-lg font-semibold"
              >
                Next
              </motion.button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="glass p-10 rounded-xl max-w-4xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-6 text-center text-white">
                Select Your Seats
              </h2>
              <SeatSelector onSelect={updateFare} />
              <p className="mt-6 text-lg text-center text-gray-200">
                Total Fare: ₹{formData.fare}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextStep}
                className="neo-button w-full bg-yellow-400 text-gray-800 p-3 rounded-lg font-semibold mt-6"
              >
                Next
              </motion.button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="glass p-10 rounded-xl max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-6 text-center text-white">
                Booking Summary
              </h2>
              <div className="space-y-4">
                <p className="text-lg">
                  <span className="font-semibold">From:</span> {formData.from}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">To:</span> {formData.to}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Date:</span> {formData.date}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Class:</span>{" "}
                  {formData.trainClass}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Seats:</span>{" "}
                  {formData.seats.join(", ")}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Total Fare:</span> ₹
                  {formData.fare}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="neo-button w-full bg-green-500 text-white p-3 rounded-lg font-semibold mt-6"
              >
                <FaCreditCard className="inline mr-2" /> Proceed to Payment
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Travel Classes Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
            Explore Our Travel Classes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass p-6 rounded-xl text-center"
            >
              <img
                src="/assets/classes/ac-first.jpg"
                alt="AC First Class cabin interior"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">AC First Class</h3>
              <p className="text-gray-200">
                Experience luxury with spacious cabins, premium amenities, and
                privacy.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass p-6 rounded-xl text-center"
            >
              <img
                src="/assets/classes/ac-2tier.jpg"
                alt="AC 2-Tier berth layout"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">AC 2-Tier</h3>
              <p className="text-gray-200">
                Comfortable berths with air conditioning, ideal for long
                journeys.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass p-6 rounded-xl text-center"
            >
              <img
                src="/assets/classes/sleeper.jpg"
                alt="Sleeper class train interior"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Sleeper</h3>
              <p className="text-gray-200">
                Affordable and practical for overnight travel with basic
                amenities.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass p-6 rounded-xl text-center"
            >
              <img
                src="/assets/classes/general.jpg"
                alt="General class train seating"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">General</h3>
              <p className="text-gray-200">
                Budget-friendly option for short trips with open seating.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrainBookingPage;
