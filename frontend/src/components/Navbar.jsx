import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/doctors", label: "All Doctors" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    navigate("/login");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-30 -mx-4 px-4 sm:-mx-10 sm:px-10 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-white/0 border-b border-transparent"
      }`}
    >
      <div className="flex items-center justify-between py-4">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="Logo"
          className="w-40 sm:w-44 cursor-pointer"
        />

        <ul className="hidden md:flex items-center gap-1 font-medium text-sm">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"}>
              {({ isActive }) => (
                <li
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full transition-colors duration-200 ${
                    isActive
                      ? "bg-primary-light text-primary-dark"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary nav-pulse" />
                  )}
                  {link.label}
                </li>
              )}
            </NavLink>
          ))}
          <a
            href="https://hms-admin-theta.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="ml-2 px-4 py-2 rounded-full text-white bg-primary hover:bg-primary-dark transition-colors duration-200 text-sm shadow-sm"
          >
            Admin / Doctor Panel
          </a>
        </ul>

        <div className="flex items-center gap-4">
          {token && userData ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img
                src={userData.image}
                alt="Profile Icon"
                className="w-9 h-9 rounded-full object-cover border-2 border-primary-light"
              />
              <img
                src={assets.dropdown_icon}
                alt="Dropdown icon"
                className="w-2.5 opacity-60 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute top-0 right-0 pt-14 text-sm font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-52 bg-white border border-gray-100 shadow-xl rounded-xl flex flex-col gap-1 p-2">
                  <p
                    onClick={() => navigate("/my-profile")}
                    className="hover:bg-primary-light hover:text-primary-dark cursor-pointer rounded-lg px-3 py-2 transition-colors"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => navigate("/my-appointments")}
                    className="hover:bg-primary-light hover:text-primary-dark cursor-pointer rounded-lg px-3 py-2 transition-colors"
                  >
                    My Appointments
                  </p>
                  <hr className="my-1 border-gray-100" />
                  <p
                    onClick={logout}
                    className="hover:bg-red-50 hover:text-red-500 cursor-pointer rounded-lg px-3 py-2 transition-colors"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              className="bg-accent text-white px-7 py-2.5 rounded-full font-medium text-sm hidden md:block shadow-sm hover:shadow-md hover:brightness-105 transition-all"
              onClick={() => navigate("/login")}
            >
              Create Account
            </button>
          )}
          <img
            onClick={() => setShowMenu(true)}
            src={assets.menu_icon}
            className="w-6 md:hidden"
            alt=""
          />

          {/* Mobile Menu */}
          <div
            className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
              showMenu ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            <div
              className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
                showMenu ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => setShowMenu(false)}
            />
            <div
              className={`absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl transition-transform duration-300 ${
                showMenu ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex items-center justify-between px-5 py-6 border-b border-gray-100">
                <img className="w-32" src={assets.logo} alt="" />
                <img
                  onClick={() => setShowMenu(false)}
                  className="w-6 cursor-pointer"
                  src={assets.cross_icon}
                  alt=""
                />
              </div>
              <ul className="flex flex-col gap-2 mt-6 px-4 text-base font-medium">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl transition-colors ${
                        isActive
                          ? "bg-primary text-white shadow-sm"
                          : "text-gray-600 bg-gray-50 hover:bg-gray-100"
                      }`
                    }
                    to={link.to}
                    onClick={() => setShowMenu(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
