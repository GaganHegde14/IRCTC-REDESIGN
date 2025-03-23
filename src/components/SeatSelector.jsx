import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

// Sample seat data (you can replace this with dynamic data from an API)
const initialSeats = Array.from({ length: 40 }, (_, index) => ({
  id: index + 1,
  status: Math.random() > 0.3 ? "available" : "booked", // Randomly mark some seats as booked
  price: 500, // Base price per seat
}));

const SeatSelector = ({ onSelect }) => {
  const [seats, setSeats] = useState(initialSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Update parent component whenever selected seats change
  useEffect(() => {
    onSelect(selectedSeats);
  }, [selectedSeats, onSelect]);

  const handleSeatClick = (seat) => {
    if (seat.status === "booked") {
      toast.error("This seat is already booked!");
      return;
    }

    const isSelected = selectedSeats.includes(seat.id);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seat.id));
      setSeats(
        seats.map((s) => (s.id === seat.id ? { ...s, status: "available" } : s))
      );
    } else {
      setSelectedSeats([...selectedSeats, seat.id]);
      setSeats(
        seats.map((s) => (s.id === seat.id ? { ...s, status: "selected" } : s))
      );
      toast.success(`Seat ${seat.id} selected!`);
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Select Your Seats</h3>
      <div className="grid grid-cols-5 gap-3 md:grid-cols-10">
        {seats.map((seat) => (
          <motion.div
            key={seat.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSeatClick(seat)}
            className={`
              w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer
              transition-all duration-300
              ${
                seat.status === "available"
                  ? "bg-green-200 hover:bg-green-300"
                  : ""
              }
              ${
                seat.status === "booked" ? "bg-gray-400 cursor-not-allowed" : ""
              }
              ${seat.status === "selected" ? "bg-blue-500 text-white" : ""}
            `}
            style={{
              // Glassmorphism effect for available seats
              ...(seat.status === "available" && {
                background: "rgba(255, 255, 255, 0.1)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(5px)",
                WebkitBackdropFilter: "blur(5px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }),
            }}
          >
            {seat.id}
          </motion.div>
        ))}
      </div>
      <div className="mt-4 flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-200 rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-400 rounded"></div>
          <span>Booked</span>
        </div>
      </div>
      {selectedSeats.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-4 bg-blue-50 rounded-lg"
        >
          <p className="font-semibold">
            Selected Seats: {selectedSeats.join(", ")}
          </p>
          <p>Total Cost: ₹{selectedSeats.length * 500}</p>
        </motion.div>
      )}
    </div>
  );
};

export default SeatSelector;
