import { FaTrain, FaGift, FaRocket, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const promotions = [
  {
    title: "Festive Season Bonus",
    description:
      "Earn 2x points on all bookings made during the festive season!",
    icon: <FaGift className="text-4xl text-blue-600" />,
  },
  {
    title: "Refer a Friend",
    description: "Get 100 bonus points for each friend you refer to IRCTC.",
    icon: <FaRocket className="text-4xl text-blue-600" />,
  },
  {
    title: "Luxury Travel Upgrade",
    description:
      "Book an AC First Class ticket and get a free upgrade to Executive Class.",
    icon: <FaStar className="text-4xl text-yellow-500" />,
  },
];

const PromotionsPage = () => {
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
            <FaGift /> IRCTC Promotions
          </h1>
          <p className="text-xl">
            Unlock exclusive offers and rewards with IRCTC!
          </p>
        </div>
      </div>

      {/* Promotions Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 animate-slide-up">
            Special Offers for You
          </h2>
          <p className="text-gray-600 mt-2">
            Take advantage of these limited-time promotions to enhance your
            travel experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promotions.map((promo, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center animate-card-slide"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="mb-4">{promo.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {promo.title}
              </h3>
              <p className="text-gray-600 mb-4">{promo.description}</p>
              <Link
                to="/book"
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Claim Offer
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white py-12 text-center animate-fade-in">
        <h2 className="text-3xl font-bold mb-4">Don’t Miss Out!</h2>
        <p className="text-lg mb-6">
          Book now to take advantage of these exclusive promotions.
        </p>
        <Link
          to="/book"
          className="inline-block bg-white text-blue-600 py-3 px-8 rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          Book Now
        </Link>
      </div>
    </section>
  );
};

export default PromotionsPage;
