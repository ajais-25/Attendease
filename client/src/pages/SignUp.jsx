import React, { useState } from "react";
import AuthLeftSection from "../components/AuthLeftSection";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [role, setRole] = useState("student");

  return (
    <div className="min-h-screen flex justify-center">
      <div className="bg-[#0052B499] flex flex-col items-center md:flex-row w-full p-6 md:p-10">
        {/* Left Section */}
        <AuthLeftSection
          heading="Hello there 👋"
          subHeading="Sign Up to Attendease"
        />

        {/* Right Section */}
        <div className="flex-1 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-black mb-6">
            Select Your Role
          </h2>

          {/* Role Selection */}
          <div className="flex justify-center mb-4 space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value={role}
                onClick={() => setRole("student")}
              />
              <span className="font-medium">Student</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value={role}
                onClick={() => setRole("teacher")}
              />
              <span className="font-medium">Teacher</span>
            </label>
          </div>

          {/* Input Fields */}
          <div className="w-full max-w-xs mb-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 rounded-lg bg-[#3D70F5] text-white placeholder-white focus:outline-none"
            />
          </div>
          <div className="w-full max-w-xs mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-[#3D70F5] text-white placeholder-white focus:outline-none"
            />
          </div>
          <div className="w-full max-w-xs mb-4">
            <input
              type="text"
              placeholder="Enrollment No."
              className="w-full p-3 rounded-lg bg-[#3D70F5] text-white placeholder-white focus:outline-none"
            />
          </div>
          <div className="w-full max-w-xs mb-4">
            <select
              name="batch"
              id="batch"
              className="w-full p-3 rounded-lg bg-[#3D70F5] text-white placeholder-white focus:outline-none"
            >
              <option value="branch">Select Branch</option>
              <option value="CST">CST</option>
              <option value="CSIT">CSIT</option>
            </select>
          </div>
          {role === "student" && (
            <div className="w-full max-w-xs mb-4">
              <select
                name="section"
                id="section"
                className="w-full p-3 rounded-lg bg-[#3D70F5] text-white placeholder-white focus:outline-none"
              >
                <option value="section">Select Section</option>
                <option value="CST3A">CST3A</option>
                <option value="CST3B">CST3B</option>
                <option value="CST3C">CST3C</option>
              </select>
            </div>
          )}
          {role === "student" && (
            <div className="w-full max-w-xs mb-4">
              <input
                type="number"
                min="1"
                max="8"
                placeholder="Semeseter"
                className="w-full p-3 rounded-lg bg-[#3D70F5] text-white placeholder-white focus:outline-none"
              />
            </div>
          )}
          <div className="w-full max-w-xs mb-6">
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full p-3 rounded-lg bg-[#3D70F5] text-white placeholder-white focus:outline-none"
            />
          </div>

          {/* Proceed Button */}
          <button className="w-full max-w-xs bg-[#3D70F5] text-white font-semibold py-3 rounded-lg shadow-md hover:bg-[#4875d1] transition duration-300">
            Proceed
          </button>

          {/* Sign Up Link */}
          <p className="mt-4 text-sm text-gray-600">
            Do not have an account?{" "}
            <Link
              to="/login"
              className="text-red-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
