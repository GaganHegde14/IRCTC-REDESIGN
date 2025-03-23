"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaTrain,
  FaTicketAlt,
  FaArrowUp,
  FaExchangeAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaCheck,
  FaChartLine,
  FaStar,
  FaShieldAlt,
} from "react-icons/fa";
import {
  MdFlight,
  MdHotel,
  MdDirectionsBus,
  MdRestaurant,
  MdLuggage,
  MdTrain,
} from "react-icons/md";
import SearchBar from "../components/SearchBar";
import TrainCard from "../components/TrainCard";

const popularRoutes = [
  {
    id: "1",
    from: "Delhi",
    to: "Mumbai",
    trainNumber: "12952",
    trainName: "Mumbai Rajdhani",
    departureTime: "16:25",
    arrivalTime: "08:15",
    duration: "15:50",
    price: 1500,
  },
  {
    id: "2",
    from: "Mumbai",
    to: "Goa",
    trainNumber: "10104",
    trainName: "Mandovi Express",
    departureTime: "07:10",
    arrivalTime: "19:30",
    duration: "12:20",
    price: 1200,
  },
];

const stats = [
  { value: "2.5M+", label: "Daily Passengers" },
  { value: "13K+", label: "Daily Trains" },
  { value: "8.5K+", label: "Stations" },
  { value: "99.8%", label: "On-time Arrivals" },
];

const serviceCategories = [
  {
    icon: <MdFlight className="text-3xl" />,
    title: "FLIGHTS",
    link: "/flights",
  },
  { icon: <MdHotel className="text-3xl" />, title: "HOTELS", link: "/hotels" },
  {
    icon: <FaChartLine className="text-3xl" />,
    title: "RAIL DRISHTI",
    link: "/rail-drishti",
  },
  {
    icon: <MdRestaurant className="text-3xl" />,
    title: "E-CATERING",
    link: "/e-catering",
  },
  {
    icon: <MdDirectionsBus className="text-3xl" />,
    title: "BUS",
    link: "/buses",
  },
  {
    icon: <MdLuggage className="text-3xl" />,
    title: "HOLIDAY PACKAGES",
    link: "/holidays",
  },
  {
    icon: <MdTrain className="text-3xl" />,
    title: "TOURIST TRAIN",
    link: "/tourist-train",
  },
  {
    icon: <FaTrain className="text-3xl" />,
    title: "HILL RAILWAYS",
    link: "/hill-railways",
  },
  {
    icon: <MdTrain className="text-3xl" />,
    title: "CHARTER TRAIN",
    link: "/charter-train",
  },
  { icon: <FaStar className="text-3xl" />, title: "GALLERY", link: "/gallery" },
];

const holidayPackages = [
  {
    title: "Maharajas' Express",
    description: "Redefining Royalty, Luxury and Comfort...",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSy_DK8jdjHtLlcOvKlpv01r6FSCfvMqIxmg&s",
    link: "/trains",
  },
  {
    title: "International Packages",
    description: "Best deals in International Holiday packages...",
    image:
      "https://sandpebblestours.com/wp-content/uploads/2018/07/world_tour.jpg",
    link: "/flights",
  },
  {
    title: "Domestic Air Packages",
    description: "Be it the spiritual devotee seeking blessings...",
    image:
      "https://www.easemytrip.com/images/offer-img/emtnow-27jun22-mob.webp",
    link: "/flights",
  },
];

const LandingPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const heroRef = useRef(null);
  const serviceRef = useRef(null);
  const routesRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (searchParams) => {
    const { source, destination, date } = searchParams;

    // Filter the popularRoutes based on source, destination, and date
    const filteredTrains = popularRoutes
      .filter((train) => {
        return (
          (source === "" ||
            train.from.toLowerCase().includes(source.toLowerCase())) &&
          (destination === "" ||
            train.to.toLowerCase().includes(destination.toLowerCase()))
        );
      })
      .map((train) => ({
        ...train,
        source: train.from,
        destination: train.to,
        date: date || "2025-04-01", // Default date if not provided
      }));

    setSearchResults(filteredTrains);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Main Booking Section */}
      <section ref={heroRef} className="relative bg-white pt-4 pb-8">
        <div className="container mx-auto px-4">
          <div className="hero-content">
            <div className="relative rounded-lg overflow-hidden mb-6 bg-gray-200">
              <img
                src="/assets/images/train_banner.jpg"
                alt="Indian Railways"
                className="w-full h-[400px] object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/1200x400?text=Indian+Railways";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent">
                <div className="flex flex-col h-full justify-center p-8 md:w-2/3 text-white">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    INDIAN RAILWAYS
                  </h1>
                  <div className="flex space-x-8 text-lg">
                    <span>Safety</span>
                    <span>|</span>
                    <span>Security</span>
                    <span>|</span>
                    <span>Punctuality</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <Link
                to="/track"
                className="flex items-center justify-center gap-2 bg-blue-800 text-white py-4 rounded-md font-medium"
              >
                <span>PNR STATUS</span>
              </Link>
              <Link
                to="/track"
                className="flex items-center justify-center gap-2 bg-blue-800 text-white py-4 rounded-md font-medium"
              >
                <span>CHARTS / VACANCY</span>
              </Link>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                BOOK TICKET
              </h2>
              <div className="w-full">
                <div>
                  <SearchBar onSearch={handleSearch} />
                  <div className="container mx-auto mt-8">
                    {searchResults.length > 0 ? (
                      searchResults.map((train) => (
                        <div
                          key={train.id}
                          className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center mb-4"
                        >
                          <TrainCard
                            trainNumber={train.trainNumber}
                            trainName={train.trainName}
                            departure={train.source}
                            arrival={train.destination}
                            date={train.date}
                            departureTime={train.departureTime}
                            arrivalTime={train.arrivalTime}
                            duration={train.duration}
                            price={train.price}
                          />
                          <Link
                            to={{
                              pathname: "/book",
                              search: `?trainNumber=${train.trainNumber}&trainName=${train.trainName}&departure=${train.source}&arrival=${train.destination}&date=${train.date}`,
                            }}
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                          >
                            Book Now
                          </Link>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-gray-500">
                        No trains found.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Categories Section */}
      <section ref={serviceRef} className="py-10 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Have you not found the right one?
            </h2>
            <p className="text-lg text-gray-700">
              Find a service suitable for you here.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {serviceCategories.map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="service-item flex flex-col items-center text-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  {service.icon}
                </div>
                <span className="text-sm font-medium text-gray-800">
                  {service.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Holiday Packages Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              HOLIDAYS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {holidayPackages.map((pkg, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {pkg.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {pkg.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item text-center p-4 bg-white shadow-sm rounded-lg"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes Section */}
      <section ref={routesRef} className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="section-title text-2xl md:text-3xl font-bold text-gray-800">
              Popular Routes
            </h2>
            <p className="text-gray-600">
              Explore India's most traveled train routes with competitive fares
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {popularRoutes.map((route, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <TrainCard
                  trainNumber={route.trainNumber}
                  trainName={route.trainName}
                  departure={route.from}
                  departureTime={route.departureTime}
                  arrival={route.to}
                  arrivalTime={route.arrivalTime}
                  duration={route.duration}
                  price={route.price}
                />
                <Link
                  to={{
                    pathname: "/book",
                    search: `?trainNumber=${route.trainNumber}&trainName=${route.trainName}&departure=${route.from}&arrival=${route.to}&date=2025-04-01`,
                  }}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  Book Now
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/trains">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-8 rounded-md font-medium"
              >
                View All Routes
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Support Section */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Customer Support
            </h2>
          </div>
          <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
            <p className="text-center text-blue-700 font-medium mb-4">
              Customers can use enhanced interface for their IRCTC related
              queries!!
            </p>
            <p className="text-center text-gray-800 mb-4">
              <strong>Customer Care Numbers:</strong> 14646 / 0804647999 /
              08035731999
            </p>
            <p className="text-center text-red-600 font-medium">
              BEWARE OF FRAUDSTERS: Always download official IRCTC Rail Connect
              App from the Google Play Store or Apple App Store only.
            </p>
          </div>
        </div>
      </section>

      {/* Safety Features Section */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaShieldAlt className="text-blue-700 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Safe & Secure
              </h3>
              <p className="text-gray-600">
                End-to-end encrypted booking process with multiple security
                layers
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaTicketAlt className="text-green-700 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Easy Booking
              </h3>
              <p className="text-gray-600">
                Simple and intuitive booking interface with quick payment
                options
              </p>
            </div>
            <div className="text-center p-4">
              <div className="bg-purple-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaTrain className="text-purple-700 text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Live Updates
              </h3>
              <p className="text-gray-600">
                Real-time train status and PNR updates for your journey
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
