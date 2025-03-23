import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaFilter,
  FaSort,
  FaSearch,
  FaCalendarAlt,
  FaExchangeAlt,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronUp,
  FaClock,
  FaRupeeSign,
} from "react-icons/fa";
import TrainCard from "../components/TrainCard";

// Sample train data
const allTrains = [
  {
    trainNumber: "12952",
    trainName: "Mumbai Rajdhani",
    departure: "Delhi",
    departureTime: "16:25",
    arrival: "Mumbai",
    arrivalTime: "08:15",
    duration: "15:50",
    price: 1500,
    availability: "Available",
    classes: [
      { type: "SL", price: 750, availability: "Available" },
      { type: "3A", price: 1200, availability: "Available" },
      { type: "2A", price: 2200, availability: "WL 5" },
      { type: "1A", price: 3800, availability: "Available" },
    ],
  },
  {
    trainNumber: "12310",
    trainName: "New Delhi - Rajendra Nagar Tejas Rajdhani",
    departure: "New Delhi",
    departureTime: "17:15",
    arrival: "Patna",
    arrivalTime: "07:40",
    duration: "14:25",
    price: 1700,
    availability: "RAC",
    classes: [
      { type: "3A", price: 1350, availability: "RAC 12" },
      { type: "2A", price: 2350, availability: "Available" },
      { type: "1A", price: 4100, availability: "Available" },
    ],
  },
  {
    trainNumber: "12302",
    trainName: "Howrah Rajdhani",
    departure: "New Delhi",
    departureTime: "16:55",
    arrival: "Howrah",
    arrivalTime: "09:55",
    duration: "17:00",
    price: 1850,
    availability: "WL 12",
    classes: [
      { type: "3A", price: 1450, availability: "WL 12" },
      { type: "2A", price: 2600, availability: "WL 4" },
      { type: "1A", price: 4400, availability: "Available" },
    ],
  },
  {
    trainNumber: "22691",
    trainName: "Rajdhani Express",
    departure: "Bengaluru",
    departureTime: "20:00",
    arrival: "Delhi",
    arrivalTime: "05:55",
    duration: "33:55",
    price: 2200,
    availability: "Available",
    classes: [
      { type: "SL", price: 1050, availability: "Available" },
      { type: "3A", price: 1750, availability: "Available" },
      { type: "2A", price: 2950, availability: "Available" },
    ],
  },
  {
    trainNumber: "12951",
    trainName: "Mumbai Rajdhani",
    departure: "Mumbai Central",
    departureTime: "17:30",
    arrival: "New Delhi",
    arrivalTime: "08:35",
    duration: "15:05",
    price: 1500,
    availability: "Available",
    classes: [
      { type: "3A", price: 1200, availability: "Available" },
      { type: "2A", price: 2200, availability: "Available" },
      { type: "1A", price: 3800, availability: "Available" },
    ],
  },
  {
    trainNumber: "12301",
    trainName: "Howrah Rajdhani",
    departure: "Howrah",
    departureTime: "16:05",
    arrival: "New Delhi",
    arrivalTime: "10:00",
    duration: "17:55",
    price: 1850,
    availability: "RAC",
    classes: [
      { type: "3A", price: 1450, availability: "RAC 8" },
      { type: "2A", price: 2600, availability: "Available" },
      { type: "1A", price: 4400, availability: "Available" },
    ],
  },
];

// Filter options
const classOptions = [
  { value: "", label: "All Classes" },
  { value: "SL", label: "Sleeper (SL)" },
  { value: "3A", label: "AC 3 Tier (3A)" },
  { value: "2A", label: "AC 2 Tier (2A)" },
  { value: "1A", label: "AC First Class (1A)" },
];

const availabilityOptions = [
  { value: "", label: "All Availability" },
  { value: "Available", label: "Available" },
  { value: "RAC", label: "RAC" },
  { value: "WL", label: "Waiting List" },
];

