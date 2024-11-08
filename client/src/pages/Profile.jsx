import React from "react";
import TopSection from "../components/TopSection";

const Profile = ({ userRole }) => {
  return (
    <div className="flex min-h-screen pl-72 bg-gray-100">
      <div className="w-full p-6 lg:p-8">
        {/* Header */}
        <TopSection title="Profile" name="Swapnamoy Midya" role={userRole} />

        {/* Profile Content */}
        <div className="bg-blue-100 p-6 rounded-lg border border-blue-300">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white">
              <span className="text-2xl">👤</span>
            </div>
            <h3 className="ml-4 text-lg font-semibold">Personal Information</h3>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
            />
            <input
              type="email"
              placeholder="E-Mail"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
            />
            <input
              type="tel"
              placeholder="+91"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Enrollment Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Batch"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
            />

            {/* Conditionally Rendered Fields for Students */}
            {userRole === "Student" && (
              <>
                <input
                  type="text"
                  placeholder="Year Of Study"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Branch Of Study"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
                />
              </>
            )}
            {/* Conditionally Rendered Fields for Teacher */}
          {userRole === "Teacher" && (
            <>
      
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
              >
                <option>Choose Batch</option>
                <option>Section A</option>
                <option>Section B</option>
                <option>Section C</option>
              </select>
              <input
                type="text"
                placeholder="Your Subjects"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
              />
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
