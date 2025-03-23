import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaCalendar,
  FaUser,
  FaStar,
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaUtensils,
  FaSnowflake,
  FaRegHeart,
  FaHeart,
  FaFilter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

// Sample hotel data
const hotels = [
  {
    id: 1,
    name: "Taj Palace",
    location: "New Delhi",
    price: 12500,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
    amenities: ["wifi", "pool", "parking", "restaurant", "ac"],
  },
  {
    id: 2,
    name: "The Oberoi",
    location: "Mumbai",
    price: 15000,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070",
    amenities: ["wifi", "pool", "parking", "restaurant", "ac"],
  },
  {
    id: 3,
    name: "Leela Palace",
    location: "Bengaluru",
    price: 9800,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080",
    amenities: ["wifi", "parking", "restaurant", "ac"],
  },
  {
    id: 4,
    name: "Radisson Blu",
    location: "Chennai",
    price: 6500,
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070",
    amenities: ["wifi", "pool", "parking", "restaurant"],
  },
  {
    id: 5,
    name: "Hyatt Regency",
    location: "Kolkata",
    price: 8200,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
    amenities: ["wifi", "pool", "restaurant", "ac"],
  },
  {
    id: 6,
    name: "JW Marriott",
    location: "Pune",
    price: 10500,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2032",
    amenities: ["wifi", "pool", "parking", "restaurant", "ac"],
  },
];

// Popular destinations
const popularDestinations = [
  {
    id: 1,
    name: "New Delhi",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070",
  },
  {
    id: 2,
    name: "Mumbai",
    image:
      "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=2070",
  },
  {
    id: 3,
    name: "Bengaluru",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2069",
  },
  {
    id: 4,
    name: "Jaipur",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2022",
  },
];

