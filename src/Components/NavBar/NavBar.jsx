import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { Moon, Sun } from "lucide-react";
import logo from "../../assets/logo.png";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const [theme, setTheme] = useState("light");

  // Get user from auth context
  const { user, logOut } = useAuth();
  const isLoggedIn = !!user;

  useEffect(() => {
    // Get theme from localStorage
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "font-semibold text-primary" : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/books"
          className={({ isActive }) =>
            isActive ? "font-semibold text-primary" : ""
          }
        >
          Books
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "font-semibold text-primary" : ""
          }
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 backdrop-blur-sm bg-base-100/95">
      <div className="navbar-start">
        {/* Mobile Hamburger Menu */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 ml-2 lg:ml-4">
          <img
            className="w-10 h-10 sm:w-12 sm:h-12"
            src={logo}
            alt="BookPilot Logo"
          />
          <span className="font-bold text-lg sm:text-xl hidden sm:inline">
            BookPilot
          </span>
        </NavLink>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">{links}</ul>
      </div>

      {/* Right Side Actions */}
      <div className="navbar-end gap-2 pr-2 sm:pr-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>

        {/* Conditional Rendering: Login/Register OR User Profile */}
        {isLoggedIn ? (
          // User Profile Picture with Logout Dropdown
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 sm:w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={user?.photoURL || "https://i.pravatar.cc/150?img=12"}
                  alt={user?.displayName || "User"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 shadow-lg"
            >
              <li>
                <a
                  onClick={() => logOut()}
                  className="text-error font-semibold"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        ) : (
          // Login/Register Buttons
          <div className="flex gap-1 sm:gap-2">
            <NavLink
              to="/login"
              className="btn btn-ghost btn-sm sm:btn-md text-xs sm:text-sm"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="btn btn-primary btn-sm sm:btn-md text-white text-xs sm:text-sm"
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
