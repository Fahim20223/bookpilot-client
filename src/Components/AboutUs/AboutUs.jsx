import React from "react";
import {
  BookOpen,
  Truck,
  Users,
  Award,
  Target,
  Heart,
  TrendingUp,
  Globe,
} from "lucide-react";

const AboutUs = () => {
  const stats = [
    { number: "50K+", label: "Books Delivered", icon: BookOpen },
    { number: "10K+", label: "Happy Customers", icon: Users },
    { number: "25+", label: "Cities Covered", icon: Globe },
    { number: "99%", label: "On-Time Delivery", icon: Award },
  ];

  const values = [
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Every decision we make starts with our customers in mind. Your satisfaction is our success.",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description:
        "We continuously improve our services using the latest technology to make book delivery seamless.",
    },
    {
      icon: Award,
      title: "Reliability",
      description:
        "We promise and deliver. Our commitment to on-time delivery and book safety is unwavering.",
    },
    {
      icon: Globe,
      title: "Sustainability",
      description:
        "We care about the planet. Our eco-friendly packaging and carbon-neutral delivery make a difference.",
    },
  ];

  const team = [
    { name: "Sarah Johnson", role: "Founder & CEO", image: "👩‍💼" },
    { name: "Michael Chen", role: "Chief Operations Officer", image: "👨‍💼" },
    { name: "Emily Rodriguez", role: "Head of Customer Success", image: "👩‍💻" },
    { name: "David Kim", role: "Logistics Director", image: "👨‍🔧" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <BookOpen className="w-16 h-16 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            About BookCourier
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Delivering knowledge, one book at a time. We're on a mission to make
            books accessible to everyone, everywhere.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl text-center transition-all duration-300 hover:scale-105 bg-white dark:bg-slate-800 shadow-xl shadow-gray-200/50 dark:shadow-slate-900/50"
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
              <div className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-indigo-400 dark:from-blue-600 dark:to-indigo-600 rounded-3xl opacity-20 blur-2xl"></div>
              <div className="relative p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-xl shadow-gray-200/50 dark:shadow-slate-900/50">
                <div className="flex items-center justify-center h-96 text-8xl">
                  📚
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Our Story
            </h2>
            <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                BookCourier was born from a simple idea: what if getting your
                favorite books could be as easy as ordering food? In 2020, our
                founder Sarah Johnson, an avid reader frustrated with delayed
                book deliveries, decided to create a solution.
              </p>
              <p>
                Starting with just 5 delivery partners in a single city, we've
                grown to serve over 10,000 happy readers across 25 cities. Our
                commitment to speed, reliability, and book safety has made us
                the preferred choice for book lovers everywhere.
              </p>
              <p>
                Today, we're not just delivering books—we're delivering dreams,
                knowledge, and endless possibilities. Every package we deliver
                contains a world waiting to be explored.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="p-10 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-white shadow-xl">
            <Target className="w-12 h-12 mb-4" />
            <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg opacity-90 leading-relaxed">
              To revolutionize book delivery by combining cutting-edge logistics
              with a passion for literature, making every book accessible within
              hours, not days.
            </p>
          </div>

          <div className="p-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-700 dark:from-indigo-600 dark:to-purple-800 text-white shadow-xl">
            <Truck className="w-12 h-12 mb-4" />
            <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
            <p className="text-lg opacity-90 leading-relaxed">
              To become the world's most trusted book courier service, fostering
              a global community of readers who never have to wait for their
              next great read.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl transition-all duration-300 hover:scale-105 bg-white dark:bg-slate-800 shadow-xl shadow-gray-200/50 dark:shadow-slate-900/50"
              >
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 w-fit mb-4">
                  <value.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
            Meet Our Team
          </h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Passionate individuals working together to deliver excellence
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div
                key={i}
                className="text-center transition-all duration-300 hover:scale-105"
              >
                <div className="mb-4 p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-xl shadow-gray-200/50 dark:shadow-slate-900/50">
                  <div className="text-7xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center p-12 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Whether you're a book lover, a partner bookstore, or looking to join
            our team, we'd love to hear from you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-4 rounded-lg font-semibold bg-white text-blue-600 hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
              Contact Us
            </button>
            <button className="px-8 py-4 rounded-lg font-semibold bg-blue-700 hover:bg-blue-800 transition-all duration-300 hover:scale-105 shadow-lg">
              Become a Partner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;
