import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTrain,
  FaTicketAlt,
  FaClock,
  FaChevronRight,
  FaCreditCard,
  FaUserShield,
  FaShieldAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 text-white p-2 rounded-full">
                <FaTrain className="text-xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-blue-700">IRCTC</span>
                <span className="text-xs text-blue-500 -mt-1">
                  Indian Railways
                </span>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Indian Railway Catering and Tourism Corporation (IRCTC) is a
              subsidiary of the Indian Railways that handles the catering,
              tourism, and online ticketing operations.
            </p>
            <div className="flex space-x-4 mb-6">
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300"
              >
                <FaFacebook size={18} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300"
              >
                <FaTwitter size={18} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300"
              >
                <FaInstagram size={18} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ y: -3 }}
                className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-300"
              >
                <FaLinkedin size={18} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/", icon: FaTrain, text: "Home" },
                { to: "/book", icon: FaTicketAlt, text: "Book Tickets" },
                { to: "/trains", icon: FaTrain, text: "Find Trains" },
                { to: "/track", icon: FaMapMarkerAlt, text: "Track Train" },
                { to: "/profile", icon: FaUserShield, text: "My Account" },
                { to: "/contact", icon: FaEnvelope, text: "Contact Us" },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link
                    to={item.to}
                    className="text-gray-600 hover:text-blue-600 flex items-center gap-2 transition-colors duration-300"
                  >
                    <FaChevronRight className="text-blue-500 text-xs" />
                    <span>{item.text}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Popular Train Routes */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Popular Routes
            </h3>
            <ul className="space-y-3">
              {[
                { from: "Delhi", to: "Mumbai" },
                { from: "Chennai", to: "Bangalore" },
                { from: "Kolkata", to: "Delhi" },
                { from: "Mumbai", to: "Goa" },
                { from: "Bangalore", to: "Hyderabad" },
                { from: "Delhi", to: "Jaipur" },
              ].map((route, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Link
                    to="/trains"
                    className="text-gray-600 hover:text-blue-600 flex items-center gap-2 transition-colors duration-300"
                  >
                    <FaChevronRight className="text-blue-500 text-xs" />
                    <span>
                      {route.from} to {route.to}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-600 mt-1 flex-shrink-0" />
                <span className="text-gray-600">
                  IRCTC Corporate Office, 11th Floor, Statesman House,
                  Barakhamba Road, New Delhi - 110001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-blue-600 flex-shrink-0" />
                <span className="text-gray-600">
                  1800-110-139 / 0755-6610661
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-blue-600 flex-shrink-0" />
                <span className="text-gray-600">care@irctc.co.in</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Download Our App
              </h4>
              <div className="flex space-x-3">
                <img
                  src="https://www.irctc.co.in/nget/assets/images/mobile/playstorebtn.png"
                  alt="Google Play Store"
                  className="h-10 w-auto"
                />
                <img
                  src="https://www.irctc.co.in/nget/assets/images/mobile/applebtn.png"
                  alt="Apple App Store"
                  className="h-10 w-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="border-t border-gray-200 my-8"></div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <FaTicketAlt className="text-blue-600 text-xl" />
              <h3 className="text-lg font-semibold text-gray-800">
                Booking Help
              </h3>
            </div>
            <p className="text-gray-600 mb-3">
              Need assistance with your booking? Our customer support team is
              available 24/7.
            </p>
            <Link
              to="/contact"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              Get Help <FaChevronRight className="text-xs" />
            </Link>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <FaCreditCard className="text-blue-600 text-xl" />
              <h3 className="text-lg font-semibold text-gray-800">
                Secure Payments
              </h3>
            </div>
            <p className="text-gray-600 mb-3">
              All transactions are processed through secure payment gateways
              with encryption.
            </p>
            <Link
              to="/payment"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              Learn More <FaChevronRight className="text-xs" />
            </Link>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <FaShieldAlt className="text-blue-600 text-xl" />
              <h3 className="text-lg font-semibold text-gray-800">
                Privacy Policy
              </h3>
            </div>
            <p className="text-gray-600 mb-3">
              We value your privacy and protect your personal information with
              strict measures.
            </p>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
            >
              Read Policy <FaChevronRight className="text-xs" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright and Legal */}
      <div className="bg-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © {currentYear} Indian Railway Catering and Tourism Corporation
              Ltd. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                Terms & Conditions
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                Refund Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
