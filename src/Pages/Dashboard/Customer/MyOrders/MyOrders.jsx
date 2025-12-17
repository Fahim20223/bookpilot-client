import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
// import axios from "axios";
import LoadingSpinner from "../../../../Components/LoadingSpinner";
import CustomerOrderDataRow from "../../TableRows/CustomerOrderDataRow/CustomerOrderDataRow";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MyOrders = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const {
    data: orders = [],
    isLoading,
    refetch,
    // isError,
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/my-orders`);
      return result.data;
    },
  });

  console.log(orders);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <>
      <div className="container px-4 sm:px-8 mx-auto caret-transparent">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full leading-normal">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3  border-b border-gray-200 text-gray-800 text-sm uppercase font-bold dark:text-white"
                      >
                        Order Date
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3  border-b border-gray-200 text-gray-800 text-sm uppercase font-bold dark:text-white"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3  border-b border-gray-200 text-gray-800 text-sm uppercase font-bold dark:text-white"
                      >
                        Name
                      </th>
                      {/* <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-bold dark:text-white"
                    >
                      Category
                    </th> */}
                      <th
                        scope="col"
                        className="px-5 py-3  border-b border-gray-200 text-gray-800 text-sm uppercase font-bold dark:text-white"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3   border-b border-gray-200 text-gray-800 text-sm uppercase font-bold dark:text-white"
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3  border-b border-gray-200 text-gray-800 text-sm uppercase font-bold dark:text-white"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3  border-b border-gray-200 text-gray-800 text-sm uppercase font-bold dark:text-white"
                      >
                        payment-status
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3  border-b border-gray-200 text-gray-800 text-sm uppercase font-bold dark:text-white"
                      >
                        {/* Action */}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <CustomerOrderDataRow
                        refetch={refetch}
                        key={order._id}
                        order={order}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
