"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

// Import components
import SearchBar from "../components/SearchBar";
import TrainCard from "../components/TrainCard";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Sample data for popular routes
const popularRoutes = [
  {
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

// Statistics data
const stats = [
  { value: "2.5M+", label: "Daily Passengers" },
  { value: "13K+", label: "Daily Trains" },
  { value: "8.5K+", label: "Stations" },
  { value: "99.8%", label: "On-time Arrivals" },
];

// Service categories
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

// Holiday packages
const holidayPackages = [
  {
    title: "Maharajas' Express",
    description:
      "Redefining Royalty, Luxury and Comfort, Maharajas' express takes you on a sojourn to the era of bygone stately splendour of princely states.",
    image: "https://www.irctc.co.in/nget/assets/images/exterior_maharaja.jpg",
    link: "/maharajas-express",
  },
  {
    title: "International Packages",
    description:
      "Best deals in International Holiday packages, handpicked by IRCTC, for Thailand, Dubai, Sri Lanka, Hong Kong, China, Macau, Bhutan, Nepal, U.K., Europe, USA, Australia etc.",
    image: "https://www.irctc.co.in/nget/assets/images/Thailand.jpg",
    link: "/international-packages",
  },
  {
    title: "Domestic Air Packages",
    description:
      "Be it the spiritual devotee seeking blessings of Tirupati, Shirdi or Mata Vaishno Devi or the leisure traveller wanting to relish the Blue mountains of North East.",
    image: "https://www.irctc.co.in/nget/assets/images/Kashmir.jpg",
    link: "/domestic-packages",
  },
];

const LandingPage = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [searchParams, setSearchParams] = useState(null);
  const heroRef = useRef(null);
  const serviceRef = useRef(null);
  const routesRef = useRef(null);
  const statsRef = useRef(null);

  // Manage scroll events and back-to-top button
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize GSAP animations
  useEffect(() => {
    // Hero section
    gsap.from(heroRef.current.querySelector(".hero-content"), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    // Stats counter animation
    const statItems = statsRef.current.querySelectorAll(".stat-item");
    gsap.from(statItems, {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 85%",
      },
    });

    // Service categories animation
    const serviceItems = serviceRef.current.querySelectorAll(".service-item");
    gsap.from(serviceItems, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: serviceRef.current,
        start: "top 80%",
      },
    });

    // Popular routes animation
    gsap.from(routesRef.current.querySelector(".section-title"), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: routesRef.current,
        start: "top 85%",
      },
    });
  }, []);

  const handleSearch = (params) => {
    setSearchParams(params);
    console.log("Search params:", params);
    // Navigate to search results page
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="relative">
      {/* Main Booking Section */}
      <section ref={heroRef} className="relative bg-white pt-4 pb-8">
        <div className="container mx-auto px-4">
          <div className="hero-content">
            {/* Main Image with Booking Form */}
            <div className="relative rounded-lg overflow-hidden mb-6">
              <img
                src="/assets/images/train_banner.jpg"
                alt="Indian Railways"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://www.irctc.co.in/nget/assets/images/train_banner_12nov19.jpg";
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

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Link
                to="/pnr-status"
                className="flex items-center justify-center gap-2 bg-blue-800 text-white py-4 rounded-md font-medium"
              >
                <span>PNR STATUS</span>
              </Link>
              <Link
                to="/charts"
                className="flex items-center justify-center gap-2 bg-blue-800 text-white py-4 rounded-md font-medium"
              >
                <span>CHARTS / VACANCY</span>
              </Link>
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                BOOK TICKET
              </h2>

              <div className="w-full">
                <SearchBar onSearch={handleSearch} />
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
                  <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
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
              <TrainCard
                key={index}
                trainNumber={route.trainNumber}
                trainName={route.trainName}
                departure={route.from}
                departureTime={route.departureTime}
                arrival={route.to}
                arrivalTime={route.arrivalTime}
                duration={route.duration}
                price={route.price}
              />
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
            <p className="text-center mb-4">
              <strong>Customer Care Numbers:</strong>{" "}
              14646/0804647999/08035731999
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
              <h3 className="text-xl font-bold mb-2">Safe & Secure</h3>
              <p className="text-gray-600">
                End-to-end encrypted booking process with multiple security
                layers
              </p>
            </div>

            <div className="text-center p-4">
              <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaTicketAlt className="text-green-700 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Simple and intuitive booking interface with quick payment
                options
              </p>
            </div>

            <div className="text-center p-4">
              <div className="bg-purple-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <FaTrain className="text-purple-700 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Live Updates</h3>
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
