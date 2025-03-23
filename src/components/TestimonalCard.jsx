import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const TestimonialCard = ({
  name,
  message,
  rating = 5,
  image,
  designation,
  location,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        y: -10,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col h-full transform transition-all duration-300 border border-gray-100"
    >
      <div className="relative mb-6">
        <FaQuoteLeft className="text-blue-100 text-6xl absolute -top-4 -left-2 opacity-60" />
        <p className="text-gray-700 italic text-lg relative z-10">
          "{message}"
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {image ? (
            <motion.img
              src={image}
              alt={name}
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
              whileHover={{ scale: 1.1, borderColor: "#3b82f6" }}
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium text-lg">
              {name.charAt(0)}
            </div>
          )}

          <div>
            <h4 className="text-gray-900 font-semibold">{name}</h4>
            <div className="flex flex-col">
              {designation && (
                <span className="text-sm text-gray-500">{designation}</span>
              )}
              {location && (
                <span className="text-xs text-gray-400">{location}</span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 + 0.3 }}
            >
              <FaStar
                className={`${
                  i < rating ? "text-yellow-400" : "text-gray-300"
                } text-sm`}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-blue-500 rounded-full opacity-0"
        whileHover={{ opacity: 1, width: "60%" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default TestimonialCard;
