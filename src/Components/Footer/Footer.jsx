import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="bg-orange-50 py-12 px-6 dark:bg-orange-200">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Get in Touch Section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">📚</span>
              <h2 className="text-xl font-bold text-gray-800">BookPilot</h2>
            </div>

            <h3 className="font-semibold text-gray-800 mb-4">Get in Touch</h3>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <HiOutlineLocationMarker className="mt-1 flex-shrink-0" />
                <div>
                  <p>BookPilot premium books</p>
                  <p>Pot Ltd, Formsato, Dhaka-1204</p>
                </div>
              </div>

              <div className="flex items-start gap-2 text-sm text-gray-600">
                <HiOutlineMail className="mt-1 flex-shrink-0" />
                <div>
                  <p>bookish_premium_get2017.com</p>
                  <p>jasnahmed@lifestyle.com</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="#"
                className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-900 transition"
              >
                <FaXTwitter size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition"
              >
                <FaInstagram size={14} />
              </a>
            </div>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-800 transition">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800 transition">
                  Jobs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800 transition">
                  Records
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800 transition">
                  Supports
                </a>
              </li>
            </ul>
          </div>

          {/* Community Section */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-800 transition">
                  For artists
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800 transition">
                  Updates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800 transition">
                  Advertising
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800 transition">
                  Investor
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-800 transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800 transition">
                  Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800 transition">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-800 transition">
                  Condition
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-300 text-center text-sm text-gray-500">
          © 2024 - All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
