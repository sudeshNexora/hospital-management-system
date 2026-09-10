import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext.jsx";
import {
  LuLayoutDashboard,
  LuCalendarCheck,
  LuUserPlus,
  LuUsers,
  LuUserCircle,
} from "react-icons/lu";

const linkClass = ({ isActive }) =>
  `group flex items-center gap-3 py-3 px-3 md:px-5 md:min-w-64 mx-2 md:mx-3 my-0.5 rounded-xl cursor-pointer transition-all duration-200 ${
    isActive
      ? "bg-primary text-white shadow-sm"
      : "text-gray-500 hover:bg-primary-light hover:text-primary-dark"
  }`;

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className="min-h-screen bg-white border-r border-gray-100">
      {aToken && (
        <div className="mt-6">
          <p className="hidden md:block text-xs font-semibold uppercase tracking-wider text-gray-400 px-6 mb-2">
            Admin Panel
          </p>
          <ul>
            <NavLink className={linkClass} to={"/"} end>
              <LuLayoutDashboard size={19} />
              <p className="hidden md:block text-sm font-medium">
                Dashboard
              </p>
            </NavLink>
            <NavLink className={linkClass} to={"/all-appointments"}>
              <LuCalendarCheck size={19} />
              <p className="hidden md:block text-sm font-medium">
                Appointments
              </p>
            </NavLink>
            <NavLink className={linkClass} to={"/add-doctor"}>
              <LuUserPlus size={19} />
              <p className="hidden md:block text-sm font-medium">
                Add Doctor
              </p>
            </NavLink>
            <NavLink className={linkClass} to={"/doctors-list"}>
              <LuUsers size={19} />
              <p className="hidden md:block text-sm font-medium">
                Doctors List
              </p>
            </NavLink>
          </ul>
        </div>
      )}
      {dToken && (
        <div className="mt-6">
          <p className="hidden md:block text-xs font-semibold uppercase tracking-wider text-gray-400 px-6 mb-2">
            Doctor Panel
          </p>
          <ul>
            <NavLink end className={linkClass} to={"/doctor/"}>
              <LuLayoutDashboard size={19} />
              <p className="hidden md:block text-sm font-medium">
                Dashboard
              </p>
            </NavLink>
            <NavLink className={linkClass} to={"/doctor/appointments"}>
              <LuCalendarCheck size={19} />
              <p className="hidden md:block text-sm font-medium">
                Appointments
              </p>
            </NavLink>
            <NavLink className={linkClass} to={"/doctor/profile"}>
              <LuUserCircle size={19} />
              <p className="hidden md:block text-sm font-medium">Profile</p>
            </NavLink>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
