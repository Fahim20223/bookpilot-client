import React, { useState } from "react";
import {
  BookOpen,
  Truck,
  Shield,
  DollarSign,
  Clock,
  Heart,
} from "lucide-react";

const WhyChooseBookPilot = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const features = [
    {
      icon: BookOpen,
      title: "Vast Collection",
      description:
        "Access to millions of books across all genres, from bestsellers to rare finds",
      lightColor: "from-blue-500 to-cyan-500",
      darkColor: "from-cyan-400 to-sky-400",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description:
        "Express shipping options with real-time tracking to get books to your doorstep quickly",
      lightColor: "from-purple-500 to-pink-500",
      darkColor: "from-fuchsia-400 to-pink-400",
    },
    {
      icon: DollarSign,
      title: "Best Prices",
      description:
        "Competitive pricing with regular discounts and exclusive deals for members",
      lightColor: "from-green-500 to-emerald-500",
      darkColor: "from-emerald-400 to-teal-400",
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description:
        "Protected transactions with buyer guarantee and hassle-free returns",
      lightColor: "from-orange-500 to-red-500",
      darkColor: "from-amber-400 to-orange-400",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Round-the-clock customer service ready to assist with any queries",
      lightColor: "from-indigo-500 to-purple-500",
      darkColor: "from-indigo-400 to-violet-400",
    },
    {
      icon: Heart,
      title: "Quality Assured",
      description:
        "Every book is carefully inspected to ensure you receive the best condition",
      lightColor: "from-rose-500 to-pink-500",
      darkColor: "from-rose-400 to-pink-400",
    },
  ];

  return (
    <section className="py-20 px-4 bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 dark:text-slate-50 mb-4">
            Why Choose{" "}
            <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              BookPilot
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            We're not just another bookstore. We're your trusted partner in the
            journey of reading.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative group"
              >
                <div
                  className={`
                  bg-white dark:bg-slate-800/60 dark:backdrop-blur-sm rounded-2xl p-8 
                  shadow-lg hover:shadow-2xl 
                  dark:shadow-slate-900/50 dark:hover:shadow-indigo-900/40
                  transition-all duration-300 h-full
                  border border-gray-100 dark:border-slate-700/50 
                  dark:hover:border-indigo-500/40
                  ${hoveredCard === index ? "transform -translate-y-2" : ""}
                `}
                >
                  {/* Icon Container - Different colors for light/dark */}
                  <div
                    className={`
                    w-16 h-16 rounded-xl 
                    bg-linear-to-br ${
                      feature.lightColor
                    } dark:bg-linear-to-br dark:${feature.darkColor}
                    flex items-center justify-center mb-6
                    transition-transform duration-300
                    shadow-lg dark:shadow-xl dark:shadow-indigo-900/30
                    ${hoveredCard === index ? "scale-110 rotate-6" : ""}
                  `}
                  >
                    <Icon className="w-8 h-8 text-white drop-shadow-md" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative Glow */}
                  <div
                    className={`
                    absolute top-0 right-0 w-32 h-32 
                    bg-linear-to-br ${
                      feature.lightColor
                    } dark:bg-linear-to-br dark:${feature.darkColor}
                    opacity-0 rounded-full blur-3xl -z-10
                    transition-opacity duration-300
                    ${hoveredCard === index ? "opacity-10 dark:opacity-30" : ""}
                  `}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button className="px-8 py-4 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-cyan-500 dark:via-blue-500 dark:to-indigo-500 text-white font-semibold rounded-xl hover:shadow-xl dark:hover:shadow-indigo-900/50 transform hover:scale-105 transition-all duration-300">
              Start Shopping Now
            </button>
            <button className="px-8 py-4 bg-white dark:bg-slate-800/80 dark:backdrop-blur-sm text-gray-700 dark:text-slate-200 font-semibold rounded-xl border-2 border-gray-200 dark:border-slate-600/50 hover:border-blue-600 dark:hover:border-cyan-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "1M+", label: "Books Available" },
            { number: "500K+", label: "Happy Readers" },
            { number: "50+", label: "Countries Served" },
            { number: "4.9/5", label: "Customer Rating" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-slate-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default WhyChooseBookPilot;
