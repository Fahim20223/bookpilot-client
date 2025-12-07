import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Users,
  Star,
} from "lucide-react";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Norwegian Wood",
      author: "Haruki Murakami",
      description:
        "A huge collection of online books to boost your curiosity. To reach peoples heart and desire. With an affordable price and just few clicks away.",
      price: "$20.00",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=1000&fit=crop",
      rating: 4.8,
      reviews: "10K+",
      bgColor: "from-amber-50 to-orange-100",
      accentColor: "bg-indigo-900",
    },
    {
      id: 2,
      title: "The Midnight Library",
      author: "Matt Haig",
      description:
        "Between life and death there is a library. A place of infinite possibilities. Discover your perfect life in this inspiring tale of hope and second chances.",
      price: "$24.99",
      image:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&h=1000&fit=crop",
      rating: 4.9,
      reviews: "15K+",
      bgColor: "from-blue-50 to-indigo-100",
      accentColor: "bg-blue-900",
    },
    {
      id: 3,
      title: "Atomic Habits",
      author: "James Clear",
      description:
        "Transform your life with tiny changes. An easy and proven way to build good habits and break bad ones. Start your journey to success today.",
      price: "$18.50",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=1000&fit=crop",
      rating: 5.0,
      reviews: "25K+",
      bgColor: "from-green-50 to-emerald-100",
      accentColor: "bg-emerald-900",
    },
    {
      id: 4,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      description:
        "A psychological thriller that will keep you on the edge of your seat. Unravel the mystery behind a woman's silence and discover shocking truths.",
      price: "$22.00",
      image:
        "https://images.unsplash.com/photo-1491841651911-c44c30c34548?w=800&h=1000&fit=crop",
      rating: 4.7,
      reviews: "12K+",
      bgColor: "from-purple-50 to-violet-100",
      accentColor: "bg-purple-900",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = slides.length - 1;
      if (next >= slides.length) next = 0;
      return next;
    });
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className={`absolute inset-0 bg-linear-to-br ${slides[currentSlide].bgColor}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-12 lg:py-0">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="space-y-6 order-2 lg:order-1"
              >
                {/* Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
                >
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span className="text-sm font-semibold text-gray-700">
                    {slides[currentSlide].rating} Rating
                  </span>
                  <span className="text-xs text-gray-500">
                    ({slides[currentSlide].reviews} reviews)
                  </span>
                </motion.div>

                {/* Main Heading */}
                <div className="space-y-3">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight"
                  >
                    Where every page begins a{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
                      journey...
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl"
                  >
                    {slides[currentSlide].description}
                  </motion.p>
                </div>

                {/* CTA Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`${slides[currentSlide].accentColor} text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-300 group`}
                >
                  Get a book
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* Customer Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex items-center gap-4 pt-6"
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.9 + i * 0.1 }}
                        className="w-10 h-10 rounded-full border-2 border-white bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg"
                      >
                        {String.fromCharCode(65 + i)}
                      </motion.div>
                    ))}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">
                      {slides[currentSlide].reviews}
                    </div>
                    <div className="text-sm text-gray-600">Happy Customers</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Content - Book Display */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative order-1 lg:order-2 flex items-center justify-center"
              >
                {/* Decorative Elements */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute w-96 h-96 bg-linear-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
                />

                {/* Book Card */}
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  whileHover={{ y: -10 }}
                  className="relative bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full z-10"
                >
                  {/* Book Image */}
                  <div className="relative mb-6 group">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative"
                    >
                      <img
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].title}
                        className="w-full h-80 object-cover rounded-2xl shadow-xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>

                    {/* Floating Price Tag */}
                    <motion.div
                      initial={{ scale: 0, rotate: -12 }}
                      animate={{ scale: 1, rotate: -12 }}
                      transition={{ delay: 0.8, type: "spring" }}
                      className="absolute -top-4 -right-4 bg-red-500 text-white px-6 py-3 rounded-full font-bold text-xl shadow-xl"
                    >
                      {slides[currentSlide].price}
                    </motion.div>
                  </div>

                  {/* Book Info */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {slides[currentSlide].title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {slides[currentSlide].author}
                    </p>
                    <p className="text-gray-500 text-sm line-clamp-2">
                      {slides[currentSlide].description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 pt-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(slides[currentSlide].rating)
                                ? "text-amber-500 fill-amber-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 font-medium">
                        {slides[currentSlide].rating}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        {/* Prev Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(-1)}
          className="bg-white/90 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </motion.button>

        {/* Dots Indicator */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              whileHover={{ scale: 1.2 }}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? "w-10 h-3 bg-gray-900"
                  : "w-3 h-3 bg-gray-400 hover:bg-gray-600"
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => paginate(1)}
          className="bg-white/90 backdrop-blur-sm hover:bg-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6 text-gray-900" />
        </motion.button>
      </div>

      {/* Slide Counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg font-semibold text-gray-900 z-20"
      >
        {currentSlide + 1} / {slides.length}
      </motion.div>
    </div>
  );
};
export default Banner;