const TrainListPage = () => {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sourceFilter, setSourceFilter] = useState("");
  const [destinationFilter, setDestinationFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [sortOption, setSortOption] = useState("departureTime");
  const [sortDirection, setSortDirection] = useState("asc");

  // Simulate loading trains data from API
  useEffect(() => {
    setLoading(true);
    // Simulate API request delay
    setTimeout(() => {
      setTrains(allTrains);
      setLoading(false);
    }, 1000);
  }, []);

  // Apply filters and sorting
  const filteredAndSortedTrains = trains
    .filter((train) => {
      return (
        (sourceFilter === "" ||
          train.departure.toLowerCase().includes(sourceFilter.toLowerCase())) &&
        (destinationFilter === "" ||
          train.arrival
            .toLowerCase()
            .includes(destinationFilter.toLowerCase())) &&
        (classFilter === "" ||
          train.classes.some((c) => c.type === classFilter)) &&
        (availabilityFilter === "" ||
          (availabilityFilter === "Available"
            ? train.availability === "Available"
            : availabilityFilter === "RAC"
            ? train.availability.includes("RAC")
            : availabilityFilter === "WL"
            ? train.availability.includes("WL")
            : true))
      );
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortOption) {
        case "departureTime":
          comparison = a.departureTime.localeCompare(b.departureTime);
          break;
        case "arrivalTime":
          comparison = a.arrivalTime.localeCompare(b.arrivalTime);
          break;
        case "duration":
          comparison = a.duration.localeCompare(b.duration);
          break;
        case "price":
          comparison = a.price - b.price;
          break;
        default:
          comparison = a.departureTime.localeCompare(b.departureTime);
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="container mx-auto px-4">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Find Trains
          </h1>
          <p className="text-gray-600">
            Search and filter trains between stations
          </p>
        </div>

        {/* Filters section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Filters & Sort Options</h2>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              {filterOpen ? (
                <>
                  <FaChevronUp className="mr-1" /> Hide Filters
                </>
              ) : (
                <>
                  <FaChevronDown className="mr-1" /> Show Filters
                </>
              )}
            </button>
          </div>

          {filterOpen && (
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* Source filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From Station
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Source station"
                      value={sourceFilter}
                      onChange={(e) => setSourceFilter(e.target.value)}
                      className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Destination filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To Station
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Destination station"
                      value={destinationFilter}
                      onChange={(e) => setDestinationFilter(e.target.value)}
                      className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Class filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Class
                  </label>
                  <select
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {classOptions.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Availability filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Availability
                  </label>
                  <select
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    {availabilityOptions.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sort By
                    </label>
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="departureTime">Departure Time</option>
                      <option value="arrivalTime">Arrival Time</option>
                      <option value="duration">Journey Duration</option>
                      <option value="price">Price</option>
                    </select>
                  </div>

                  <button
                    onClick={toggleSortDirection}
                    className="flex items-center p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <FaSort className="mr-2" />
                    {sortDirection === "asc" ? "Ascending" : "Descending"}
                  </button>
                </div>

                <button
                  onClick={() => {
                    setSourceFilter("");
                    setDestinationFilter("");
                    setClassFilter("");
                    setAvailabilityFilter("");
                    setSortOption("departureTime");
                    setSortDirection("asc");
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Trains listing */}
        <div className="space-y-4">
          {loading ? (
            // Loading state
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Loading trains...</p>
            </div>
          ) : filteredAndSortedTrains.length === 0 ? (
            // No results state
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No trains found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filters or search for a different route.
              </p>
            </div>
          ) : (
            // Results list
            <>
              <p className="text-sm text-gray-600 mb-2">
                Showing {filteredAndSortedTrains.length} trains
              </p>
              {filteredAndSortedTrains.map((train, index) => (
                <motion.div
                  key={train.trainNumber}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <TrainCard
                    trainNumber={train.trainNumber}
                    trainName={train.trainName}
                    departure={train.departure}
                    departureTime={train.departureTime}
                    arrival={train.arrival}
                    arrivalTime={train.arrivalTime}
                    duration={train.duration}
                    price={train.price}
                    availability={train.availability}
                    availabilityColor={
                      train.availability === "Available"
                        ? "text-green-600"
                        : train.availability.includes("RAC")
                        ? "text-amber-600"
                        : "text-red-600"
                    }
                    classes={train.classes}
                  />
                </motion.div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainListPage;
