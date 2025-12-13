import React from "react";
import { Link } from "react-router";
import { IoBagCheckOutline } from "react-icons/io5";

const PaymentCancel = () => {
  return (
    <div className="py-9 min-h-[63vh] flex justify-center items-center">
      <div className="bg-white p-10 rounded-lg shadow-xl border border-red-500 text-center ">
        <IoBagCheckOutline className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Cancelled!
        </h1>
        <p className="text-gray-600 mb-6">
          You have cancelled your payment. You can try again.
        </p>
        <Link
          to="/dashboard/my-orders"
          className="inline-block bg-lime-500 text-white font-semibold py-2 px-4 rounded hover:bg-lime-600 transition duration-300"
        >
          Go to My Orders
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancel;