const HotelsPage = () => {
  const [searchParams, setSearchParams] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    rooms: 1,
  });
  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [favoriteHotels, setFavoriteHotels] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get today's date for min date attribute
  const today = new Date().toISOString().split("T")[0];

  // Set checkout min date to be one day after checkin
  const getCheckoutMinDate = () => {
    if (!searchParams.checkIn) return today;

    const nextDay = new Date(searchParams.checkIn);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split("T")[0];
  };

  // Filter hotels based on search parameters and filters
  useEffect(() => {
    let results = [...hotels];

    // Filter by destination
    if (searchParams.destination) {
      results = results.filter((hotel) =>
        hotel.location
          .toLowerCase()
          .includes(searchParams.destination.toLowerCase())
      );
    }

    // Filter by price range
    results = results.filter(
      (hotel) => hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
    );

    // Filter by amenities
    if (selectedAmenities.length > 0) {
      results = results.filter((hotel) =>
        selectedAmenities.every((amenity) => hotel.amenities.includes(amenity))
      );
    }

    setFilteredHotels(results);
  }, [searchParams, priceRange, selectedAmenities]);

  // Handle input changes for search form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Toggle hotel as favorite
  const toggleFavorite = (hotelId) => {
    if (favoriteHotels.includes(hotelId)) {
      setFavoriteHotels(favoriteHotels.filter((id) => id !== hotelId));
    } else {
      setFavoriteHotels([...favoriteHotels, hotelId]);
    }
  };

  // Toggle amenity filter
  const toggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  // Get the appropriate amenity icon
  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case "wifi":
        return <FaWifi />;
      case "pool":
        return <FaSwimmingPool />;
      case "parking":
        return <FaParking />;
      case "restaurant":
        return <FaUtensils />;
      case "ac":
        return <FaSnowflake />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white pt-10 pb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-500"></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Book Your Perfect Stay
            </h1>
            <p className="text-lg text-blue-100">
              Find and book the best hotels across India at exclusive IRCTC
              rates
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <label className="block text-xs text-gray-500 mb-1">
                    Destination
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="destination"
                      value={searchParams.destination}
                      onChange={handleInputChange}
                      placeholder="Where are you going?"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-xs text-gray-500 mb-1">
                    Check-in
                  </label>
                  <div className="relative">
                    <FaCalendar className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="date"
                      name="checkIn"
                      value={searchParams.checkIn}
                      onChange={handleInputChange}
                      min={today}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-xs text-gray-500 mb-1">
                    Check-out
                  </label>
                  <div className="relative">
                    <FaCalendar className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="date"
                      name="checkOut"
                      value={searchParams.checkOut}
                      onChange={handleInputChange}
                      min={getCheckoutMinDate()}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block text-xs text-gray-500 mb-1">
                    Guests & Rooms
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-3 text-gray-400" />
                    <div className="flex">
                      <select
                        name="guests"
                        value={searchParams.guests}
                        onChange={handleInputChange}
                        className="w-1/2 pl-10 pr-2 py-2.5 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num} Guest{num > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                      <select
                        name="rooms"
                        value={searchParams.rooms}
                        onChange={handleInputChange}
                        className="w-1/2 pl-2 pr-4 py-2.5 border-t border-b border-r border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      >
                        {[1, 2, 3, 4].map((num) => (
                          <option key={num} value={num}>
                            {num} Room{num > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <button className="bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors py-2.5 md:col-span-4">
                  <FaSearch /> Search Hotels
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Popular Destinations
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularDestinations.map((destination) => (
              <div
                key={destination.id}
                className="relative overflow-hidden rounded-xl cursor-pointer group"
                onClick={() =>
                  setSearchParams((prev) => ({
                    ...prev,
                    destination: destination.name,
                  }))
                }
              >
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <h3 className="absolute bottom-3 left-3 text-white font-bold text-lg">
                  {destination.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hotel Listings Section */}
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar (hidden on mobile unless filter button is clicked) */}
            <div
              className={`${
                showFilters ? "block" : "hidden"
              } md:block w-full md:w-64 bg-white rounded-xl shadow-sm p-5 h-fit sticky top-6`}
            >
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Price Range</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 text-sm">
                    ₹{priceRange[0].toLocaleString()}
                  </span>
                  <span className="text-gray-600 text-sm">
                    ₹{priceRange[1].toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full"
                />
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">Amenities</h3>
                <div className="space-y-2">
                  {["wifi", "pool", "parking", "restaurant", "ac"].map(
                    (amenity) => (
                      <div key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          id={amenity}
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label
                          htmlFor={amenity}
                          className="ml-2 flex items-center text-gray-700"
                        >
                          <span className="mr-2">
                            {getAmenityIcon(amenity)}
                          </span>
                          {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Hotel Results */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Available Hotels
                </h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center bg-blue-50 text-blue-600 px-3 py-2 rounded-lg"
                >
                  <FaFilter className="mr-2" /> Filters
                </button>
              </div>

              {filteredHotels.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  <AnimatePresence>
                    {filteredHotels.map((hotel) => (
                      <motion.div
                        key={hotel.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 h-48 md:h-auto relative">
                            <img
                              src={hotel.image}
                              alt={hotel.name}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() => toggleFavorite(hotel.id)}
                              className="absolute top-3 right-3 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
                            >
                              {favoriteHotels.includes(hotel.id) ? (
                                <FaHeart className="text-red-500" />
                              ) : (
                                <FaRegHeart className="text-gray-600" />
                              )}
                            </button>
                          </div>

                          <div className="p-5 flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">
                                  {hotel.name}
                                </h3>
                                <p className="text-gray-600 flex items-center">
                                  <FaMapMarkerAlt className="mr-1 text-sm" />{" "}
                                  {hotel.location}
                                </p>
                              </div>

                              <div className="flex items-center bg-blue-50 px-2 py-1 rounded text-sm">
                                <FaStar className="text-amber-500 mr-1" />
                                <span className="font-medium">
                                  {hotel.rating}
                                </span>
                              </div>
                            </div>

                            <div className="mt-4 flex gap-3">
                              {hotel.amenities.map((amenity) => (
                                <div
                                  key={amenity}
                                  className="text-gray-500 tooltip"
                                  title={
                                    amenity.charAt(0).toUpperCase() +
                                    amenity.slice(1)
                                  }
                                >
                                  {getAmenityIcon(amenity)}
                                </div>
                              ))}
                            </div>

                            <div className="mt-6 flex flex-wrap items-end justify-between">
                              <div>
                                <p className="text-gray-500 text-sm">
                                  Price per night
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                  ₹{hotel.price.toLocaleString()}
                                </p>
                                <p className="text-gray-500 text-xs">
                                  +₹
                                  {Math.round(
                                    hotel.price * 0.18
                                  ).toLocaleString()}{" "}
                                  taxes & fees
                                </p>
                              </div>

                              <Link
                                to={`/hotel/${hotel.id}?checkin=${searchParams.checkIn}&checkout=${searchParams.checkOut}&guests=${searchParams.guests}&rooms=${searchParams.rooms}`}
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                              >
                                View Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl">
                  <p className="text-gray-500">
                    No hotels found matching your criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchParams({
                        destination: "",
                        checkIn: "",
                        checkOut: "",
                        guests: 2,
                        rooms: 1,
                      });
                      setPriceRange([0, 20000]);
                      setSelectedAmenities([]);
                    }}
                    className="mt-3 text-blue-600 hover:underline"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelsPage;
