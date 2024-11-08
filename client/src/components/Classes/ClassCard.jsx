import axios from "axios";
import React, { useState } from "react";
import { API } from "../../api";

const ClassCard = ({ isTeacher, classDetails }) => {
  const formatterDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const [classActiveStatus, setClassActiveStatus] = useState(false);

  const handleAttendanceClick = async () => {
    if (isTeacher) {
      const response = await axios.put(
        `${API}/attendance/t/${classDetails._id}/active`
      );
      setClassActiveStatus(response.data.data.isActive);
    } else {
      if (!classDetails.isActive) return;
      const response = await axios.put(
        `${API}/attendance/s/${classDetails._id}/mark`
      );
    }
  };

  return (
    <div className="flex flex-col justify-around bg-green-50 p-4 rounded-md border border-gray-300 min-h-64 max-w-80 w-full">
      <h3 className="text-lg font-semibold mb-2">
        {classDetails.subject.name}
      </h3>

      {/* Batch and Date/Time */}
      <div className="flex items-center justify-between text-gray-600 text-sm mb-3">
        <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full">
          Batch {classDetails.section.branch.name}{" "}
          {classDetails.section.year + classDetails.section.section}
        </span>
      </div>
      <div className="flex justify-between items-center text-gray-600 text-sm mb-4">
        <div className="flex items-center mr-4">
          <span className="material-icons text-lg">access_time</span>
          <span className="ml-1">
            {classDetails.time.slice(0, 2) > 12
              ? classDetails.time.slice(0, 2) - 12
              : classDetails.time.slice(0, 2)}
            :{classDetails.time.slice(3)}{" "}
            {classDetails.time.slice(0, 2) >= 12 ? "PM" : "AM"}
          </span>
        </div>
        <div className="flex items-center">
          <span className="material-icons text-lg">calendar_today</span>
          <span className="ml-1">
            {formatterDate.format(new Date(classDetails.date))}
          </span>
        </div>
      </div>

      {/* Attendance Button */}
      {isTeacher && (
        <button
          className="w-full bg-black transition-all duration-300 active:scale-95 text-white py-2 rounded-md"
          onClick={handleAttendanceClick}
        >
          {classActiveStatus ? "Close Attendance" : "Start Attendance"}
        </button>
      )}

      {!isTeacher && (
        <button
          className={`${
            classDetails.isActive
              ? "bg-black transition-all duration-300 active:scale-95"
              : "bg-gray-300"
          } w-full text-white py-2 rounded-md`}
          onClick={handleAttendanceClick}
        >
          Mark Attendance
        </button>
      )}
    </div>
  );
};

export default ClassCard;
