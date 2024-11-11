import React from "react";
import { useSelector } from "react-redux";

const DayWiseAnalysis = ({ analytic }) => {
  const user = useSelector((state) => state.auth.user);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const prefix = ["th", "st", "nd", "rd"];

  const detail = {
    month: new Date(analytic.date).getMonth() + 1,
    date: new Date(analytic.date).getDate(),
    year: new Date(analytic.date).getFullYear(),
    studentPresent: analytic.studentsPresent.includes(user._id),
  };

  return (
    <div className="grid grid-cols-9 font-medium text-gray-400 px-5 py-2 text-lg mt-4">
      <span className="col-span-3 ">{months[detail.month - 1]}</span>
      <span className="ml-2 col-span-3 text-start">
        {detail.date}
        {detail.date % 10 <= 3 ? prefix[detail.date % 10] : "th"}
      </span>
      <span className="ml-2 col-span-3 text-start">
        {detail.studentPresent ? "Present" : "Absent"}
      </span>
    </div>
  );
};

export default DayWiseAnalysis;
