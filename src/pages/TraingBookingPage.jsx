import { useState } from "react";
import {
  FaTrain,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCreditCard,
} from "react-icons/fa";
import SeatSelector from "../components/SeatSelector";
import toast from "react-hot-toast";

const trainClasses = ["AC First Class", "AC 2-Tier", "Sleeper", "General"];
const travelDates = ["2025-04-01", "2025-04-02", "2025-04-03"];

const TrainBookingPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    trainClass: "",
    seats: [],
    fare: 0,
  });

  const handleNextStep = () => {
    if (
      step === 1 &&
      (!formData.from || !formData.to || !formData.date || !formData.trainClass)
    ) {
      toast.error("Please fill all fields!");
      return;
    }
    setStep(step + 1);
  };

  const updateFare = (selectedSeats) => {
    const baseFare = formData.trainClass.includes("AC") ? 1000 : 500;
    setFormData({
      ...formData,
      seats: selectedSeats,
      fare: baseFare * selectedSeats.length,
    });
  };

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Hero Section with Moving Train */}
      <div className="relative h-[400px] bg-gradient-to-r from-blue-900 to-blue-600 text-white flex items-center justify-center overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-20 moving-train">
          <div className="train">
            <FaTrain className="text-5xl text-white" />
          </div>
        </div>
        <div className="text-center z-10 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <FaTrain /> Book Your Train Journey
          </h1>
          <p className="text-xl">
            Plan your trip with ease and travel in comfort.
          </p>
        </div>
      </div>

      {/* Booking Steps */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row justify-between mb-12 gap-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 text-center p-4 rounded-lg animate-slide-up ${
                step >= s
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
              style={{ animationDelay: `${s * 0.2}s` }}
            >
              Step {s}:{" "}
              {s === 1
                ? "Journey Details"
                : s === 2
                ? "Seat Selection"
                : "Summary"}
            </div>
          ))}
        </div>

        {/* Step 1: Journey Details */}
        {step === 1 && (
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto animate-slide-up">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Enter Journey Details
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-500 mb-2">From</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter departure station"
                    value={formData.from}
                    onChange={(e) =>
                      setFormData({ ...formData, from: e.target.value })
                    }
                    className="w-full pl-10 p-3 rounded-lg border border-gray-200 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">To</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter destination station"
                    value={formData.to}
                    onChange={(e) =>
                      setFormData({ ...formData, to: e.target.value })
                    }
                    className="w-full pl-10 p-3 rounded-lg border border-gray-200 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Travel Date
                </label>
                <div className="relative">
                  <FaCalendarAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full pl-10 p-3 rounded-lg border border-gray-200 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900"
                  >
                    <option value="">Select Date</option>
                    {travelDates.map((date) => (
                      <option key={date} value={date}>
                        {date}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Class
                </label>
                <div className="relative">
                  <FaTrain className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={formData.trainClass}
                    onChange={(e) =>
                      setFormData({ ...formData, trainClass: e.target.value })
                    }
                    className="w-full pl-10 p-3 rounded-lg border border-gray-200 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900"
                  >
                    <option value="">Select Class</option>
                    {trainClasses.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={handleNextStep}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Seat Selection */}
        {step === 2 && (
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto animate-slide-up">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Select Your Seats
            </h2>
            <SeatSelector onSelect={updateFare} />
            <p className="mt-6 text-lg text-center text-gray-600">
              Total Fare: ₹{formData.fare}
            </p>
            <button
              onClick={handleNextStep}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors mt-6"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 3: Booking Summary */}
        {step === 3 && (
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto animate-slide-up">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Booking Summary
            </h2>
            <div className="space-y-4">
              <p className="text-lg">
                <span className="font-semibold">From:</span> {formData.from}
              </p>
              <p className="text-lg">
                <span className="font-semibold">To:</span> {formData.to}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Date:</span> {formData.date}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Class:</span>{" "}
                {formData.trainClass}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Seats:</span>{" "}
                {formData.seats.join(", ")}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Total Fare:</span> ₹
                {formData.fare}
              </p>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors mt-6">
              <FaCreditCard className="inline mr-2" /> Proceed to Payment
            </button>
          </div>
        )}
      </div>

      {/* Travel Classes Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 animate-slide-up">
              Explore Our Travel Classes
            </h2>
            <p className="text-gray-600 mt-2">
              Choose the perfect class for your journey with IRCTC.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: "AC First Class",
                description:
                  "Luxury travel with spacious cabins and premium amenities.",
                image: "/assets/classes/ac-first.jpg",
              },
              {
                title: "AC 2-Tier",
                description:
                  "Comfortable berths with air conditioning for long journeys.",
                image: "/assets/classes/ac-2tier.jpg",
              },
              {
                title: "Sleeper",
                description:
                  "Affordable overnight travel with basic amenities.",
                image: "/assets/classes/sleeper.jpg",
              },
              {
                title: "General",
                description: "Budget-friendly option with open seating.",
                image: "/assets/classes/general.jpg",
              },
            ].map((cls, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden animate-card-slide"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="h-40 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">
                    [Image Placeholder: {cls.title}]
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {cls.title}
                  </h3>
                  <p className="text-gray-600">{cls.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainBookingPage;
