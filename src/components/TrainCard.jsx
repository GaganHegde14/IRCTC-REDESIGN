import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaTrain,
  FaClock,
  FaRegClock,
  FaArrowRight,
  FaWifi,
  FaUtensils,
  FaToilet,
  FaChargingStation,
  FaInfoCircle,
  FaRupeeSign,
  FaRegCalendarAlt,
  FaChevronDown,
  FaChevronUp,
  FaRegStar,
  FaTicketAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const TrainCard = ({
  trainNumber,
  trainName,
  departure,
  departureTime,
  arrival,
  arrivalTime,
  duration,
  price,
  availability = "Available",
  availabilityColor = "text-green-600",
  amenities = ["wifi", "food", "toilet", "charging"],
  date = new Date().toISOString().split("T")[0],
  classes = [
    { type: "SL", price: 750, availability: "Available" },
    { type: "3A", price: 1200, availability: "RAC" },
    { type: "2A", price: 2200, availability: "WL 5" },
    { type: "1A", price: 3800, availability: "Available" },
  ],
  rating = 4.2,
}) => {
  const [expanded, setExpanded] = useState(false);

  // Calculate departure and arrival timestamps for animation
  const depTime = new Date(`2023-01-01T${departureTime}`);
  const arrTime = new Date(`2023-01-01T${arrivalTime}`);

  // Calculate journey progress percentage for the progress bar
  const totalMinutes = (arrTime - depTime) / (1000 * 60);

  // Format duration (e.g. "5h 30m")
  const formatDuration = (duration) => {
    const [hours, minutes] = duration.split(":");
    return `${parseInt(hours)}h ${parseInt(minutes)}m`;
  };

  const tooltipVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const amenityIcons = {
    wifi: <FaWifi className="text-blue-500" />,
    food: <FaUtensils className="text-orange-500" />,
    toilet: <FaToilet className="text-gray-500" />,
    charging: <FaChargingStation className="text-green-500" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
    >
      {/* Main content */}
      <div className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <FaTrain className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">{trainName}</h3>
              <p className="text-sm text-gray-500">{trainNumber}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              <FaRegStar className="text-yellow-400 mr-1" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              <FaRegCalendarAlt className="inline mr-1" size={10} />
              {date}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          {/* Departure */}
          <div className="text-center sm:text-left">
            <p className="text-2xl font-bold text-gray-900">{departureTime}</p>
            <p className="text-sm font-medium text-gray-900">{departure}</p>
          </div>

          {/* Journey */}
          <div className="flex-1 px-6 flex flex-col items-center">
            <p className="text-xs text-gray-500 mb-1">
              {formatDuration(duration)}
            </p>
            <div className="relative w-full">
              <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-0.5 bg-gray-200"></div>
              <div
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 h-0.5"
                style={{
                  width: `${
                    ((depTime.getHours() * 60 + depTime.getMinutes()) /
                      totalMinutes) *
                    100
                  }%`,
                }}
              ></div>
              <div className="flex justify-between relative">
                <div className="w-3 h-3 rounded-full bg-blue-500 z-10 relative">
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-blue-500 rounded-full opacity-20"
                  />
                </div>
                <FaArrowRight className="text-gray-400 mx-2" />
                <div className="w-3 h-3 rounded-full bg-red-500 z-10"></div>
              </div>
            </div>
          </div>

          {/* Arrival */}
          <div className="text-center sm:text-right">
            <p className="text-2xl font-bold text-gray-900">{arrivalTime}</p>
            <p className="text-sm font-medium text-gray-900">{arrival}</p>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex items-center justify-between mt-4 border-t border-b border-gray-100 py-3">
          <div className="flex space-x-4">
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                className="relative group"
                whileHover="visible"
              >
                <div className="p-1.5 bg-gray-50 rounded-md">
                  {amenityIcons[amenity]}
                </div>
                <motion.div
                  variants={tooltipVariants}
                  initial="hidden"
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100"
                >
                  {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <div className={`text-sm font-medium ${availabilityColor}`}>
              {availability}
            </div>
            <div className="text-lg font-bold text-gray-900 flex items-center">
              <FaRupeeSign className="text-sm mr-0.5" />
              {price}
            </div>
          </div>
        </div>
      </div>

      {/* Expandable details */}
      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden bg-gray-50"
      >
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {classes.map((cls, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-3 rounded-lg border border-gray-100 flex flex-col"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{cls.type}</span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      cls.availability === "Available"
                        ? "bg-green-100 text-green-800"
                        : cls.availability.includes("RAC")
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {cls.availability}
                  </span>
                </div>
                <div className="flex items-baseline">
                  <FaRupeeSign className="text-sm mr-0.5 text-gray-500" />
                  <span className="text-lg font-bold text-gray-900">
                    {cls.price}
                  </span>
                </div>
                <Link
                  to={`/book?train=${trainNumber}&class=${cls.type}&date=${date}`}
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-2 w-full text-sm bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-md font-medium flex items-center justify-center gap-1"
                  >
                    <FaTicketAlt size={12} />
                    Book Now
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Toggle button */}
      <motion.button
        whileHover={{ backgroundColor: expanded ? "#E5E7EB" : "#F3F4F6" }}
        className={`w-full py-2 flex items-center justify-center ${
          expanded ? "bg-gray-200" : "bg-gray-100"
        }`}
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-sm font-medium text-gray-600 mr-1">
          {expanded ? "Hide Details" : "View Seat Availability"}
        </span>
        {expanded ? (
          <FaChevronUp className="text-gray-500" />
        ) : (
          <FaChevronDown className="text-gray-500" />
        )}
      </motion.button>
    </motion.div>
  );
};

export default TrainCard;
