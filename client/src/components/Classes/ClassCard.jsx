import React from "react";

const ClassCard = ({ isTeacher }) => {
  return (
    <div className="flex flex-col justify-around bg-green-50 p-4 rounded-md border border-gray-300 min-h-64 max-w-80 w-full">
      <h3 className="text-lg font-semibold mb-2">
        Software Engineering and Agile Programming
      </h3>

      {/* Batch and Date/Time */}
      <div className="flex items-center justify-between text-gray-600 text-sm mb-3">
        <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
          Batch CST 2C
        </span>
      </div>
      <div className="flex justify-between items-center text-gray-600 text-sm mb-4">
        <div className="flex items-center mr-4">
          <span className="material-icons text-lg">access_time</span>
          <span className="ml-1">01:40 PM</span>
        </div>
        <div className="flex items-center">
          <span className="material-icons text-lg">calendar_today</span>
          <span className="ml-1">15 Mar 2024</span>
        </div>
      </div>

      {/* Attendance Button */}
      <button className="w-full bg-black transition-all duration-300 active:scale-95 text-white py-2 rounded-md">
        {isTeacher ? "Take Attendance" : "Give Attendance"}
      </button>
    </div>
  );
};

export default ClassCard;
