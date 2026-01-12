import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  BookOpen,
  Clock,
  MessageSquare,
} from "lucide-react";

const ContactUs = () => {
  const [status, setStatus] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data) => {
    setStatus("sending");
    console.log("Form Data:", data);

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      reset();
      setTimeout(() => setStatus(""), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions about BookPilot? We're here to help deliver answers
            as fast as we deliver books.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Contact Cards */}
          {[
            {
              icon: Phone,
              title: "Call Us",
              info: "+1 (555) 123-4567",
              subinfo: "Mon-Fri 9AM-6PM",
            },
            {
              icon: Mail,
              title: "Email Us",
              info: "hello@BookPilot.com",
              subinfo: "We reply within 24hrs",
            },
            {
              icon: MapPin,
              title: "Visit Us",
              info: "123 Book Street, Reading City",
              subinfo: "Open Mon-Sat",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl transition-all duration-300 hover:scale-105 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 shadow-xl shadow-gray-200/50 dark:shadow-slate-900/50"
            >
              <item.icon className="w-10 h-10 mb-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-md mb-1 text-gray-700 dark:text-gray-300">
                {item.info}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {item.subinfo}
              </p>
            </div>
          ))}
        </div>

        {/* Main Contact Form Section */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Side - Form */}
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-xl shadow-gray-200/50 dark:shadow-slate-900/50">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Send Us a Message
            </h2>

            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className={`w-full px-4 py-3 rounded-md transition-all duration-200 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white border ${
                    errors.name
                      ? "border-red-500 dark:border-red-400"
                      : "border-gray-200 dark:border-slate-600"
                  } focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 outline-none`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className={`w-full px-4 py-3 rounded-md transition-all duration-200 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white border ${
                      errors.email
                        ? "border-red-500 dark:border-red-400"
                        : "border-gray-200 dark:border-slate-600"
                    } focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 outline-none`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Phone
                  </label>
                  <input
                    type="tel"
                    {...register("phone", {
                      pattern: {
                        value:
                          /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
                        message: "Invalid phone number",
                      },
                    })}
                    className={`w-full px-4 py-3 rounded-md transition-all duration-200 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white border ${
                      errors.phone
                        ? "border-red-500 dark:border-red-400"
                        : "border-gray-200 dark:border-slate-600"
                    } focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 outline-none`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Subject *
                </label>
                <select
                  {...register("subject", {
                    required: "Please select a subject",
                  })}
                  className={`w-full px-4 py-3 rounded-md transition-all duration-200 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white border ${
                    errors.subject
                      ? "border-red-500 dark:border-red-400"
                      : "border-gray-200 dark:border-slate-600"
                  } focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 outline-none`}
                >
                  <option value="">Select a subject</option>
                  <option value="delivery">Delivery Inquiry</option>
                  <option value="order">Order Status</option>
                  <option value="partnership">Partnership</option>
                  <option value="support">Customer Support</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Message *
                </label>
                <textarea
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                    maxLength: {
                      value: 500,
                      message: "Message must not exceed 500 characters",
                    },
                  })}
                  rows="5"
                  className={`w-full px-4 py-3 rounded-md transition-all duration-200 resize-none bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-white border ${
                    errors.message
                      ? "border-red-500 dark:border-red-400"
                      : "border-gray-200 dark:border-slate-600"
                  } focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 outline-none`}
                  placeholder="Tell us how we can help..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={status === "sending"}
                className="w-full py-4 rounded-md font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 dark:bg-orange-500 border-0 text-white shadow-md shadow-purple-600/30 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
              >
                {status === "sending" ? (
                  <>Sending...</>
                ) : status === "success" ? (
                  <>✓ Message Sent!</>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Side - Info */}
          <div className="space-y-8">
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-xl shadow-gray-200/50 dark:shadow-slate-900/50">
              <Clock className="w-10 h-10 mb-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Business Hours
              </h3>
              <div className="space-y-3">
                {[
                  { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
                  { day: "Saturday", time: "10:00 AM - 4:00 PM" },
                  { day: "Sunday", time: "Closed" },
                ].map((schedule, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">
                      {schedule.day}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-gray-200">
                      {schedule.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-linear-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-white shadow-xl">
              <MessageSquare className="w-10 h-10 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Quick Response</h3>
              <p className="mb-4 opacity-90">
                Need immediate assistance? Our customer support team typically
                responds within 2 hours during business hours.
              </p>
              <div className="flex gap-2 text-sm opacity-90">
                <span>⚡</span>
                <span>Average response time: 45 minutes</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-xl shadow-gray-200/50 dark:shadow-slate-900/50">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                FAQ Section
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                Before reaching out, check our FAQ section for instant answers
                to common questions.
              </p>
              <button className="px-6 py-3 rounded-md font-medium transition-all duration-300 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-900 dark:text-white">
                View FAQs →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
