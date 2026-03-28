import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      {/* Top Section: Links */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-white font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink to="/about" className={({isActive}) => isActive ? "text-white" : "hover:text-white"}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/careers" className={({isActive}) => isActive ? "text-white" : "hover:text-white"}>
                Careers
              </NavLink>
            </li>
            <li>
              <NavLink to="/press" className={({isActive}) => isActive ? "text-white" : "hover:text-white"}>
                Press
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" className={({isActive}) => isActive ? "text-white" : "hover:text-white"}>
                Blog
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Products</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink to="/products/electronics" className={({isActive}) => isActive ? "text-white" : "hover:text-white"}>
                Electronics
              </NavLink>
            </li>
            <li>
              <NavLink to="/products/fashion" className={({isActive}) => isActive ? "text-white" : "hover:text-white"}>
                Fashion
              </NavLink>
            </li>
            <li>
              <NavLink to="/products/furniture" className={({isActive}) => isActive ? "text-white" : "hover:text-white"}>
                Home & Furniture
              </NavLink>
            </li>
            <li>
              <NavLink to="/products/sports" className={({isActive}) => isActive ? "text-white" : "hover:text-white"}>
                Sports
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink to="/help" className={({isActive}) => isActive ? "text-white" : "hover:text-white"}>
                Help Center
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({isActive}) => isActive ? "text-white" : "hover:text-white"}>
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/returns" className={({isActive}) => isActive ? "text-white" : "hover:text-white"}>
                Returns
              </NavLink>
            </li>
            <li>
              <NavLink to="/faqs" className={({isActive}) => isActive ? "text-white" : "hover:text-white"}>
                FAQs
              </NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">Follow Us</h4>
          <div className="flex space-x-4 text-gray-400">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-800 text-gray-500 text-sm py-4 text-center">
        © 2026 My E-market place website. All rights reserved.
      </div>
    </footer>
  );
}