// import { useState } from 'react'

import { useState } from "react";
import DeleteModal from "../../../../Modal/DeleteModal";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import { toast } from "react-toastify";

// import DeleteModal from '../../Modal/DeleteModal'
const CustomerOrderDataRow = ({ order, refetch }) => {
  const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus); // ✅ declare paymentStatus state

  const axiosSecure = useAxiosSecure();
  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  //category
  const { image, name, price, quantity, status } = order || {};

  const cancelOrder = async () => {
    try {
      const result = await axiosSecure.patch(`/order-cancel/${order._id}`);
      if (result.data.modifiedCount > 0) {
        toast.success("Order cancelled successfully");
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("Cancel order failed");
    } finally {
      closeModal();
    }
  };

  const payOrder = async () => {
    try {
      const { data } = await axiosSecure.post(`/create-checkout-session`, {
        bookId: order.bookId,
        name: order.name,
        description: order.description,
        image: order.image,
        price: order.price,
        quantity: order.quantity,
        customer: {
          name: order.customer?.name,
          email: order.customer?.email,
        },
      });

      // Redirect to Stripe
      window.location.href = data.url;

      // OPTIONAL: If you want immediate UI update without waiting for page reload:
      // await axiosSecure.patch(`/orders/${order._id}/paid`);
      // setPaid(true); // update local state so button changes to "Paid"
    } catch (error) {
      console.log(error);
      toast.error("Payment failed!");
    }
  };

  // const payOrder = async () => {
  //   try {
  //     const { data } = await axiosSecure.post(`/create-checkout-session`, {
  //       bookId: order._id,
  //       name: order.name,
  //       description: order.description,
  //       image: order.image,
  //       price: order.price,
  //       quantity: order.quantity,
  //       customer: {
  //         name: order.customer?.name,
  //         email: order.customer?.email,
  //       },
  //     });

  //     // Redirect user to Stripe
  //     window.location.href = data.url;
  //   } catch (err) {
  //     console.log(err);
  //     toast.error("Payment failed!");
  //   }
  // };

  return (
    <tr className="dark:bg-gray-700 transition-colors border-b border-gray-400 dark:border-gray-700">
      <td className="px-5 py-5 border-b border-gray-200 text-sm">
        <div className="flex items-center">
          <div className="shrink-">
            <div className="block relative">
              <img
                alt="profile"
                src={image}
                className="mx-auto lg:ml-20 object-cover rounded h-10 w-15"
              />
            </div>
          </div>
        </div>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
        <p className="text-gray-900 dark:text-white">{name}</p>
      </td>
      {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{status}</p>
      </td> */}
      <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
        <p className="text-gray-900 dark:text-white">${price}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
        <p className="text-gray-900 dark:text-white">{quantity}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
        <p className="text-gray-900 dark:text-white">{status}</p>
      </td>

      {/* Pay Button */}
      <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
        {status === "pending" && paymentStatus === "unpaid" ? (
          <>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
            <DeleteModal
              cancelOrder={cancelOrder}
              isOpen={isOpen}
              closeModal={closeModal}
            />
          </>
        ) : (
          ""
          // <button
          //   onClick={() => setIsOpen(true)}
          //   className="bg-red-200 text-black px-3 py-1 rounded cursor-not-allowed"
          //   disabled
          // >
          //   Cancel
          // </button>
        )}
      </td>

      {/* <td className="px-5 py-5 border-b border-gray-200 text-sm text-center">
        <button
          onClick={() => setIsOpen(true)}
          className="relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 dark:text-white leading-tight"
        >
          <span className="absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full dark:bg-secondary"></span>
          <span className="relative cursor-pointer">Cancel</span>
        </button>

        <DeleteModal
          cancelOrder={cancelOrder}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </td> */}
      {/* Payment Status */}
      <td className="text-center border-b border-gray-200">
        <span
          className={`px-2 py-1 rounded ${
            paymentStatus === "paid"
              ? "bg-green-400 text-white"
              : "bg-orange-200 text-black"
          }`}
        >
          {paymentStatus === "paid" ? "Paid" : "Unpaid"}
        </span>
      </td>

      {/* Pay Button */}
      <td className="text-center border-b border-gray-200">
        {status === "pending" && paymentStatus === "unpaid" ? (
          <button onClick={payOrder} className="btn-primary btn btn-sm">
            Pay
          </button>
        ) : (
          // <button
          //   className="bg-gray-400 text-white px-3 py-1 rounded cursor-not-allowed"
          //   disabled
          // >
          //   Pay Now
          // </button>
          ""
        )}
      </td>
    </tr>
  );
};

export default CustomerOrderDataRow;
