import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  FaGift,
  FaMedal,
  FaTicketAlt,
  FaTrain,
  FaRegCreditCard,
  FaStar,
  FaChevronRight,
  FaUserCircle,
  FaHistory,
  FaRocket,
  FaArrowRight,
  FaCheck, // Add this line
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Sample user data
const userData = {
  name: "Demo Account",
  points: 3450,
  tier: "Gold",
  memberSince: "Jan 2022",
  nextTier: "Platinum",
  pointsToNextTier: 550,
  recentActivities: [
    { date: "Mar 15, 2023", action: "Mumbai - Delhi Trip", points: 250 },
    { date: "Feb 28, 2023", action: "Referred a Friend", points: 100 },
    { date: "Feb 10, 2023", action: "Special Promotion Bonus", points: 150 },
    { date: "Jan 22, 2023", action: "Chennai - Bengaluru Trip", points: 120 },
  ],
};

// Reward items data
const rewardItems = [
  {
    title: "Free Upgrade to Executive Chair Car",
    points: 1200,
    image:
      "https://images.unsplash.com/photo-1540339832862-474599807836?q=80&w=1974",
    category: "Upgrades",
  },
  {
    title: "₹500 Catering Voucher",
    points: 800,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070",
    category: "Food",
  },
  {
    title: "Priority Booking Access",
    points: 1500,
    image:
      "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1974",
    category: "Booking",
  },
  {
    title: "Free Cancellation Voucher",
    points: 1000,
    image:
      "https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=2070",
    category: "Services",
  },
  {
    title: "Companion Discount Voucher",
    points: 2000,
    image:
      "https://previews.123rf.com/images/pikepicture/pikepicture1712/pikepicture171200054/91128229-voucher-design-vector-horizontal-discount-for-shopping-cards-discount-coupon-advertisement.jpg",
    category: "Discounts",
  },
  {
    title: "Airport Lounge Access",
    points: 3000,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD9IAE_Nr_7ZpbqMjHWwxI3dBO9kpVkVNSwQ&s",
    category: "Premium",
  },
];

// Tier benefits
const tierBenefits = {
  Silver: [
    "10% bonus points on bookings",
    "24-hour customer service",
    "Exclusive newsletter",
  ],
  Gold: [
    "20% bonus points on bookings",
    "Priority customer service",
    "Free meal selection",
    "1 free cancellation per quarter",
  ],
  Platinum: [
    "30% bonus points on bookings",
    "Dedicated customer service line",
    "Free meal selection with premium options",
    "2 free cancellations per quarter",
    "Access to premium lounges",
    "Priority waitlist clearance",
  ],
};

const LoyaltyPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredRewards, setFilteredRewards] = useState(rewardItems);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // For demo purposes
  const progressRef = useRef(null);
  const benefitsRef = useRef(null);
  const rewardsRef = useRef(null);
  const faqRef = useRef(null);

  // Progress bar calculation
  const progressPercentage = Math.min(
    100,
    Math.round(
      (userData.points / (userData.points + userData.pointsToNextTier)) * 100
    )
  );

  // Animation with scroll
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);

  // Filter rewards by category
  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredRewards(rewardItems);
    } else {
      setFilteredRewards(
        rewardItems.filter((item) => item.category === activeCategory)
      );
    }
  }, [activeCategory]);

  // Initialize GSAP animations
  useEffect(() => {
    // Animate tier progress bar
    gsap.to(progressRef.current, {
      width: `${progressPercentage}%`,
      duration: 1.5,
      ease: "power2.out",
    });

    // Animate benefits section
    const benefitItems = benefitsRef.current.querySelectorAll(".benefit-item");
    gsap.from(benefitItems, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.2,
      scrollTrigger: {
        trigger: benefitsRef.current,
        start: "top 80%",
      },
    });

    // Animate rewards section
    gsap.from(rewardsRef.current.querySelector("h2"), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: rewardsRef.current,
        start: "top 85%",
      },
    });

    // FAQ section animations
    const faqItems = faqRef.current.querySelectorAll(".faq-item");
    gsap.from(faqItems, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.15,
      scrollTrigger: {
        trigger: faqRef.current,
        start: "top 80%",
      },
    });
  }, [progressPercentage]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full opacity-70 blur-3xl"></div>
        <div className="absolute top-40 -left-20 w-64 h-64 bg-indigo-100 rounded-full opacity-60 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                IRCTC Rewards
                <span className="text-blue-600 ml-2">Program</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Earn points with every journey and redeem them for exclusive
                rewards, upgrades, and special offers.
              </p>
            </motion.div>

            {!isLoggedIn ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Link
                  to="/login"
                  className="inline-block bg-blue-600 text-white font-medium px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Join the Program
                </Link>
                <span className="block text-sm text-gray-500 mt-3">
                  Already a member?{" "}
                  <Link to="/login" className="text-blue-600 hover:underline">
                    Log in
                  </Link>
                </span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-lg max-w-4xl mx-auto"
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center">
                    <div className="relative">
                      <FaUserCircle className="text-6xl text-blue-600" />
                      <span className="absolute -top-1 -right-1 bg-amber-400 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                        {userData.tier[0]}
                      </span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-bold">{userData.name}</h3>
                      <p className="text-gray-500 text-sm">
                        Member since {userData.memberSince}
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">Current Tier</p>
                    <div className="flex items-center">
                      <FaMedal className="text-amber-400 mr-2" />
                      <span className="font-bold">{userData.tier}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Available Points
                    </p>
                    <div className="text-2xl font-bold text-blue-600">
                      {userData.points}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>{userData.tier}</span>
                    <span>{userData.nextTier}</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      ref={progressRef}
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                      style={{ width: "0%" }} // Will be animated via GSAP
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 text-right">
                    {userData.pointsToNextTier} points to {userData.nextTier}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Recent Activity Section - Only for logged in users */}
      {isLoggedIn && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                Recent Activity
              </h2>
              <Link
                to="/profile"
                className="text-blue-600 flex items-center hover:underline"
              >
                View all <FaChevronRight className="ml-1 text-sm" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FaHistory className="mr-2 text-blue-500" /> Point
                  Transactions
                </h3>
                <div className="space-y-4">
                  {userData.recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b border-gray-200 pb-3 last:border-0"
                    >
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                      <span className="text-green-600 font-semibold">
                        +{activity.points}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 rounded-full -mt-20 -mr-20 opacity-70"></div>
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FaRocket className="mr-2 text-blue-500" /> Ways to Earn
                    More
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <FaTicketAlt className="text-blue-500 mt-1 mr-2" />
                      <div>
                        <p className="font-medium">Book AC Class Tickets</p>
                        <p className="text-sm text-gray-600">
                          Earn 2x points on all AC bookings
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FaRegCreditCard className="text-blue-500 mt-1 mr-2" />
                      <div>
                        <p className="font-medium">
                          Use IRCTC Co-Branded Cards
                        </p>
                        <p className="text-sm text-gray-600">
                          Earn 3x points on all transactions
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FaGift className="text-blue-500 mt-1 mr-2" />
                      <div>
                        <p className="font-medium">Refer Friends</p>
                        <p className="text-sm text-gray-600">
                          Get 100 points for each successful referral
                        </p>
                      </div>
                    </li>
                  </ul>

                  <Link
                    to="/promotions"
                    className="mt-6 inline-block text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center"
                  >
                    View current promotions <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Membership Tiers Section */}
      <section ref={benefitsRef} className="py-12"></section>

      {/* Rewards Catalog Section */}
      <section ref={rewardsRef} className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Rewards Catalog
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Redeem your hard-earned points for these exclusive rewards and
              experiences.
            </p>
          </div>

          {/* Rewards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filteredRewards.map((reward, index) => (
                <motion.div
                  key={reward.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={reward.image}
                      alt={reward.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-gray-800">
                        {reward.title}
                      </h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {reward.category}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FaGift className="text-blue-500 mr-2" />
                        <span className="font-semibold">
                          {reward.points} points
                        </span>
                      </div>
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                        Redeem
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-12"></section>
    </div>
  );
};

export default LoyaltyPage;
