import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

const AuthorsOfMonth = () => {
  const authors = [
    {
      id: 1,
      name: "Kavinaski Nova",
      location: "Prague, Czech Republic",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      books: 12,
    },
    {
      id: 2,
      name: "Elina Ferrante",
      location: "Rome, Italy",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      books: 8,
    },
    {
      id: 3,
      name: "J. Marmoush",
      location: "Cairo, Egypt",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      books: 15,
    },
    {
      id: 4,
      name: "Mitsuki Natsuko",
      location: "Hokkaido, Japan",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      books: 10,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
            Authors of this Month
          </h2>
          <div className="h-1 w-24 bg-blue-600 rounded-full"></div>
        </motion.div>

        {/* Authors Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {authors.map((author, index) => (
            <motion.div
              key={author.id}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group cursor-pointer"
            >
              {/* Card Container */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Image Section */}
                <div className="relative overflow-hidden aspect-square">
                  <motion.img
                    src={author.image}
                    alt={author.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Books count badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                    className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg"
                  >
                    <span className="text-sm font-bold text-gray-900">
                      {author.books} Books
                    </span>
                  </motion.div>
                </div>

                {/* Info Section */}
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
                        {author.name}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <p className="text-sm truncate">{author.location}</p>
                      </div>
                    </div>

                    {/* Follow Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-1 whitespace-nowrap"
                    >
                      Follow
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex justify-center mt-12"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 shadow-xl transition-all duration-300 group"
          >
            View All Authors
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Featured Authors", value: "50+" },
            { label: "Total Books", value: "500+" },
            { label: "Countries", value: "25+" },
            { label: "Readers", value: "100K+" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.3 + index * 0.1, type: "spring" }}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
export default AuthorsOfMonth;
