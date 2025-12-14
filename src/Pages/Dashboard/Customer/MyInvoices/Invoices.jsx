import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Invoices = ({ invoice, index = 0 }) => {
  const { transactionId, name, price, paidAt } = invoice;

  const rowRef = useRef(null);
  const isInView = useInView(rowRef, { once: true });

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: index * 0.05 },
    },
  };

  return (
    <motion.tr
      ref={rowRef}
      variants={rowVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="border-b dark:border-gray-700"
    >
      {/* Payment ID */}
      <td className="px-6 py-4 text-xs break-all text-gray-700 dark:text-gray-300">
        {transactionId}
      </td>

      {/* Book Name */}
      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
        {name || "N/A"}
      </td>

      {/* Amount */}
      <td className="px-6 py-4 font-semibold text-blue-600 dark:text-blue-400">
        ${Number(price).toFixed(2)}
      </td>

      {/* Paid Date */}
      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
        {paidAt ? new Date(paidAt).toLocaleDateString() : "—"}
      </td>
    </motion.tr>
  );
};

export default Invoices;
