import React from "react";
import { Bell, ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const BookAlertUI = () => {
  const books = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
      title: "Midnight Sky",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop",
      title: "Chess Master",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop",
      title: "Success Path",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop",
      title: "Desert Walk",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1491841651911-c44c30c34548?w=400&h=600&fit=crop",
      title: "Hell We Create",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=600&fit=crop",
      title: "Where You Begin",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop",
      title: "Burning Out",
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      title: "Autumn Tales",
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1510172951991-856a654063f9?w=400&h=600&fit=crop",
      title: "Walk in Dark",
    },
    {
      id: 10,
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
      title: "Rambling",
    },
    {
      id: 11,
      image:
        "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop",
      title: "The Gate",
    },
    {
      id: 12,
      image:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop",
      title: "Potter Magic",
    },
  ];

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

  return (
    <div className="max-w-7xl mx-auto">
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-4 sm:p-6 lg:p-8">
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
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md"
              >
                <Bell className="w-4 h-4 text-amber-600 animate-pulse" />
                <span className="text-sm font-medium text-gray-700">
                  New Releases Coming
                </span>
                <Sparkles className="w-4 h-4 text-amber-600" />
              </motion.div>

              {/* Main Heading */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                >
                  Upcoming Book Alert...
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center gap-2 text-amber-600"
                >
                  <BookOpen className="w-6 h-6" />
                  <div className="h-1 w-24 bg-gradient-to-r from-amber-600 to-orange-500 rounded-full" />
                </motion.div>
              </div>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-lg sm:text-xl text-gray-600 leading-relaxed"
              >
                Get 30% off by just booking a book before release
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
                className="btn bg-gradient-to-r from-indigo-900 to-blue-900 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
              >
                Notify Me
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="flex flex-wrap gap-6 pt-4"
              >
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-gray-900">250+</div>
                  <div className="text-sm text-gray-600">Upcoming Books</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Pre-orders</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-amber-600">30%</div>
                  <div className="text-sm text-gray-600">
                    Early Bird Discount
                  </div>
                </div>
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
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-300 rounded-full blur-3xl opacity-30 pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl opacity-30 pointer-events-none" />

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 relative pb-8 pr-8">
                {books.map((book, index) => (
                  <motion.div
                    key={book.id}
                    variants={itemVariants}
                    whileHover={{
                      scale: 1.05,
                      rotate: Math.random() * 4 - 2,
                    }}
                    className="rounded-lg shadow-lg aspect-[2/3] cursor-pointer relative overflow-hidden group"
                  >
                    {/* Book Image */}
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Book title on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-xs sm:text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      {book.title}
                    </div>

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </motion.div>
                ))}
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, type: "spring" }}
                className="absolute -bottom-2 -right-2 sm:bottom-0 sm:right-0 bg-red-500 text-white px-5 py-3 rounded-full shadow-2xl font-bold text-base sm:text-lg transform rotate-12 z-50 border-4 border-white"
              >
                30% OFF
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Features */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Bell,
                title: "Early Access",
                desc: "Be the first to read",
              },
              {
                icon: BookOpen,
                title: "Exclusive Content",
                desc: "Bonus chapters included",
              },
              {
                icon: Sparkles,
                title: "Special Editions",
                desc: "Limited signed copies",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <feature.icon className="w-8 h-8 text-amber-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookAlertUI;
