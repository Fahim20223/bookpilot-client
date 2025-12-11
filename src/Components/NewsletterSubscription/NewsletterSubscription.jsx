import React, { useState } from "react";
import { Mail, Check } from "lucide-react";
import { motion } from "framer-motion";

const NewsletterSubscription = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = () => {
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <div
      className="bg-linear-to-br from-slate-100 via-purple-50 to-indigo-100 
      dark:from-gray-900 dark:via-gray-950 dark:to-black 
      flex items-center justify-center p-4 py-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-7xl bg-linear-to-br from-purple-400 via-purple-300 to-indigo-400
        dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 
        rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div
          className="absolute top-0 right-0 w-64 h-64 bg-white/10 
          dark:bg-gray-700/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
        />

        <div
          className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/20 
          dark:bg-gray-600/30 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"
        />

        <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/20 
              dark:bg-gray-600/30 backdrop-blur-sm px-4 py-2 rounded-full"
            >
              <Mail className="w-4 h-4 text-white dark:text-gray-200" />
              <span className="text-sm font-medium text-white dark:text-gray-200">
                Newsletter
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold 
              text-white dark:text-gray-100 leading-tight"
            >
              Subscribe to our Newsletter
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white/90 dark:text-gray-200 text-sm md:text-base leading-relaxed"
            >
              Subscribe to our newsletter and be the first one get insights,
              updates on new books, packages and sales.
            </motion.p>
          </div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <div className="text-white/90 dark:text-gray-200 text-sm font-medium mb-2">
              Stay up to date
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3 md:py-4 rounded-full 
                  bg-white/90 dark:bg-gray-700 
                  text-gray-800 dark:text-gray-100 
                  placeholder:text-gray-400 dark:placeholder:text-gray-300 
                  focus:outline-none focus:ring-2 focus:ring-indigo-600 
                  transition-all duration-300"
                />

                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-3 md:py-4 rounded-full font-semibold 
                  transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap ${
                    isSubscribed
                      ? "bg-green-500 text-white"
                      : "bg-indigo-900 dark:bg-indigo-700 text-white hover:bg-indigo-800 dark:hover:bg-indigo-600 shadow-lg"
                  }`}
                >
                  {isSubscribed ? (
                    <>
                      <Check className="w-5 h-5" />
                      Subscribed!
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </motion.button>
              </div>

              <p className="text-white/80 dark:text-gray-300 text-xs md:text-sm">
                By subscribing you agree to our{" "}
                <span className="underline hover:text-white dark:hover:text-gray-200 transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </p>
            </div>

            {/* Success message */}
            {isSubscribed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/20 dark:bg-green-600/20 
                backdrop-blur-sm border border-green-400/30 
                dark:border-green-500/40 
                text-white dark:text-gray-100 px-4 py-3 rounded-lg text-sm"
              >
                🎉 Thank you for subscribing! Check your email for confirmation.
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="relative z-10 mt-12 pt-8 border-t border-white/20 dark:border-gray-500/30 
          grid grid-cols-3 gap-4 text-center"
        >
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white dark:text-gray-100">
              50K+
            </div>
            <div className="text-white/80 dark:text-gray-300 text-xs md:text-sm mt-1">
              Subscribers
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white dark:text-gray-100">
              Weekly
            </div>
            <div className="text-white/80 dark:text-gray-300 text-xs md:text-sm mt-1">
              Updates
            </div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white dark:text-gray-100">
              100%
            </div>
            <div className="text-white/80 dark:text-gray-300 text-xs md:text-sm mt-1">
              Free
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default NewsletterSubscription;
