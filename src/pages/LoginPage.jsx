import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGoogle, FaPhone, FaEnvelope, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Too short").required("Required"),
    ...(isLogin ? {} : { name: Yup.string().required("Required") }),
  });

  const handleSubmit = (values) => {
    toast.success(
      isLogin ? "Logged in successfully!" : "Signed up successfully!"
    );
    console.log(values);
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-blue-900 to-gray-900">
      {/* Hero Section */}
      <section
        className="relative min-h-[50vh] flex items-center justify-center text-center bg-cover bg-center parallax-bg"
        style={{ backgroundImage: "url('/assets/hero/login-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-6xl font-bold text-white mb-4"
          >
            {isLogin ? "Welcome Back!" : "Join the Journey!"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-gray-200"
          >
            Access your account or create a new one to start booking tickets.
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass p-10 rounded-xl max-w-md mx-auto shadow-2xl"
          >
            <h2 className="text-3xl font-bold mb-6 text-center text-white">
              {isLogin ? "Login" : "Signup"}
            </h2>
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  {!isLogin && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="mb-6"
                    >
                      <div className="flex items-center gap-3">
                        <FaEnvelope className="text-yellow-400 text-xl" />
                        <Field
                          name="name"
                          type="text"
                          placeholder="Your Name"
                          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                      </div>
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-400 mt-1"
                      />
                    </motion.div>
                  )}
                  <motion.div className="mb-6">
                    <div className="flex items-center gap-3">
                      <FaEnvelope className="text-yellow-400 text-xl" />
                      <Field
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-400 mt-1"
                    />
                  </motion.div>
                  <motion.div className="mb-6">
                    <div className="flex items-center gap-3">
                      <FaLock className="text-yellow-400 text-xl" />
                      <Field
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-400 mt-1"
                    />
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="neo-button w-full bg-yellow-400 text-gray-800 p-3 rounded-lg font-semibold"
                  >
                    {isLogin ? "Login" : "Signup"}
                  </motion.button>
                </Form>
              )}
            </Formik>
            <div className="mt-6 flex justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="neo-button flex items-center gap-2 bg-gray-700 text-white p-3 rounded-lg"
              >
                <FaPhone /> Login with OTP
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="neo-button flex items-center gap-2 bg-gray-700 text-white p-3 rounded-lg"
              >
                <FaGoogle /> Google Sign-In
              </motion.button>
            </div>
            <p className="mt-6 text-center text-gray-300">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                className="text-yellow-400 cursor-pointer hover:underline"
              >
                {isLogin ? "Signup" : "Login"}
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
            Benefits of Signing Up
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass p-8 rounded-xl text-center"
            >
              <h3 className="text-2xl font-semibold mb-4">
                Personalized Recommendations
              </h3>
              <p className="text-gray-200">
                Get tailored suggestions for routes, seats, and travel dates
                based on your preferences and history.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass p-8 rounded-xl text-center"
            >
              <h3 className="text-2xl font-semibold mb-4">Exclusive Offers</h3>
              <p className="text-gray-200">
                Unlock special discounts, early bird deals, and loyalty rewards
                by creating an account.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass p-8 rounded-xl text-center"
            >
              <h3 className="text-2xl font-semibold mb-4">Booking History</h3>
              <p className="text-gray-200">
                Access your past bookings, manage cancellations, and rebook your
                favorite routes with ease.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-blue-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
            Your Data, Our Priority
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="glass p-8 rounded-xl"
            >
              <h3 className="text-2xl font-semibold mb-4">
                Encrypted Transactions
              </h3>
              <p className="text-gray-200">
                All your payments and personal details are secured with
                industry-standard encryption to ensure safety.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="glass p-8 rounded-xl"
            >
              <h3 className="text-2xl font-semibold mb-4">
                Privacy Guaranteed
              </h3>
              <p className="text-gray-200">
                We respect your privacy and never share your data with third
                parties without your consent.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
