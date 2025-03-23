import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const ContactPage = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    message: Yup.string().required("Required"),
  });

  return (
    <div className="min-h-screen p-10">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold mb-6 text-center"
      >
        Contact Us
      </motion.h2>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <Formik
          initialValues={{ name: "", email: "", message: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            toast.success("Message sent successfully!");
            console.log(values);
          }}
        >
          <Form>
            <div className="mb-4">
              <Field
                name="name"
                type="text"
                placeholder="Your Name"
                className="w-full p-2 rounded border"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <Field
                name="email"
                type="email"
                placeholder="Your Email"
                className="w-full p-2 rounded border"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <Field
                as="textarea"
                name="message"
                placeholder="Your Message"
                className="w-full p-2 rounded border h-32"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Send Message
            </motion.button>
          </Form>
        </Formik>
      </div>
      <div className="mt-6 text-center">
        <p>Support Email: support@irctc.com</p>
        <p>Phone: 1800-123-4567</p>
      </div>
    </div>
  );
};

export default ContactPage;
