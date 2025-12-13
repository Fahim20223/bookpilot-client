import React, { useRef } from "react";
import { Link } from "react-router";
import { motion, useInView } from "framer-motion";
import { Star, ShoppingBag, Eye, Heart, TrendingUp } from "lucide-react";

const MyWishlists = ({ card, index = 0 }) => {
  const {
    _id,
    name,
    image,
    quantity,
    description,
    price,
    author,
    rating,
    status,
  } = card;

  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  // Card animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="group cursor-pointer h-full"
    >
      {/* to={`/books/${_id}`} */}
      <div className="block h-full">
        <div className="bg-white dark:bg-black rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
          {/* Image Section */}
          <div className="relative overflow-hidden aspect-4/4 bg-gray-100">
            {/* Book Image */}
            <motion.img
              src={
                image ||
                "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop"
              }
              alt={name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
              {/* Status Badge */}
              {status === "published" && quantity > 0 && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                >
                  Available
                </motion.div>
              )}

              {quantity === 0 && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                >
                  Out of Stock
                </motion.div>
              )}

              {/* Favorite Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  // Add to favorites logic here
                }}
                className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <Heart className="w-4 h-4 text-gray-700 hover:text-red-500 transition-colors" />
              </motion.button>
            </div>

            {/* Quick View Button (Visible on Hover) */}
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  // Quick view modal logic here
                }}
                className="w-full bg-white text-gray-900 py-2 px-4 rounded-lg font-semibold text-sm shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Quick View
              </motion.button>
            </div>

            {/* Trending Badge */}
            {rating >= 4.5 && (
              <div className="absolute top-3 right-3 z-10">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="bg-orange-500 text-white p-2 rounded-full shadow-lg"
                >
                  <TrendingUp className="w-4 h-4" />
                </motion.div>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Author */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-gray-500 mb-1 dark:text-white"
            >
              {author || "Unknown Author"}
            </motion.p>

            {/* Book Name */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors dark:text-white"
            >
              {name || "Untitled Book"}
            </motion.h3>

            {/* Description */}
            {description && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-gray-600 line-clamp-2 mb-3 flex-1 dark:text-white"
              >
                {description}
              </motion.p>
            )}

            {/* Rating */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-1 mb-3"
            >
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating || 0)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-1 font-medium dark:text-white">
                {Number(rating) ? Number(rating).toFixed(1) : "N/A"}
              </span>
            </motion.div>

            {/* Price and Add to Cart */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100"
            >
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  ${price ? Number(price).toFixed(2) : "0.00"}
                </div>
                {quantity > 0 && quantity < 5 && (
                  <div className="text-xs text-orange-600 font-medium">
                    Only {quantity} left!
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  // Add to cart logic here
                }}
                disabled={quantity === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm shadow-md transition-all duration-300 ${
                  quantity === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                Add
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MyWishlists;
