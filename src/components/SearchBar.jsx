import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaMicrophone,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaChevronDown,
  FaExchangeAlt,
  FaUserFriends,
} from "react-icons/fa";
import { gsap } from "gsap";
import { cityOptions } from "./cities";
import { trainData } from "./trains";

const classOptions = [
  { id: "SL", name: "Sleeper Class" },
  { id: "3A", name: "AC 3 Tier" },
  { id: "2A", name: "AC 2 Tier" },
  { id: "1A", name: "AC First Class" },
  { id: "CC", name: "Chair Car" },
  { id: "EC", name: "Executive Chair Car" },
  { id: "2S", name: "Second Sitting" },
];

const SearchBar = ({ onSearch }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [travelClass, setTravelClass] = useState(classOptions[0]);

  const [isListening, setIsListening] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [showSourceOptions, setShowSourceOptions] = useState(false);
  const [showDestOptions, setShowDestOptions] = useState(false);
  const [showClassOptions, setShowClassOptions] = useState(false);

  const searchBarRef = useRef(null);
  const sourceInputRef = useRef(null);
  const destInputRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setDate(formattedDate);
  }, []);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (activeInput === "source") {
        setSource(transcript);
      } else if (activeInput === "destination") {
        setDestination(transcript);
      }
    };

    recognition.onend = () => setIsListening(false);

    if (isListening) recognition.start();

    return () => recognition.stop();
  }, [isListening, activeInput]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(searchBarRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
        setShowSourceOptions(false);
        setShowDestOptions(false);
        setShowClassOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const swapLocations = () => {
    setSource(destination);
    setDestination(source);

    gsap.fromTo(
      [sourceInputRef.current, destInputRef.current],
      { x: 0, opacity: 1 },
      {
        x: (index) => [40, -40][index],
        opacity: 0,
        duration: 0.3,
        ease: "power1.inOut",
        stagger: 0.1,
        onComplete: () => {
          gsap.to([sourceInputRef.current, destInputRef.current], {
            x: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power1.out",
            stagger: 0.1,
          });
        },
      }
    );
  };

  const handleSearch = () => {
    if (!source || !destination || !date) {
      alert("Please fill in all required fields (Source, Destination, Date).");
      return;
    }

    const filteredTrains = trainData.filter(
      (train) =>
        train.source.toLowerCase() === source.toLowerCase() &&
        train.destination.toLowerCase() === destination.toLowerCase() &&
        train.date === date
    );

    const searchParams = {
      source,
      destination,
      date,
      travelers,
      travelClass: travelClass.id,
      filteredTrains,
    };

    if (onSearch) {
      onSearch(searchParams);
    }

    gsap.to(".search-button", {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
    });
  };

  const filteredSourceOptions = cityOptions.filter(
    (city) =>
      city.name.toLowerCase().includes(source.toLowerCase()) &&
      city.name.toLowerCase() !== destination.toLowerCase()
  );

  const filteredDestOptions = cityOptions.filter(
    (city) =>
      city.name.toLowerCase().includes(destination.toLowerCase()) &&
      city.name.toLowerCase() !== source.toLowerCase()
  );

  const incrementTravelers = () =>
    setTravelers((prev) => Math.min(prev + 1, 10));
  const decrementTravelers = () =>
    setTravelers((prev) => Math.max(prev - 1, 1));

  return (
    <div
      ref={searchBarRef}
      className="w-full max-w-5xl mx-auto glass rounded-xl shadow-lg z-10"
    >
      <div className="p-1 sm:p-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
          {/* Source */}
          <div className="relative md:col-span-3 z-50">
            <div
              ref={sourceInputRef}
              className={`glass rounded-lg p-3 h-full flex items-center space-x-2 border ${
                activeInput === "source" ? "border-blue-400" : "border-gray-200"
              } hover:border-blue-300 transition-colors`}
              onClick={() => {
                setActiveInput("source");
                setShowSourceOptions(true);
                setShowDestOptions(false);
                setShowClassOptions(false);
              }}
            >
              <FaMapMarkerAlt className="text-blue-500 text-lg" />
              <div className="flex-1">
                <label className="block text-xs text-gray-500 font-medium">
                  From
                </label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="Enter city"
                  className="w-full bg-transparent outline-none text-gray-900"
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsListening(true);
                  setActiveInput("source");
                }}
                className={`p-1.5 rounded-full ${
                  isListening && activeInput === "source"
                    ? "bg-red-100 text-red-500"
                    : "text-gray-400 hover:bg-gray-100"
                }`}
              >
                <FaMicrophone
                  className={
                    isListening && activeInput === "source"
                      ? "animate-pulse"
                      : ""
                  }
                />
              </motion.button>
            </div>

            <AnimatePresence>
              {showSourceOptions && filteredSourceOptions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-50 left-0 right-0 mt-2 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto border border-gray-200"
                >
                  {filteredSourceOptions.map((city, index) => (
                    <motion.div
                      key={city.code}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="p-3 hover:bg-blue-50 cursor-pointer flex items-center transition-colors"
                      onClick={() => {
                        setSource(city.name);
                        setShowSourceOptions(false);
                      }}
                    >
                      <div className="ml-2">
                        <div className="font-medium text-gray-900">
                          {city.name}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-medium">
                            {city.code}
                          </span>
                          <span className="mx-1">•</span>
                          <span>{city.state}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Swap Button */}
          <div className="hidden md:flex md:col-span-1 justify-center z-40">
            <motion.button
              whileHover={{ rotate: 180, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={swapLocations}
              className="p-2 bg-blue-50 rounded-full text-blue-500 hover:bg-blue-100"
            >
              <FaExchangeAlt />
            </motion.button>
          </div>

          {/* Destination */}
          <div className="relative md:col-span-3 z-50">
            <div
              ref={destInputRef}
              className={`glass rounded-lg p-3 h-full flex items-center space-x-2 border ${
                activeInput === "destination"
                  ? "border-blue-400"
                  : "border-gray-200"
              } hover:border-blue-300 transition-colors`}
              onClick={() => {
                setActiveInput("destination");
                setShowDestOptions(true);
                setShowSourceOptions(false);
                setShowClassOptions(false);
              }}
            >
              <FaMapMarkerAlt className="text-red-500 text-lg" />
              <div className="flex-1">
                <label className="block text-xs text-gray-500 font-medium">
                  To
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter city"
                  className="w-full bg-transparent outline-none text-gray-900"
                />
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsListening(true);
                  setActiveInput("destination");
                }}
                className={`p-1.5 rounded-full ${
                  isListening && activeInput === "destination"
                    ? "bg-red-100 text-red-500"
                    : "text-gray-400 hover:bg-gray-100"
                }`}
              >
                <FaMicrophone
                  className={
                    isListening && activeInput === "destination"
                      ? "animate-pulse"
                      : ""
                  }
                />
              </motion.button>
            </div>

            <AnimatePresence>
              {showDestOptions && filteredDestOptions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-50 left-0 right-0 mt-2 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto border border-gray-200"
                >
                  {filteredDestOptions.map((city, index) => (
                    <motion.div
                      key={city.code}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="p-3 hover:bg-blue-50 cursor-pointer flex items-center transition-colors"
                      onClick={() => {
                        setDestination(city.name);
                        setShowDestOptions(false);
                      }}
                    >
                      <div className="ml-2">
                        <div className="font-medium text-gray-900">
                          {city.name}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <span className="bg-red-100 text-red-700 px-1.5 py-0.5 rounded text-xs font-medium">
                            {city.code}
                          </span>
                          <span className="mx-1">•</span>
                          <span>{city.state}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Date */}
          <div className="md:col-span-2 z-40">
            <div className="glass rounded-lg p-3 border border-gray-200 hover:border-blue-300 transition-colors">
              <label className="block text-xs text-gray-500 font-medium">
                Date
              </label>
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-green-500 text-lg" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="bg-transparent outline-none text-gray-900"
                />
              </div>
            </div>
          </div>

          {/* Travelers */}
          <div className="md:col-span-2 z-40">
            <div className="glass rounded-lg p-3 border border-gray-200 hover:border-blue-300 transition-colors">
              <label className="block text-xs text-gray-500 font-medium">
                Travelers
              </label>
              <div className="flex items-center space-x-2">
                <FaUserFriends className="text-orange-500 text-lg" />
                <div className="flex items-center">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={decrementTravelers}
                    className="px-2 text-gray-500 hover:bg-gray-200 rounded"
                    disabled={travelers <= 1}
                  >
                    -
                  </motion.button>
                  <span className="mx-2 text-gray-900">{travelers}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={incrementTravelers}
                    className="px-2 text-gray-500 hover:bg-gray-200 rounded"
                    disabled={travelers >= 10}
                  >
                    +
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Class */}
          <div className="relative md:col-span-1 z-50">
            <div
              className="glass h-full rounded-lg p-3 border border-gray-200 cursor-pointer flex items-center justify-between hover:border-blue-300 transition-colors"
              onClick={() => {
                setShowClassOptions(!showClassOptions);
                setShowSourceOptions(false);
                setShowDestOptions(false);
              }}
            >
              <span className="text-gray-900 text-sm">{travelClass.id}</span>
              <FaChevronDown
                className={`text-gray-500 transition-transform ${
                  showClassOptions ? "rotate-180" : ""
                }`}
              />
            </div>

            <AnimatePresence>
              {showClassOptions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-50 right-0 mt-2 bg-white shadow-lg rounded-lg w-48 border border-gray-200"
                >
                  {classOptions.map((option) => (
                    <div
                      key={option.id}
                      className="p-3 hover:bg-blue-50 cursor-pointer transition-colors"
                      onClick={() => {
                        setTravelClass(option);
                        setShowClassOptions(false);
                      }}
                    >
                      <div className="font-medium text-gray-900">
                        {option.id}
                      </div>
                      <div className="text-xs text-gray-500">{option.name}</div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSearch}
            className="search-button md:col-span-12 lg:col-span-12 mt-2 md:mt-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 shadow-md z-40"
          >
            <FaSearch />
            <span>Search Trains</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
