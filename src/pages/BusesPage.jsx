import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaBus,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaExchangeAlt,
  FaSearch,
  FaStar,
  FaWifi,
  FaChargingStation,
  FaSnowflake,
  FaToilet,
  FaUserFriends,
  FaTv,
  FaRegClock,
} from "react-icons/fa";
import { MdAirlineSeatReclineNormal, MdEventSeat } from "react-icons/md";

// Sample bus data
const buses = [
  {
    id: 1,
    operator: "KSRTC Swift",
    type: "Volvo A/C Multi-Axle Semi Sleeper",
    departure: { time: "21:00", location: "Bengaluru" },
    arrival: { time: "06:30", location: "Chennai" },
    duration: "9h 30m",
    price: 1250,
    rating: 4.5,
    available: 32,
    amenities: ["wifi", "charging", "ac", "toilet"],
  },
  {
    id: 2,
    operator: "Sharma Travels",
    type: "Non A/C Sleeper",
    departure: { time: "22:15", location: "Delhi" },
    arrival: { time: "08:45", location: "Jaipur" },
    duration: "10h 30m",
    price: 850,
    rating: 3.8,
    available: 12,
    amenities: ["toilet"],
  },
  {
    id: 3,
    operator: "Rajdhani Express",
    type: "Volvo A/C Multi-Axle Sleeper",
    departure: { time: "19:30", location: "Mumbai" },
    arrival: { time: "09:15", location: "Pune" },
    duration: "13h 45m",
    price: 1800,
    rating: 4.7,
    available: 8,
    amenities: ["wifi", "charging", "ac", "toilet", "tv"],
  },
  {
    id: 4,
    operator: "Patel Tours",
    type: "A/C Sleeper",
    departure: { time: "20:45", location: "Ahmedabad" },
    arrival: { time: "10:30", location: "Mumbai" },
    duration: "13h 45m",
    price: 1400,
    rating: 4.2,
    available: 22,
    amenities: ["charging", "ac", "toilet"],
  },
  {
    id: 5,
    operator: "Orange Travels",
    type: "Volvo A/C Multi-Axle Semi Sleeper",
    departure: { time: "23:00", location: "Hyderabad" },
    arrival: { time: "08:15", location: "Bengaluru" },
    duration: "9h 15m",
    price: 1350,
    rating: 4.3,
    available: 15,
    amenities: ["wifi", "charging", "ac", "toilet"],
  },
  {
    id: 6,
    operator: "Kaveri Travels",
    type: "A/C Seater",
    departure: { time: "06:30", location: "Chennai" },
    arrival: { time: "11:45", location: "Pondicherry" },
    duration: "5h 15m",
    price: 450,
    rating: 4.0,
    available: 28,
    amenities: ["ac"],
  },
];

// Popular routes
const popularRoutes = [
  { from: "Delhi", to: "Jaipur" },
  { from: "Mumbai", to: "Pune" },
  { from: "Bengaluru", to: "Chennai" },
  { from: "Hyderabad", to: "Vijayawada" },
  { from: "Ahmedabad", to: "Mumbai" },
  { from: "Chennai", to: "Pondicherry" },
];

// Cities list
const cities = [
  "Ahmedabad",
  "Bengaluru",
  "Chennai",
  "Delhi",
  "Hyderabad",
  "Jaipur",
  "Kolkata",
  "Mumbai",
  "Pune",
  "Pondicherry",
  "Vijayawada",
  "Kochi",
  "Goa",
  "Lucknow",
  "Indore",
];

