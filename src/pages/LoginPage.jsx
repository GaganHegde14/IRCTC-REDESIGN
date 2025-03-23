import { Formik, Form, Field } from "formik";
import { FaTrain, FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isMailSent, setIsMailSent] = useState(false);

  const handleForgotPassword = () => {
    setIsModalOpen(true);
    setEmail("");
    setIsMailSent(false);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setIsMailSent(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsMailSent(false);
    }, 2000); // Close modal after 2 seconds
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Left Side: Train-Themed Background */}
        <div className="hidden md:block md:w-1/2 relative h-[600px] rounded-lg overflow-hidden">
          <img
            src="assets/images/login_train.avif"
            alt="Train Journey"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent flex items-center justify-center">
            <div className="text-white p-8">
              <h2 className="text-4xl font-bold mb-4 flex items-center gap-3">
                <FaTrain /> Welcome to IRCTC
              </h2>
              <p className="text-lg">
                Book your train tickets, track journeys, and explore India with
                ease.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 max-w-md">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Login
            </h2>
            <Formik
              initialValues={{ username: "", password: "" }}
              // onSubmit={(values) => console.log(values)}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                      <Field
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        className="w-full pl-10 p-3 rounded-lg border border-gray-200 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                      <Field
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        className="w-full pl-10 p-3 rounded-lg border border-gray-200 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <Field
                        type="checkbox"
                        name="remember"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        Remember me
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Login
                  </button>
                </Form>
              )}
            </Formik>
            <p className="text-center text-sm text-gray-600 mt-6">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative animate-modal">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
            {!isMailSent ? (
              <>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Forgot Password
                </h3>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-10 p-3 rounded-lg border border-gray-200 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-gray-900"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    Send Reset Link
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <h3 className="text-xl font-bold text-green-600 mb-4">
                  Mail Sent Successfully!
                </h3>
                <p className="text-gray-600">
                  Check your email for the password reset link.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default LoginPage;
