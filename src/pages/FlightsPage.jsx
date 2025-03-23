import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPlane,
  FaCalendarAlt,
  FaUser,
  FaExchangeAlt,
  FaSearch,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaBriefcase,
  FaUtensils,
  FaWifi,
  FaChargingStation,
  FaArrowRight,
} from "react-icons/fa";

// Popular routes
const popularRoutes = [
  { from: "Delhi", to: "Mumbai", price: 3500 },
  { from: "Mumbai", to: "Bangalore", price: 2800 },
  { from: "Delhi", to: "Kolkata", price: 4200 },
  { from: "Chennai", to: "Hyderabad", price: 2300 },
  { from: "Delhi", to: "Goa", price: 4800 },
  { from: "Mumbai", to: "Jaipur", price: 3100 },
];

// Cities data
const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Ahmedabad",
  "Pune",
  "Jaipur",
  "Goa",
  "Lucknow",
  "Kochi",
  "Varanasi",
  "Guwahati",
  "Bhubaneswar",
];

const FlightsPage = () => {
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
    returnDate: "",
    passengers: 1,
    tripType: "one-way", // one-way or round-trip
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePassengerChange = (increment) => {
    setSearchParams((prev) => ({
      ...prev,
      passengers: Math.max(1, Math.min(9, prev.passengers + increment)),
    }));
  };

  const handleTripTypeChange = (type) => {
    setSearchParams((prev) => ({
      ...prev,
      tripType: type,
    }));
  };

  const swapLocations = () => {
    setSearchParams((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074')`,
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
              Book Your Flight Tickets with IRCTC Air
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-blue-100"
            >
              Find the best deals on flight tickets across India
            </motion.p>
          </div>

          {/* Search Form */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex mb-4">
                <button
                  onClick={() => handleTripTypeChange("one-way")}
                  className={`flex-1 py-2 text-center rounded-l-lg ${
                    searchParams.tripType === "one-way"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } transition-colors`}
                >
                  One Way
                </button>
                <button
                  onClick={() => handleTripTypeChange("round-trip")}
                  className={`flex-1 py-2 text-center rounded-r-lg ${
                    searchParams.tripType === "round-trip"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } transition-colors`}
                >
                  Round Trip
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-2 grid grid-cols-2 gap-2">
                  <div className="relative">
                    <label className="block text-xs text-gray-500 mb-1">
                      From
                    </label>
                    <div className="relative">
                      <FaPlane className="absolute left-3 top-3 text-gray-400 transform -rotate-45" />
                      <select
                        name="from"
                        value={searchParams.from}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
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
                    <label className="block text-xs text-gray-500 mb-1">
                      To
                    </label>
                    <div className="relative">
                      <FaPlane className="absolute left-3 top-3 text-gray-400 transform rotate-45" />
                      <select
                        name="to"
                        value={searchParams.to}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
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
                    onClick={swapLocations}
                    className="absolute left-1/2 md:left-[calc(20%-16px)] top-8 transform -translate-x-1/2 bg-blue-50 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center border border-blue-100 hover:bg-blue-100 transition-colors"
                  >
                    <FaExchangeAlt />
                  </button>
                </div>

                <div className="relative">
                  <label className="block text-xs text-gray-500 mb-1">
                    Departure Date
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="date"
                      name="date"
                      value={searchParams.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                {searchParams.tripType === "round-trip" && (
                  <div className="relative">
                    <label className="block text-xs text-gray-500 mb-1">
                      Return Date
                    </label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="date"
                        name="returnDate"
                        value={searchParams.returnDate}
                        onChange={handleInputChange}
                        min={
                          searchParams.date ||
                          new Date().toISOString().split("T")[0]
                        }
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div className="relative">
                  <label className="block text-xs text-gray-500 mb-1">
                    Passengers
                  </label>
                  <div className="relative flex border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handlePassengerChange(-1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      -
                    </button>
                    <div className="flex-1 flex items-center justify-center text-gray-800">
                      <FaUser className="mr-2 text-gray-400" />
                      {searchParams.passengers}
                    </div>
                    <button
                      onClick={() => handlePassengerChange(1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div
                  className={`${
                    searchParams.tripType === "round-trip"
                      ? "md:col-span-5"
                      : "md:col-span-1"
                  }`}
                >
                  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                    <FaSearch className="mr-2" /> Search Flights
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Popular Flight Routes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularRoutes.map((route, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <FaPlane />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-bold text-gray-900">
                          {route.from}
                        </h3>
                        <p className="text-xs text-gray-500">India</p>
                      </div>
                    </div>

                    <FaArrowRight className="text-gray-400" />

                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <FaMapMarkerAlt />
                      </div>
                      <div className="ml-3">
                        <h3 className="font-bold text-gray-900">{route.to}</h3>
                        <p className="text-xs text-gray-500">India</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-500 text-sm">Starting from</p>
                      <p className="text-xl font-bold text-gray-900">
                        ₹{route.price}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSearchParams((prev) => ({
                          ...prev,
                          from: route.from,
                          to: route.to,
                        }));
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Why Book with IRCTC Air
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <FaRupeeSign size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Get the best deals and discounts on flight tickets across major
                airlines.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <FaBriefcase size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Baggage Included</h3>
              <p className="text-gray-600">
                All bookings include standard checked baggage allowance.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <FaUtensils size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Meals Onboard</h3>
              <p className="text-gray-600">
                Select your preferred meals while booking your tickets.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <FaWifi size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Wi-Fi Connectivity</h3>
              <p className="text-gray-600">
                Stay connected with in-flight Wi-Fi on select flights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Download the IRCTC App
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get exclusive app-only offers and manage your bookings on the go
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="bg-black text-white px-6 py-3 rounded-lg flex items-center"
              >
                <span className="text-3xl mr-3">
                  <i className="fab fa-apple"></i>
                </span>
                <div>
                  <p className="text-xs">Download on the</p>
                  <p className="text-lg font-semibold">App Store</p>
                </div>
              </a>

              <a
                href="#"
                className="bg-black text-white px-6 py-3 rounded-lg flex items-center"
              >
                <span className="text-3xl mr-3">
                  <i className="fab fa-google-play"></i>
                </span>
                <div>
                  <p className="text-xs">Get it on</p>
                  <p className="text-lg font-semibold">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FlightsPage;
