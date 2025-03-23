import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const PaymentPage = () => {
  const validationSchema = Yup.object({
    cardNumber: Yup.string()
      .required("Required")
      .matches(/^\d{16}$/, "Invalid card number"),
    expiry: Yup.string()
      .required("Required")
      .matches(/^\d{2}\/\d{2}$/, "Invalid expiry date"),
    cvv: Yup.string()
      .required("Required")
      .matches(/^\d{3}$/, "Invalid CVV"),
  });

  return (
    <div className="min-h-screen p-10">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold mb-6"
      >
        Payment Details
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg"
      >
        <Formik
          initialValues={{ cardNumber: "", expiry: "", cvv: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            toast.success("Payment successful!");
            console.log(values);
          }}
        >
          <Form>
            <div className="mb-4">
              <Field
                name="cardNumber"
                type="text"
                placeholder="Card Number"
                className="w-full p-2 rounded border"
              />
              <ErrorMessage
                name="cardNumber"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4 flex gap-4">
              <div className="w-1/2">
                <Field
                  name="expiry"
                  type="text"
                  placeholder="MM/YY"
                  className="w-full p-2 rounded border"
                />
                <ErrorMessage
                  name="expiry"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="w-1/2">
                <Field
                  name="cvv"
                  type="text"
                  placeholder="CVV"
                  className="w-full p-2 rounded border"
                />
                <ErrorMessage
                  name="cvv"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="w-full bg-green-500 text-white p-2 rounded"
            >
              Pay Now
            </motion.button>
          </Form>
        </Formik>
      </motion.div>
    </div>
  );
};

export default PaymentPage;
