import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaUtensils,
  FaLeaf,
  FaDrumstickBite,
  FaShoppingCart,
  FaTrain,
  FaSearch,
  FaStar,
  FaPlus,
  FaMinus,
  FaRegClock,
  FaMapMarkerAlt,
  FaFilter,
} from "react-icons/fa";
import { MdFastfood } from "react-icons/md";

// Sample meal data
const mealData = [
  {
    id: 1,
    name: "Veg Thali",
    description: "Rice, Dal, 2 Rotis, Mix Veg, Curd, Pickle, Sweet",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=2030",
    category: "veg",
    rating: 4.7,
    prepTime: "15 mins",
    isSpicy: false,
    stations: [
      "New Delhi",
      "Agra",
      "Mathura",
      "Gwalior",
      "Bhopal",
      "Nagpur",
      "Hyderabad",
      "Chennai",
    ],
  },
  {
    id: 2,
    name: "Non-Veg Thali",
    description: "Rice, Dal, 2 Rotis, Chicken Curry, Curd, Pickle, Sweet",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974",
    category: "non-veg",
    rating: 4.5,
    prepTime: "20 mins",
    isSpicy: true,
    stations: ["New Delhi", "Agra", "Bhopal", "Nagpur", "Chennai"],
  },
  {
    id: 3,
    name: "Paneer Butter Masala",
    description: "Paneer in rich tomato gravy with butter, served with 4 rotis",
    price: 160,
    image:
      "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80&w=1942",
    category: "veg",
    rating: 4.6,
    prepTime: "15 mins",
    isSpicy: true,
    stations: [
      "New Delhi",
      "Agra",
      "Mathura",
      "Gwalior",
      "Bhopal",
      "Hyderabad",
    ],
  },
  {
    id: 4,
    name: "Egg Biryani",
    description: "Fragrant basmati rice cooked with eggs and aromatic spices",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=2070",
    category: "non-veg",
    rating: 4.3,
    prepTime: "20 mins",
    isSpicy: true,
    stations: ["New Delhi", "Agra", "Bhopal", "Hyderabad", "Chennai"],
  },
  {
    id: 5,
    name: "Veg Sandwich",
    description:
      "Fresh vegetables with cheese in toasted bread, served with ketchup",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1973",
    category: "veg",
    rating: 4.2,
    prepTime: "10 mins",
    isSpicy: false,
    stations: [
      "New Delhi",
      "Agra",
      "Mathura",
      "Bhopal",
      "Nagpur",
      "Hyderabad",
      "Chennai",
    ],
  },
  {
    id: 6,
    name: "Chicken Biryani",
    description:
      "Basmati rice cooked with tender chicken pieces and aromatic spices",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974",
    category: "non-veg",
    rating: 4.8,
    prepTime: "25 mins",
    isSpicy: true,
    stations: ["New Delhi", "Bhopal", "Hyderabad", "Chennai"],
  },
];

// Popular train routes
const popularRoutes = [
  {
    from: "New Delhi",
    to: "Mumbai",
    trainNo: "12951",
    name: "Mumbai Rajdhani",
  },
  { from: "New Delhi", to: "Chennai", trainNo: "12615", name: "GT Express" },
  {
    from: "New Delhi",
    to: "Howrah",
    trainNo: "12301",
    name: "Howrah Rajdhani",
  },
  { from: "Mumbai", to: "Howrah", trainNo: "12809", name: "Mumbai Mail" },
];

// Stations
const stations = [
  "New Delhi",
  "Agra",
  "Mathura",
  "Gwalior",
  "Bhopal",
  "Nagpur",
  "Hyderabad",
  "Chennai",
  "Mumbai",
  "Kolkata",
  "Bengaluru",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Patna",
];

const MealsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStation, setSelectedStation] = useState("");
  const [pnrNumber, setPnrNumber] = useState("");
  const [orderMode, setOrderMode] = useState("station"); // 'station' or 'pnr'
  const [filteredMeals, setFilteredMeals] = useState(mealData);
  const [cart, setCart] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter meals based on selected category, search query, and station
  useEffect(() => {
    let result = [...mealData];

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((meal) => meal.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (meal) =>
          meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          meal.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected station
    if (selectedStation && orderMode === "station") {
      result = result.filter((meal) => meal.stations.includes(selectedStation));
    }

    setFilteredMeals(result);
  }, [selectedCategory, searchQuery, selectedStation, orderMode]);

  // Handle adding item to cart
  const addToCart = (meal) => {
    const existingItem = cart.find((item) => item.id === meal.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...meal, quantity: 1 }]);
    }
  };

  // Handle removing item from cart
  const removeFromCart = (mealId) => {
    const existingItem = cart.find((item) => item.id === mealId);

    if (existingItem && existingItem.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.id === mealId ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } else {
      setCart(cart.filter((item) => item.id !== mealId));
    }
  };

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  // Get cart item count
  const cartItemCount = cart.reduce((count, item) => {
    return count + item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=2070')`,
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
              IRCTC E-Catering Service
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-blue-100"
            >
              Order delicious meals for your journey and have them delivered
              right to your seat
            </motion.p>
          </div>

          {/* Order Method Selector */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Tab Selection */}
            <div className="flex border-b">
              <button
                className={`flex-1 py-4 text-center font-medium transition-colors ${
                  orderMode === "station"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-800"
                }`}
                onClick={() => setOrderMode("station")}
              >
                Order by Station
              </button>
              <button
                className={`flex-1 py-4 text-center font-medium transition-colors ${
                  orderMode === "pnr"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-800"
                }`}
                onClick={() => setOrderMode("pnr")}
              >
                Order by PNR
              </button>
            </div>

            {/* Form Panels */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {orderMode === "station" ? (
                  <motion.div
                    key="station-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Select Station
                        </label>
                        <div className="relative">
                          <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                          <select
                            value={selectedStation}
                            onChange={(e) => setSelectedStation(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                          >
                            <option value="">Select a station</option>
                            {stations.map((station, index) => (
                              <option key={index} value={station}>
                                {station}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="md:flex items-end">
                        <button
                          className={`w-full py-2 rounded-lg font-medium mt-4 md:mt-0 ${
                            selectedStation
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          } transition-colors`}
                          disabled={!selectedStation}
                        >
                          Show Available Meals
                        </button>
                      </div>
                    </div>

                    {/* Popular Routes Suggestion */}
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">
                        Popular Train Routes:
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {popularRoutes.map((route, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedStation(route.from)}
                            className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors flex items-center"
                          >
                            <FaTrain className="mr-1" /> {route.from} -{" "}
                            {route.to}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="pnr-form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Enter PNR Number
                        </label>
                        <input
                          type="text"
                          value={pnrNumber}
                          onChange={(e) => setPnrNumber(e.target.value)}
                          placeholder="10 digit PNR number"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                          maxLength={10}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          We'll fetch your journey details using the PNR to show
                          available meals
                        </p>
                      </div>

                      <div className="md:flex items-end">
                        <button
                          className={`w-full py-2 rounded-lg font-medium ${
                            pnrNumber.length === 10
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          } transition-colors`}
                          disabled={pnrNumber.length !== 10}
                        >
                          Find My Train
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters (Sidebar) */}
            <div
              className={`${
                showFilters ? "block" : "hidden"
              } md:block w-full md:w-64 bg-white rounded-xl shadow-sm p-5 h-fit sticky top-24`}
            >
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Meal Type</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === "all"
                        ? "bg-blue-50 text-blue-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <MdFastfood className="mr-2" /> All Meals
                  </button>
                  <button
                    onClick={() => setSelectedCategory("veg")}
                    className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === "veg"
                        ? "bg-green-50 text-green-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <FaLeaf className="mr-2" /> Vegetarian
                  </button>
                  <button
                    onClick={() => setSelectedCategory("non-veg")}
                    className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === "non-veg"
                        ? "bg-red-50 text-red-700"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <FaDrumstickBite className="mr-2" /> Non-Vegetarian
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-4">Search Meals</h3>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for meals..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Meals Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Available Meals
                </h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center bg-blue-50 text-blue-600 px-3 py-2 rounded-lg"
                >
                  <FaFilter className="mr-2" /> Filters
                </button>
              </div>

              {filteredMeals.length > 0 ? (
                <>
                  {selectedStation && (
                    <div className="mb-4 bg-blue-50 rounded-lg p-4 flex items-center">
                      <FaMapMarkerAlt className="text-blue-600 mr-2" />
                      <p className="text-blue-800">
                        Showing meals available at{" "}
                        <span className="font-semibold">{selectedStation}</span>{" "}
                        station
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                      {filteredMeals.map((meal) => (
                        <motion.div
                          key={meal.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="h-48 overflow-hidden relative">
                            <img
                              src={meal.image}
                              alt={meal.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 left-3">
                              <span
                                className={`inline-block px-2 py-1 rounded-full text-xs font-bold text-white ${
                                  meal.category === "veg"
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              >
                                {meal.category === "veg" ? "Veg" : "Non-Veg"}
                              </span>
                            </div>
                            {meal.isSpicy && (
                              <div className="absolute top-3 right-3">
                                <span className="inline-block px-2 py-1 rounded-full text-xs font-bold text-white bg-orange-500">
                                  Spicy
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg font-bold text-gray-900">
                                {meal.name}
                              </h3>
                              <div className="flex items-center bg-yellow-50 px-2 py-1 rounded text-xs">
                                <FaStar className="text-yellow-500 mr-1" />
                                <span>{meal.rating}</span>
                              </div>
                            </div>

                            <p className="text-gray-600 text-sm mb-4">
                              {meal.description}
                            </p>

                            <div className="flex items-center text-gray-500 text-xs mb-4">
                              <FaRegClock className="mr-1" />
                              <span>Prep time: {meal.prepTime}</span>
                            </div>

                            <div className="flex justify-between items-center">
                              <div className="font-bold text-gray-900">
                                ₹{meal.price}
                              </div>

                              <div className="flex items-center space-x-2">
                                {cart.find((item) => item.id === meal.id) ? (
                                  <div className="flex items-center">
                                    <button
                                      onClick={() => removeFromCart(meal.id)}
                                      className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors"
                                    >
                                      <FaMinus size={12} />
                                    </button>
                                    <span className="w-8 text-center">
                                      {cart.find((item) => item.id === meal.id)
                                        ?.quantity || 0}
                                    </span>
                                    <button
                                      onClick={() => addToCart(meal)}
                                      className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                                    >
                                      <FaPlus size={12} />
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => addToCart(meal)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                  >
                                    Add
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl">
                  <MdFastfood className="text-5xl text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">
                    No meals found matching your criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setSearchQuery("");
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Cart (Fixed at bottom) */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-40">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </div>
                <div className="ml-3">
                  <p className="font-medium">Your Order</p>
                  <p className="text-gray-500 text-sm">
                    {cartItemCount} item{cartItemCount !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-gray-500">Total:</p>
                  <p className="font-bold text-lg">₹{cartTotal}</p>
                </div>

                <Link
                  to="/checkout"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* How It Works Section */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <FaTrain size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Select Your Train</h3>
              <p className="text-gray-600">
                Enter your PNR or select the station where you want your meal
                delivered.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <FaUtensils size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Choose Your Meal</h3>
              <p className="text-gray-600">
                Browse our menu of delicious options from top restaurants and
                vendors.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4">
                <FaShoppingCart size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Enjoy Your Meal</h3>
              <p className="text-gray-600">
                Your order will be delivered fresh to your seat at the selected
                station.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MealsPage;