const BusesPage = () => {
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
    passengers: 1,
  });

  const [filteredBuses, setFilteredBuses] = useState(buses);
  const [sort, setSort] = useState("departure");
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Format today's date in YYYY-MM-DD format for the date input
  const today = new Date().toISOString().split("T")[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const swapLocations = () => {
    setSearchParams((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchPerformed(true);

    // In a real app, this would fetch data from an API
    // For now, we'll just simulate filtering based on from/to locations
    if (searchParams.from && searchParams.to) {
      const filtered = buses.filter(
        (bus) =>
          bus.departure.location === searchParams.from &&
          bus.arrival.location === searchParams.to
      );
      setFilteredBuses(filtered.length > 0 ? filtered : buses);
    } else {
      setFilteredBuses(buses);
    }
  };

  const handleSort = (sortType) => {
    setSort(sortType);
    let sorted = [...filteredBuses];

    switch (sortType) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "departure":
        sorted.sort((a, b) => {
          const timeA = parseInt(a.departure.time.replace(":", ""));
          const timeB = parseInt(b.departure.time.replace(":", ""));
          return timeA - timeB;
        });
        break;
      case "arrival":
        sorted.sort((a, b) => {
          const timeA = parseInt(a.arrival.time.replace(":", ""));
          const timeB = parseInt(b.arrival.time.replace(":", ""));
          return timeA - timeB;
        });
        break;
      case "duration":
        sorted.sort((a, b) => {
          const durationA = a.duration.includes("h")
            ? parseInt(a.duration.split("h")[0]) * 60 +
              parseInt(a.duration.split("h")[1].replace("m", ""))
            : parseInt(a.duration.replace("m", ""));

          const durationB = b.duration.includes("h")
            ? parseInt(b.duration.split("h")[0]) * 60 +
              parseInt(b.duration.split("h")[1].replace("m", ""))
            : parseInt(b.duration.replace("m", ""));

          return durationA - durationB;
        });
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredBuses(sorted);
  };

  // Get the appropriate amenity icon
  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case "wifi":
        return <FaWifi title="Wi-Fi" />;
      case "charging":
        return <FaChargingStation title="Charging Point" />;
      case "ac":
        return <FaSnowflake title="Air Conditioning" />;
      case "toilet":
        return <FaToilet title="Toilet" />;
      case "tv":
        return <FaTv title="Entertainment" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            >
              Book Bus Tickets Online with IRCTC
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-blue-100"
            >
              Safe and Comfortable bus journeys across India
            </motion.p>
          </div>

          {/* Search Form */}
          <div className="max-w-5xl mx-auto">
            <form
              onSubmit={handleSearch}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <label className="block text-xs text-gray-500 mb-1">
                    From
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                    <select
                      name="from"
                      value={searchParams.from}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      required
                    >
                      <option value="">Select city</option>
                      {cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-xs text-gray-500 mb-1">To</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                    <select
                      name="to"
                      value={searchParams.to}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      required
                    >
                      <option value="">Select city</option>
                      {cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={swapLocations}
                  className="absolute left-1/2 md:left-[25%] top-10 transform -translate-x-1/2 bg-blue-50 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center border border-blue-100 hover:bg-blue-100 transition-colors"
                >
                  <FaExchangeAlt />
                </button>

                <div className="relative">
                  <label className="block text-xs text-gray-500 mb-1">
                    Journey Date
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="date"
                      name="date"
                      value={searchParams.date}
                      onChange={handleInputChange}
                      min={today}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-xs text-gray-500 mb-1">
                    Passengers
                  </label>
                  <div className="relative">
                    <FaUserFriends className="absolute left-3 top-3 text-gray-400" />
                    <select
                      name="passengers"
                      value={searchParams.passengers}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Passenger" : "Passengers"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="md:col-span-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <FaSearch className="mr-2" /> Search Buses
                  </button>
                </div>
              </div>

              {/* Popular Routes Suggestion */}
              <div className="mt-4">
                <h3 className="text-xs text-gray-500 mb-2">Popular Routes:</h3>
                <div className="flex flex-wrap gap-2">
                  {popularRoutes.map((route, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        setSearchParams((prev) => ({
                          ...prev,
                          from: route.from,
                          to: route.to,
                        }))
                      }
                      className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors flex items-center"
                    >
                      <FaBus className="mr-1" /> {route.from} - {route.to}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Bus Listings Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {searchPerformed && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredBuses.length > 0
                    ? `${filteredBuses.length} Buses Available`
                    : "No Buses Found"}
                </h2>

                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                  <select
                    value={sort}
                    onChange={(e) => handleSort(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="departure">Departure Time</option>
                    <option value="arrival">Arrival Time</option>
                    <option value="duration">Duration</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>

              {searchParams.from && searchParams.to && (
                <div className="bg-blue-50 rounded-lg p-4 mb-6 flex items-center">
                  <FaBus className="text-blue-600 mr-3" />
                  <div>
                    <p className="text-blue-800 font-medium">
                      {searchParams.from} to {searchParams.to}
                    </p>
                    <p className="text-sm text-blue-600">
                      {searchParams.date
                        ? new Date(searchParams.date).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "Select a date"}
                    </p>
                  </div>
                </div>
              )}

              {filteredBuses.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  <AnimatePresence>
                    {filteredBuses.map((bus) => (
                      <motion.div
                        key={bus.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="md:w-1/3">
                              <h3 className="text-lg font-bold text-gray-900">
                                {bus.operator}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {bus.type}
                              </p>
                              <div className="flex items-center mt-2">
                                <div className="flex items-center text-amber-500">
                                  <FaStar />
                                  <span className="ml-1 text-sm font-medium">
                                    {bus.rating}
                                  </span>
                                </div>
                                <div className="ml-3 flex space-x-1 text-gray-500 text-sm">
                                  {bus.amenities.map((amenity, index) => (
                                    <span key={index} className="text-gray-400">
                                      {getAmenityIcon(amenity)}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center md:w-1/3">
                              <div className="text-center">
                                <p className="text-xl font-bold text-gray-900">
                                  {bus.departure.time}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {bus.departure.location}
                                </p>
                              </div>

                              <div className="mx-4 flex-1 flex flex-col items-center">
                                <div className="text-xs text-gray-500 mb-1">
                                  {bus.duration}
                                </div>
                                <div className="w-full h-0.5 bg-gray-200 relative">
                                  <div className="absolute -left-1 -top-1.5 w-3 h-3 rounded-full bg-blue-600"></div>
                                  <div className="absolute -right-1 -top-1.5 w-3 h-3 rounded-full bg-blue-600"></div>
                                </div>
                              </div>

                              <div className="text-center">
                                <p className="text-xl font-bold text-gray-900">
                                  {bus.arrival.time}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {bus.arrival.location}
                                </p>
                              </div>
                            </div>

                            <div className="md:w-1/3 flex flex-col md:items-end">
                              <div className="mb-2">
                                <p className="text-sm text-gray-500">
                                  Starting from
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                  ₹{bus.price}
                                </p>
                              </div>

                              <div className="flex items-center justify-between w-full">
                                <div className="text-sm">
                                  <span className="text-green-600 font-medium">
                                    {bus.available} seats
                                  </span>{" "}
                                  available
                                </div>
                                <Link
                                  to={`/bus/${bus.id}?from=${searchParams.from}&to=${searchParams.to}&date=${searchParams.date}&passengers=${searchParams.passengers}`}
                                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
                                >
                                  Select Seats
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <FaBus className="text-5xl text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    No Buses Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any buses matching your criteria. Try
                    changing your search parameters.
                  </p>
                  <button
                    onClick={() => setSearchPerformed(false)}
                    className="text-blue-600 hover:underline"
                  >
                    Search again
                  </button>
                </div>
              )}
            </>
          )}

          {!searchPerformed && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Why Travel by Bus?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                    <MdAirlineSeatReclineNormal size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Comfortable Journey
                  </h3>
                  <p className="text-gray-600">
                    Spacious seating with ample legroom for a relaxed journey
                    experience.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                    <FaRegClock size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Convenient Timings
                  </h3>
                  <p className="text-gray-600">
                    Multiple departure times to fit your schedule and travel
                    plans.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                    <MdEventSeat size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Seat Selection</h3>
                  <p className="text-gray-600">
                    Choose your preferred seat and travel with comfort and
                    convenience.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Safety First Commitment
            </h2>
            <p className="text-gray-600">
              Your safety is our top priority. We're implementing enhanced
              safety measures for a worry-free journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Sanitized Buses",
                desc: "All buses are thoroughly sanitized before each trip",
                icon: "😷",
              },
              {
                title: "Regular Temperature Checks",
                desc: "Temperature screening for all passengers",
                icon: "🌡️",
              },
              {
                title: "Masked Staff",
                desc: "All staff members wear masks during the journey",
                icon: "😷",
              },
              {
                title: "Social Distancing",
                desc: "Seating arrangements to maintain social distancing",
                icon: "🧍‍♂️",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-5 text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusesPage;
