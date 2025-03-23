import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWallet,
  FaPlus,
  FaCreditCard,
  FaHistory,
  FaChevronRight,
  FaRupeeSign,
  FaExchangeAlt,
  FaArrowUp,
  FaArrowDown,
  FaBus,
  FaTrain,
  FaHotel,
  FaPlane,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Sample transaction data
const transactions = [
  {
    id: 1,
    type: "credit",
    amount: 2000,
    date: "2023-04-15",
    description: "Added money via UPI",
    category: "add_money",
    icon: <FaPlus />,
  },
  {
    id: 2,
    type: "debit",
    amount: 1200,
    date: "2023-04-14",
    description: "Train ticket - Mumbai to Delhi",
    category: "train",
    icon: <FaTrain />,
  },
  {
    id: 3,
    type: "debit",
    amount: 600,
    date: "2023-04-10",
    description: "Bus ticket - Pune to Mumbai",
    category: "bus",
    icon: <FaBus />,
  },
  {
    id: 4,
    type: "credit",
    amount: 1000,
    date: "2023-04-05",
    description: "Refund - Cancelled booking",
    category: "refund",
    icon: <FaExchangeAlt />,
  },
  {
    id: 5,
    type: "debit",
    amount: 3500,
    date: "2023-04-02",
    description: "Hotel booking - Taj Palace",
    category: "hotel",
    icon: <FaHotel />,
  },
  {
    id: 6,
    type: "debit",
    amount: 4500,
    date: "2023-03-28",
    description: "Flight ticket - Delhi to Bangalore",
    category: "flight",
    icon: <FaPlane />,
  },
  {
    id: 7,
    type: "credit",
    amount: 5000,
    date: "2023-03-25",
    description: "Added money via NetBanking",
    category: "add_money",
    icon: <FaPlus />,
  },
];

// Category filters
const categories = [
  { id: "all", name: "All", icon: <FaHistory /> },
  { id: "add_money", name: "Added Money", icon: <FaPlus /> },
  { id: "train", name: "Train", icon: <FaTrain /> },
  { id: "bus", name: "Bus", icon: <FaBus /> },
  { id: "hotel", name: "Hotel", icon: <FaHotel /> },
  { id: "flight", name: "Flight", icon: <FaPlane /> },
  { id: "refund", name: "Refunds", icon: <FaExchangeAlt /> },
];

// Payment methods
const paymentMethods = [
  { id: "upi", name: "UPI", icon: "📱" },
  { id: "cards", name: "Credit/Debit Cards", icon: "💳" },
  { id: "netbanking", name: "Net Banking", icon: "🏦" },
  { id: "wallet", name: "Other Wallets", icon: "👛" },
];

const WalletPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [addMoneyAmount, setAddMoneyAmount] = useState("");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [walletBalance, setWalletBalance] = useState(7200); // Initial balance

  const balanceRef = useRef(null);
  const transactionsRef = useRef(null);
  const addMoneyRef = useRef(null);

  // Filter transactions based on selected category
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(
        transactions.filter((t) => t.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  // Set up animations
  useEffect(() => {
    // Animate balance counter
    gsap.from(balanceRef.current, {
      textContent: 0,
      duration: 2,
      ease: "power1.out",
      snap: { textContent: 1 },
      stagger: {
        each: 0.1,
        onUpdate: function () {
          this.targets()[0].innerHTML =
            "₹" +
            Math.ceil(this.targets()[0].textContent).toLocaleString("en-IN");
        },
        onComplete: function () {
          this.targets()[0].innerHTML =
            "₹" + walletBalance.toLocaleString("en-IN");
        },
      },
    });

    // Animate transactions list
    if (transactionsRef.current) {
      const transactionItems =
        transactionsRef.current.querySelectorAll(".transaction-item");
      gsap.from(transactionItems, {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        scrollTrigger: {
          trigger: transactionsRef.current,
          start: "top 80%",
        },
      });
    }
  }, [activeTab, walletBalance]);

  // Format date to display in desired format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  // Handle add money action
  const handleAddMoney = () => {
    if (addMoneyAmount && selectedPayment) {
      const amount = parseFloat(addMoneyAmount);
      setWalletBalance((prev) => prev + amount);
      // Add to transactions (in a real app, this would come from backend)
      // Reset form
      setAddMoneyAmount("");
      setSelectedPayment(null);
      // Switch to overview tab to see updated balance
      setActiveTab("overview");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-16">
      {/* Header Section */}
      <section className="pt-8 pb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full -mt-32 -mr-32 opacity-70 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              IRCTC eWallet
            </h1>
            <p className="text-gray-600">
              Manage your travel funds securely and make faster payments
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Tabs */}
          <div className="bg-white rounded-t-xl shadow-sm">
            <div className="flex border-b">
              <button
                className={`flex-1 py-4 text-center font-medium ${
                  activeTab === "overview"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-800"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`flex-1 py-4 text-center font-medium ${
                  activeTab === "transactions"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-800"
                }`}
                onClick={() => setActiveTab("transactions")}
              >
                Transactions
              </button>
              <button
                className={`flex-1 py-4 text-center font-medium ${
                  activeTab === "add_money"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-800"
                }`}
                onClick={() => setActiveTab("add_money")}
              >
                Add Money
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-b-xl shadow-sm p-6">
            <AnimatePresence mode="wait">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-lg text-gray-500 mb-1">
                        Available Balance
                      </h2>
                      <div className="flex items-center">
                        <span
                          ref={balanceRef}
                          className="text-3xl md:text-4xl font-bold text-gray-900"
                        >
                          ₹{walletBalance.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 md:mt-0 flex gap-3">
                      <button
                        onClick={() => setActiveTab("add_money")}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <FaPlus className="mr-2" /> Add Money
                      </button>
                      <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                        <FaExchangeAlt className="mr-2" /> Transfer
                      </button>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h3 className="text-lg font-medium text-gray-800 mb-5">
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Link
                        to="/trains"
                        className="bg-blue-50 rounded-xl p-5 hover:bg-blue-100 transition-colors"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3">
                            <FaTrain size={20} />
                          </div>
                          <span className="font-medium">Book Train</span>
                        </div>
                      </Link>
                      <Link
                        to="/hotels"
                        className="bg-blue-50 rounded-xl p-5 hover:bg-blue-100 transition-colors"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3">
                            <FaHotel size={20} />
                          </div>
                          <span className="font-medium">Book Hotel</span>
                        </div>
                      </Link>
                      <Link
                        to="/flights"
                        className="bg-blue-50 rounded-xl p-5 hover:bg-blue-100 transition-colors"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3">
                            <FaPlane size={20} />
                          </div>
                          <span className="font-medium">Book Flight</span>
                        </div>
                      </Link>
                      <Link
                        to="/buses"
                        className="bg-blue-50 rounded-xl p-5 hover:bg-blue-100 transition-colors"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3">
                            <FaBus size={20} />
                          </div>
                          <span className="font-medium">Book Bus</span>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="mt-10">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-lg font-medium text-gray-800">
                        Recent Transactions
                      </h3>
                      <button
                        onClick={() => setActiveTab("transactions")}
                        className="text-blue-600 flex items-center text-sm hover:underline"
                      >
                        View All <FaChevronRight className="ml-1 text-xs" />
                      </button>
                    </div>

                    <div className="space-y-4">
                      {transactions.slice(0, 3).map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                transaction.type === "credit"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {transaction.icon}
                            </div>
                            <div className="ml-3">
                              <p className="font-medium">
                                {transaction.description}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatDate(transaction.date)}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`font-semibold ${
                              transaction.type === "credit"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.type === "credit" ? "+" : "-"}₹
                            {transaction.amount}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Transactions Tab */}
              {activeTab === "transactions" && (
                <motion.div
                  key="transactions"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  ref={transactionsRef}
                >
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Transaction History
                    </h2>

                    {/* Category filters */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`flex items-center px-3 py-2 rounded-full text-sm font-medium ${
                            selectedCategory === category.id
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <span className="mr-1">{category.icon}</span>{" "}
                          {category.name}
                        </button>
                      ))}
                    </div>

                    {/* Transactions list */}
                    <div className="space-y-3">
                      {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((transaction) => (
                          <div
                            key={transaction.id}
                            className="transaction-item flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  transaction.type === "credit"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-red-100 text-red-600"
                                }`}
                              >
                                {transaction.icon}
                              </div>
                              <div className="ml-3">
                                <p className="font-medium">
                                  {transaction.description}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {formatDate(transaction.date)}
                                </p>
                              </div>
                            </div>
                            <div
                              className={`font-semibold ${
                                transaction.type === "credit"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {transaction.type === "credit" ? "+" : "-"}₹
                              {transaction.amount}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">
                            No transactions found.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Add Money Tab */}
              {activeTab === "add_money" && (
                <motion.div
                  key="add_money"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  ref={addMoneyRef}
                >
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Add Money to Wallet
                    </h2>

                    <div className="max-w-md mx-auto">
                      {/* Amount input */}
                      <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">
                          Enter Amount
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaRupeeSign className="text-gray-500" />
                          </div>
                          <input
                            type="number"
                            value={addMoneyAmount}
                            onChange={(e) => setAddMoneyAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            min="100"
                            max="20000"
                          />
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {[500, 1000, 2000, 5000].map((amount) => (
                            <button
                              key={amount}
                              onClick={() =>
                                setAddMoneyAmount(amount.toString())
                              }
                              className="px-3 py-1 bg-gray-100 rounded-md text-sm hover:bg-gray-200 transition-colors"
                            >
                              ₹{amount}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Payment method selection */}
                      <div className="mb-8">
                        <label className="block text-gray-700 font-medium mb-2">
                          Select Payment Method
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {paymentMethods.map((method) => (
                            <button
                              key={method.id}
                              onClick={() => setSelectedPayment(method.id)}
                              className={`flex items-center p-3 border rounded-lg transition-colors ${
                                selectedPayment === method.id
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <span className="text-xl mr-2">
                                {method.icon}
                              </span>
                              <span className="text-sm">{method.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Add money button */}
                      <button
                        onClick={handleAddMoney}
                        disabled={!addMoneyAmount || !selectedPayment}
                        className={`w-full py-3 rounded-lg font-medium ${
                          addMoneyAmount && selectedPayment
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        } transition-colors`}
                      >
                        Proceed to Add ₹{addMoneyAmount || "0"}
                      </button>

                      <div className="mt-4 text-xs text-gray-500 text-center">
                        By adding money, you agree to our{" "}
                        <Link
                          to="/terms"
                          className="text-blue-600 hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-blue-600 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Features Section */}
        <section className="max-w-5xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Use IRCTC eWallet?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <FaWallet size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Secure Transactions
              </h3>
              <p className="text-gray-600">
                Your money is completely secure with state-of-the-art encryption
                and multi-factor authentication.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <FaExchangeAlt size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quick Refunds</h3>
              <p className="text-gray-600">
                Get instant refunds directly to your wallet for any cancelled
                bookings or failed transactions.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <FaArrowUp size={20} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Zero Fees</h3>
              <p className="text-gray-600">
                No hidden charges or transaction fees when you use IRCTC eWallet
                to book tickets or services.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WalletPage;
