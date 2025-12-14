import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { IoBagCheckOutline } from "react-icons/io5";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../Context/AuthContext";

const PaymentSuccess = () => {
  const { user } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (!sessionId || !user) return; // safety check
    const verifyPayment = async () => {
      console.log(sessionId);
      try {
        const { data } = await axiosSecure.post(
          `/payment-success`,
          { sessionId: sessionId } // match backend key},
          // { withCredentials: true } // if your backend needs cookies/JWT
        );

        if (data.success) {
          console.log("Payment verified:", data);
        } else {
          console.log("Payment verification failed:", data.message);
        }
      } catch (err) {
        console.error("Payment verification error:", err);
      }
    };

    verifyPayment();
  }, [sessionId, user]);

  return (
    <div className="py-9 min-h-[63vh]">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-xl border border-purple-500 text-center ">
          <IoBagCheckOutline className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order is being processed.
          </p>
          <Link
            to="/dashboard/my-orders"
            className="inline-block bg-purple-500 text-white font-semibold py-2 px-4 rounded hover:bg-lime-600 transition duration-300"
          >
            Go to My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
