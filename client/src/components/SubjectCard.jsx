import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SubjectCard = ({ subject }) => {
  const getColor = (score) => {
    if (score >= 75) return "#4CAF50"; // Green for scores >= 75%
    if (score >= 50) return "#FFC107"; // Yellow for scores between 50% and 74%
    return "#F44336"; // Red for scores < 50%
  };

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const attendancePercentage =
    Math.round((subject.totalPresent / subject.totalClasses) * 1000) / 10;

  const handleClick = () => {
    if (user.role === "student") navigate(`/analytics/${subject._id}`);
    else return;
  };

  return (
    <div
      key={subject.name}
      className={`${
        user.role === "student" ? "cursor-pointer" : ""
      } flex items-center justify-between p-4 bg-[#F0F7FF] shadow-lg rounded-lg mb-4`}
      onClick={handleClick}
    >
      <div>
        <h3 className="font-semibold text-gray-700">{subject.subject}</h3>
        <p className="text-sm text-gray-500">
          {subject.totalPresent}/{subject.totalClasses}
        </p>
      </div>
      <div className="w-16 h-16">
        <CircularProgressbar
          value={attendancePercentage}
          text={`${attendancePercentage}%`}
          styles={buildStyles({
            pathColor: getColor(attendancePercentage),
            textColor: getColor(attendancePercentage),
            trailColor: "#e0e0e0",
          })}
        />
      </div>
    </div>
  );
};

export default SubjectCard;
