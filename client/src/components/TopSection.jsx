import React from "react";

const TopSection = ({ title, name, role }) => {
  return (
    <div className="flex justify-between w-full bg-white p-4 rounded-md shadow-md mb-6">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="text-right">
        <p>{name}</p>
        <span className="text-gray-500 text-sm">{role}</span>
      </div>
    </div>
  );
};

export default TopSection;
