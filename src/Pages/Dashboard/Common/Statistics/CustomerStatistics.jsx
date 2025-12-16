import React, { useEffect, useState } from "react";
import { FaUserAlt, FaDollarSign } from "react-icons/fa";
import { BsFillCartPlusFill, BsFillHouseDoorFill } from "react-icons/bs";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";

const CustomerStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    expenses: 0,
    books: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosSecure.get("/customer-statistics");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, [axiosSecure]);

  const chartData = [
    { name: "Expenses", value: stats.expenses },
    { name: "Books", value: stats.books },
  ];

  const COLORS = ["#f97316", "#3b82f6"];

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-900 dark:text-gray-100 font-semibold">
            {label}
          </p>
          <p className="text-blue-500 dark:text-blue-400 mt-1">
            {payload[0].name === "Expenses" ? "$" : ""}
            {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom Label for Pie Chart
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mt-6 sm:mt-12">
        {/* Small Cards */}
        <div className="mb-8 sm:mb-12 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {/* Total Expenses Card */}
          <div className="relative flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-900/70">
            <div className="bg-linear-to-tr from-orange-600 to-orange-400 mx-4 rounded-xl shadow-lg absolute -mt-4 grid h-14 w-14 sm:h-16 sm:w-16 place-items-center text-white shadow-orange-500/40">
              <FaDollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="text-xs sm:text-sm font-normal text-gray-600 dark:text-gray-400">
                Total Expenses
              </p>
              <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                ${stats.expenses}
              </h4>
            </div>
          </div>

          {/* Total Books Buy Card */}
          <div className="relative flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-900/70">
            <div className="bg-linear-to-tr from-blue-600 to-blue-400 mx-4 rounded-xl shadow-lg absolute -mt-4 grid h-14 w-14 sm:h-16 sm:w-16 place-items-center text-white shadow-blue-500/40">
              <BsFillCartPlusFill className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="p-4 text-right">
              <p className="text-xs sm:text-sm font-normal text-gray-600 dark:text-gray-400">
                Total Books Buy
              </p>
              <h4 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mt-1">
                {stats.books}
              </h4>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Bar Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-4 sm:p-6 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-900/70">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                Statistics (Bar)
              </h4>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-500 animate-pulse" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={chartData}
                margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="currentColor"
                  className="text-gray-200 dark:text-gray-700"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="name"
                  stroke="currentColor"
                  className="text-gray-600 dark:text-gray-400"
                  tick={{ fill: "currentColor", fontSize: 12 }}
                />
                <YAxis
                  stroke="currentColor"
                  className="text-gray-600 dark:text-gray-400"
                  tick={{ fill: "currentColor", fontSize: 12 }}
                />

                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: "14px" }} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={60}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-4 sm:p-6 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-900/70">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                Statistics (Line)
              </h4>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 animate-pulse" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="currentColor"
                  className="text-gray-200 dark:text-gray-700"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="name"
                  stroke="currentColor"
                  className="text-gray-600 dark:text-gray-400"
                  tick={{ fill: "currentColor", fontSize: 12 }}
                />
                <YAxis
                  stroke="currentColor"
                  className="text-gray-600 dark:text-gray-400"
                  tick={{ fill: "currentColor", fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: "14px" }} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-4 sm:p-6 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-900/70 lg:col-span-2 xl:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                Distribution (Pie)
              </h4>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-purple-500 animate-pulse" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: "14px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerStatistics;
