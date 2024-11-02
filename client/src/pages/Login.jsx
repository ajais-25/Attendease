import React from "react";
import classroom1 from "../assets/classroom1.png";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center">
      <div className="bg-[#0052B499] rounded-lg shadow-lg flex flex-col items-center md:flex-row w-full p-6 md:p-10">
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center items-center text-center mb-6 md:mb-0 md:mr-6">
          <h2 className="text-4xl font-bold text-black mb-4">Welcome back!</h2>
          <h3 className="text-xl font-semibold text-black">
            Sign In to Attendease
          </h3>
          <div className="mt-8">
            <img
              src={classroom1} // Replace with your actual illustration URL
              alt="Classroom Illustration"
              className="w-full"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold text-black mb-6">
            Select Your Role
          </h2>

          {/* Role Selection */}
          <div className="flex justify-center mb-4 space-x-4">
            <label className="flex items-center space-x-2">
              <input type="radio" name="role" className="focus:" />
              <span className="font-medium">Student</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="role" />
              <span className="font-medium">Teacher</span>
            </label>
            <label
              className="flex items-center space-x-2"
              onClick={() => navigate("/admin")}
            >
              <input type="radio" name="role" />
              <span className="font-medium">Admin</span>
            </label>
          </div>

          {/* Input Fields */}
          <div className="w-full max-w-xs mb-4">
            <input
              type="text"
              placeholder="Enrollment No."
              className="w-full p-3 rounded-lg bg-[#3D70F5] text-white placeholder-white focus:outline-none"
            />
          </div>
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
              to="/signup"
              className="text-red-600 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;