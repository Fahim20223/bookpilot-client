import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import InvoiceRow from "./InvoiceRow";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import Invoices from "./Invoices";
// import LoadingSpinner from "../../../../Components/LoadingSpinner";

const MyInvoices = () => {
  const axiosSecure = useAxiosSecure();

  const { data: invoices = [], isLoading } = useQuery({
    queryKey: ["my-invoices"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-invoices");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Invoices
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {invoices.length} payments found
        </p>
      </div>

      {invoices.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold">
                    Payment ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold">
                    Book
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold">
                    Paid Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {invoices.map((invoice, index) => (
                  <Invoices key={invoice._id} invoice={invoice} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <p className="text-gray-600 dark:text-gray-400">No invoices found</p>
        </div>
      )}
    </div>
  );
};

export default MyInvoices;
