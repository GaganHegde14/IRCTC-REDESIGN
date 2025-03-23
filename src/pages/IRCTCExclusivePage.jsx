import { FaTrain, FaStar, FaCrown } from "react-icons/fa";

const exclusives = [
  {
    title: "Maharajas’ Express",
    description: "Travel in luxury with the world’s leading luxury train.",
  },
  {
    title: "Golden Chariot",
    description: "Experience South India’s heritage in unparalleled comfort.",
  },
  {
    title: "Bharat Gaurav Trains",
    description: "Themed journeys showcasing India’s culture and history.",
  },
];

const IRCTCExclusivePage = () => {
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
            <FaCrown /> IRCTC Exclusive
          </h1>
          <p className="text-xl">
            Premium experiences for the discerning traveler.
          </p>
        </div>
      </div>

      {/* Exclusive Services */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 animate-slide-up">
            Premium Travel Experiences
          </h2>
          <p className="text-gray-600 mt-2">
            Discover luxury and heritage with IRCTC’s exclusive offerings.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {exclusives.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-center animate-card-slide"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="mb-4">
                <FaStar className="text-4xl text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <a
                href={`/exclusives/${service.title
                  .toLowerCase()
                  .replace("’", "")
                  .replace(" ", "-")}`}
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-600 text-white py-12 text-center animate-fade-in">
        <h2 className="text-3xl font-bold mb-4">
          Experience Luxury with IRCTC
        </h2>
        <p className="text-lg mb-6">
          Book your exclusive journey today and travel in style.
        </p>
        <a
          href="/book"
          className="inline-block bg-white text-blue-600 py-3 px-8 rounded-lg font-medium hover:bg-gray-100 transition-colors"
        >
          Book Now
        </a>
      </div>
    </section>
  );
};

export default IRCTCExclusivePage;
