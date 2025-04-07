import React, { useState, useEffect } from "react";
import TopSection from "../components/TopSection";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [phone, setPhone] = useState(user.phone || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    // If phone or password has been edited, enable the save button
    if (phone !== user.phone || password || confirmPassword) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [phone, password, confirmPassword, user.phone]);

  const handleSave = () => {
    // Placeholder for save logic (like updating state or sending a request)
    console.log("Saving changes...");
  };

  return (
    <div className="flex min-h-screen pl-72 bg-gray-100">
      <div className="w-full p-6 lg:p-8">
        {/* Header */}
        <TopSection title="Profile" name={user.name} role={user.role} />

        {/* Profile Content */}
        <div className="bg-blue-100 p-6 rounded-lg border border-blue-300" style={{ minHeight: "70vh" }}>
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
              value={user.firstName || ""}
              disabled
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
              value={user.lastName || ""}
              disabled
            />
            <input
              type="email"
              placeholder="E-Mail"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
              value={user.email || ""}
              disabled
            />
            <input
              type="text"
              placeholder="Enrollment Number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
              value={user.enrollmentNumber || ""}
              disabled
            />
            <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

            {/* Conditionally Rendered Fields for Students */}
            {user.role === "student" && (
              <>
                <input
                  type="text"
                  placeholder="Batch"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
                  value={user.batch || ""}
                  disabled
                />
                <input
                  type="text"
                  placeholder="Year Of Study"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
                  value={user.yearOfStudy || ""}
                  disabled
                />
                <input
                  type="text"
                  placeholder="Branch Of Study"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
                  value={user.branchOfStudy || ""}
                  disabled
                />
              </>
            )}

            {/* Conditionally Rendered Fields for Teacher */}
            {user.role === "teacher" && (
              <>
                <input
                  type="text"
                  placeholder="Your Subjects"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
                  value={user.subjects || ""}
                  disabled
                />
              </>
            )}

            {/* Editable Fields */}
            <input
              type="tel"
              placeholder="+91"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:border-blue-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              disabled={!isChanged}
              className={`px-6 py-2 bg-blue-500 text-white rounded-lg ${
                !isChanged ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
              }`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
