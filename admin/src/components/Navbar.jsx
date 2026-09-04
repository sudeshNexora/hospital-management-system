import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    dToken && setDToken("");
    aToken && localStorage.removeItem("aToken");
    dToken && localStorage.removeItem("dToken");
  };
  return (
    <div className="flex justify-between items-center px-4 sm:px-10 py-3 border-b border-gray-100 bg-white/90 backdrop-blur-md sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-3">
        <img
          src={assets.admin_logo}
          alt=""
          className="w-32 sm:w-36 cursor-pointer"
        />
        <p className="border border-primary-light bg-primary-light px-3 py-1 rounded-full text-xs font-medium text-primary-dark">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        className="bg-primary text-white text-sm px-8 py-2.5 rounded-full font-medium shadow-sm hover:bg-primary-dark hover:shadow-md transition-all"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
