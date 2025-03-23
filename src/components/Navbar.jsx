import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaTrain,
  FaUser,
  FaPhoneAlt,
  FaQuestion,
  FaBars,
  FaChevronDown,
  FaRegBell,
} from "react-icons/fa";
import { HiOutlineTicket } from "react-icons/hi";
import {
  MdOutlineHotel,
  MdOutlineFlight,
  MdFastfood,
  MdLocationCity,
} from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { BsBusFront } from "react-icons/bs";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Track Scroll for Navbar Color Change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  const mainNavItems = [
    { to: "/", text: "HOME", isDropdown: false },
    { to: "/trains", text: "TRAINS", isDropdown: false },
    { to: "/track", text: "TRACK", isDropdown: false },
    { to: "/loyalty", text: "LOYALTY", isDropdown: false },
    { to: "/ewallet", text: "IRCTC eWallet", isDropdown: false },
    { to: "/buses", text: "BUSES", isDropdown: false },
    { to: "/flights", text: "FLIGHTS", isDropdown: false },
    { to: "/hotels", text: "HOTELS", isDropdown: false },
    { to: "/holidays", text: "HOLIDAYS", isDropdown: false },
    { to: "/meals", text: "MEALS", isDropdown: false },
    { to: "/promotions", text: "PROMOTIONS", isDropdown: false },
  ];

  const secondaryNavItems = [
    { to: "/login", text: "LOGIN", isImportant: true },
    { to: "/signup", text: "REGISTER", isImportant: false },
    { to: "/agent-login", text: "AGENT LOGIN", isImportant: false },
    { to: "/contact", text: "CONTACT US", isImportant: false },
  ];

  const getCurrentDate = () => {
    const now = new Date();
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return now.toLocaleDateString("en-GB", options).replace(",", "");
  };

  return (
    <header className="sticky top-0 z-50 shadow-md bg-white">
      {/* Top navigation bar */}
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 flex justify-between items-center text-xs font-medium">
          <div className="flex items-center">
            <Link to="/" className="py-1 px-3">
              <img
                src="/logo.png"
                alt="IRCTC Logo"
                className="h-16"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://www.irctc.co.in/nget/assets/images/logo.png";
                }}
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            {secondaryNavItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className={`py-1 px-3 border-r last:border-r-0 border-gray-300 ${
                  item.isImportant ? "font-bold" : ""
                } ${
                  item.isSpecial ? "text-red-600" : "text-gray-800"
                } hover:underline`}
              >
                {item.text}
              </Link>
            ))}

            <div className="py-1 px-3 border-r border-gray-300 text-gray-700">
              {getCurrentDate()}
            </div>

            <div className="py-1 px-3 flex items-center gap-2 text-gray-800">
              <button className="text-xs">A-</button>
              <button className="text-sm">A</button>
              <button className="text-base">A+</button>
              <button className="ml-2">हिंदी</button>
            </div>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Main navigation */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Link to="/" className="p-3">
              <i className="fas fa-home"></i>
            </Link>

            <nav className="hidden md:flex flex-1 overflow-x-auto">
              {mainNavItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className={`px-4 py-3 font-medium whitespace-nowrap flex items-center ${
                    isActive(item.to)
                      ? "text-blue-700 bg-blue-50"
                      : "text-gray-800 hover:bg-gray-100"
                  } ${
                    item.to === "/irctc-exclusive"
                      ? "bg-blue-800 text-white hover:bg-blue-900"
                      : ""
                  }`}
                >
                  {item.text}
                  {item.isDropdown && (
                    <FaChevronDown className="ml-1 text-xs" />
                  )}
                </Link>
              ))}
            </nav>

            <div className="ml-auto">
              <img
                src="/irctc-right-logo.png"
                alt="IRCTC Right Logo"
                className="h-16"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://www.irctc.co.in/nget/assets/images/secondry-logo.png";
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white border-t border-gray-200 shadow-lg"
        >
          <div className="px-4 py-2">
            {secondaryNavItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className={`block py-2 ${item.isImportant ? "font-bold" : ""} ${
                  item.isSpecial ? "text-red-600" : "text-gray-800"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.text}
              </Link>
            ))}

            <div className="py-2 text-gray-700">{getCurrentDate()}</div>

            <div className="border-t border-gray-200 mt-2 pt-2">
              {mainNavItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className={`block py-2 ${
                    isActive(item.to)
                      ? "text-blue-700 font-medium"
                      : "text-gray-800"
                  } ${
                    item.to === "/irctc-exclusive"
                      ? "text-blue-800 font-bold"
                      : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.text}
                  {item.isDropdown && (
                    <FaChevronDown className="ml-1 inline text-xs" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
