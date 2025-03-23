import { FaTrain, FaMapMarkerAlt } from "react-icons/fa";

const packages = [
  {
    destination: "Kashmir",
    description:
      "Experience the paradise on Earth with snow-capped mountains and serene lakes.",
    price: "₹25,000",
    duration: "5 Days / 4 Nights",
  },
  {
    destination: "Kerala",
    description:
      "Explore the backwaters, beaches, and lush greenery of God’s Own Country.",
    price: "₹18,000",
    duration: "4 Days / 3 Nights",
  },
  {
    destination: "Rajasthan",
    description:
      "Discover the royal heritage, forts, and deserts of the Land of Kings.",
    price: "₹22,000",
    duration: "6 Days / 5 Nights",
  },
  {
    destination: "Goa",
    description:
      "Enjoy the sun, sand, and sea in India’s favorite beach destination.",
    price: "₹15,000",
    duration: "3 Days / 2 Nights",
  },
];

const HolidayPage = () => {
  return (
    <section className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-r from-blue-900 to-blue-600 text-white flex items-center justify-center overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-20 moving-train">
          <div className="train">
            <FaTrain className="text-5xl text-white" />
          </div>
        </div>
        <div className="text-center z-10 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <FaMapMarkerAlt /> Explore India with IRCTC Holidays
          </h1>
          <p className="text-xl">
            Unforgettable journeys to India’s most iconic destinations.
          </p>
        </div>
      </div>

      {/* Holiday Packages */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 animate-slide-up">
            Our Holiday Packages
          </h2>
          <p className="text-gray-600 mt-2">
            Discover curated travel experiences to India’s top destinations.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden animate-card-slide"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">
                  [Image Placeholder: {pkg.destination}]
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {pkg.destination}
                </h3>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-blue-600 font-bold">{pkg.price}</span>
                  <span className="text-gray-600">{pkg.duration}</span>
                </div>
                <a
                  href={`/holidays/${pkg.destination.toLowerCase()}`}
                  className="block bg-blue-600 text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors"
                >
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HolidayPage;
