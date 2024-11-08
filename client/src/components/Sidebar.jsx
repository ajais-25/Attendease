import React, { useState } from "react";
import logo from "../assets/logo.png";

import {
  FaTimes,
  FaBars,
  FaChartLine,
  FaUserCircle,
  FaSignOutAlt,
  FaList,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full ${
        isOpen ? "w-[270px]" : "w-[70px]"
      } bg-[#4B60AB] px-4 py-6 shadow-md z-[1000] flex flex-col rounded-r-md transition-all duration-300`}
    >
      {/* Close/Open Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Header Section */}
      <div
        className={`flex items-center gap-4 mb-8 mt-10 ${
          isOpen ? "" : "justify-center"
        }`}
      >
        <div className="nav_image flex justify-center min-w-[55px]">
          <img
            src={logo}
            alt="Profile"
            className="h-[45px] w-[45px] rounded-full object-cover"
          />
        </div>
        {isOpen && (
          <span className="logo_name text-[22px] font-semibold text-black">
            Attendease
          </span>
        )}
      </div>

      <div className="menu_container flex flex-col justify-between h-[calc(100%-140px)]">
        <ul className="flex flex-col gap-6">
          <li className="item">
            <a
              href="#"
              className="link flex items-center gap-4 px-4 py-2 text-white text-lg rounded-full bg-[#E0E7FF] hover:bg-[#D1D5DB] transition-all"
            >
              <i className="text-xl">
                <FaChartLine />
              </i>
              {isOpen && <span className="whitespace-nowrap">Dashboard</span>}
            </a>
          </li>
          <li className="item">
            <a
              href="#"
              className="link flex items-center gap-4 px-4 py-2 text-[#D1D5DB] text-lg hover:text-black hover:bg-[#E0E7FF] rounded-full transition-all"
            >
              <i className="text-xl">
                <FaList />
              </i>
              {isOpen && <span className="whitespace-nowrap">Classes</span>}
            </a>
          </li>
          <li className="item">
            <a
              href="#"
              className="link flex items-center gap-4 px-4 py-2 text-[#D1D5DB] text-lg hover:text-black hover:bg-[#E0E7FF] rounded-full transition-all"
            >
              <i className="text-xl">
                <FaChartLine />
              </i>
              {isOpen && <span className="whitespace-nowrap">Analytics</span>}
            </a>
          </li>
          <li className="item">
            <a
              href="#"
              className="link flex items-center gap-4 px-4 py-2 text-[#D1D5DB] text-lg hover:text-black hover:bg-[#E0E7FF] rounded-full transition-all"
            >
              <i className="text-xl">
                <FaUserCircle />
              </i>
              {isOpen && <span className="whitespace-nowrap">My Profile</span>}
            </a>
          </li>
        </ul>

        {/* Sign Out Section */}
        <div
          className={`flex items-center gap-4 mt-auto px-5 py-1 text-[#F97316] text-lg hover:text-white hover:bg-[#F97316] rounded-full transition-all cursor-pointer ${
            isOpen ? "justify-start" : "justify-center"
          }`}
        >
          <FaSignOutAlt className="text-xl" />
          {isOpen && <span>Sign Out</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
