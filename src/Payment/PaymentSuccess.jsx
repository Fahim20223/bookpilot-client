import axios from "axios";
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { IoBagCheckOutline } from "react-icons/io5";

const PaymentSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  useEffect(() => {
    axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {
      sessionId,
    });
  }, [sessionId]);
  return (
    <div className="py-9 min-h-[63vh]">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white p-10 rounded-lg shadow-xl border border-blue-500 text-center ">
          <IoBagCheckOutline className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order is being processed.
          </p>
          <Link
            to="/dashboard/my-orders"
            className="inline-block bg-lime-500 text-white font-semibold py-2 px-4 rounded hover:bg-lime-600 transition duration-300"
          >
            Go to My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
