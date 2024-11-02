import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const SubjectCard = ({ subject }) => {
  const getColor = (score) => {
    if (score >= 75) return "#4CAF50"; // Green for scores >= 75%
    if (score >= 50) return "#FFC107"; // Yellow for scores between 50% and 74%
    return "#F44336"; // Red for scores < 50%
  };

  return (
    <div
      key={subject.name}
      className="flex items-center justify-between p-4 bg-[#F0F7FF] shadow-lg rounded-lg mb-4"
    >
      <div>
        <h3 className="font-semibold text-gray-700">{subject.name}</h3>
        <p className="text-sm text-gray-500">
          {subject.attended}/{subject.total}
        </p>
      </div>
      <div className="w-16 h-16">
        <CircularProgressbar
          value={subject.score}
          text={`${subject.score}%`}
          styles={buildStyles({
            pathColor: getColor(subject.score),
            textColor: getColor(subject.score),
            trailColor: "#e0e0e0",
          })}
        />
      </div>
    </div>
  );
};

export default SubjectCard;