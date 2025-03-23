import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { FaTrain } from "react-icons/fa";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage"; // Import the new SignUpPage
import TrainBookingPage from "./pages/TraingBookingPage";
import TrainListPage from "./pages/TrainListPage";
import TrackTrainPage from "./pages/TrackTrainPage";
import ProfilePage from "./pages/ProfilePage";
import PaymentPage from "./pages/PaymentPage";
import ContactPage from "./pages/ContactPage";
import LoyaltyPage from "./pages/LoyaltyPage";
import WalletPage from "./pages/WalletPage";
import HotelsPage from "./pages/HotelsPage";
import MealsPage from "./pages/MealsPage";
import FlightsPage from "./pages/FlightsPage";
import BusesPage from "./pages/BusesPage";
import HolidayPage from "./pages/HolidayPage";
import PromotionsPage from "./pages/PromotionsPage";
import IRCTCExclusivePage from "./pages/IRCTCExclusivePage";

function AppContent() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="relative flex">
            <div className="w-12 h-12 bg-blue-600 rounded-full animate-ping opacity-75 absolute"></div>
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center relative">
              <FaTrain className="text-white text-xl animate-pulse" />
            </div>
          </div>
          <h2 className="mt-4 text-xl font-medium text-blue-700">IRCTC</h2>
          <p className="text-gray-500 text-sm">Loading your experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#FFFFFF",
            color: "#333333",
            border: "1px solid #E5E7EB",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
          success: {
            iconTheme: {
              primary: "#0284c7",
              secondary: "#FFFFFF",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#FFFFFF",
            },
          },
        }}
      />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />{" "}
          {/* Add Sign-Up Route */}
          <Route path="/book" element={<TrainBookingPage />} />
          <Route path="/trains" element={<TrainListPage />} />
          <Route path="/track" element={<TrackTrainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/loyalty" element={<LoyaltyPage />} />
          <Route path="/ewallet" element={<WalletPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/meals" element={<MealsPage />} />
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/buses" element={<BusesPage />} />
          <Route path="/holidays" element={<HolidayPage />} />
          <Route path="/promotions" element={<PromotionsPage />} />
          <Route path="/irctc-exclusive" element={<IRCTCExclusivePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
