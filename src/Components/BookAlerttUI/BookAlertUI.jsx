import React, { useState, useEffect } from "react";
import { Bell, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const BookAlertUI = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Icon mapping
  const iconMap = {
    Bell: Bell,
    BookOpen: BookOpen,
    Sparkles: Sparkles,
  };

  // Fetch data from JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/BookAlert.json");
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading book alert data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-amber-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!data) {
    return (
      <div className="min-h-screen bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-amber-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-slate-300">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-slate-950 dark:via-slate-900 dark:to-amber-950 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md dark:shadow-slate-900/50"
            >
              <Bell
                className={`w-4 h-4 text-amber-600 dark:text-amber-400 ${
                  data.badge.showPulse ? "animate-pulse" : ""
                }`}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-slate-200">
                {data.badge.text}
              </span>
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-slate-50 leading-tight"
              >
                {data.heading}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-2 text-amber-600 dark:text-amber-400"
              >
                <BookOpen className="w-6 h-6" />
                <div className="h-1 w-24 bg-linear-to-r from-amber-600 to-orange-500 dark:from-amber-400 dark:to-orange-400 rounded-full" />
              </motion.div>
            </div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-lg sm:text-xl text-gray-600 dark:text-slate-300 leading-relaxed"
            >
              {data.subheading}
            </motion.p>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary dark:bg-orange-500 border-0 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
            >
              {data.ctaButton.text}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              {data.stats.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <div
                    className={`text-3xl font-bold ${
                      stat.highlighted
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-gray-900 dark:text-slate-50"
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Books Grid Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* Decorative blur circles */}
            <div className="absolute md-top-10 md:-right-10 w-40 h-40 bg-amber-300 dark:bg-amber-500/30 rounded-full blur-3xl opacity-30 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-300 dark:bg-blue-500/30 rounded-full blur-3xl opacity-30 pointer-events-none" />

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 relative pb-8 md:pr-8">
              {data.books.map((book) => (
                <motion.div
                  key={book.id}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    rotate: Math.random() * 4 - 2,
                  }}
                  className="rounded-lg shadow-lg dark:shadow-slate-900/50 aspect-[2/3] cursor-pointer relative overflow-hidden group border border-transparent dark:border-slate-700/30"
                >
                  {/* Book Image */}
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />

                  {/* linear overlay on hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Book title on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-xs sm:text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {book.title}
                  </div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 dark:via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Features */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {data.features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-6 rounded-xl shadow-md dark:shadow-slate-900/50 hover:shadow-xl dark:hover:shadow-cyan-900/30 transition-all duration-300 border border-transparent dark:border-slate-700/50"
              >
                <IconComponent className="w-8 h-8 text-amber-600 dark:text-amber-400 mb-3" />
                <h3 className="font-bold text-gray-900 dark:text-slate-50 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default BookAlertUI;
