import React from "react";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

const TopSection = ({ title }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex justify-between w-full bg-white p-4 rounded-md shadow-md mb-6">
      {title === "report" ? <>
        <div className="text-left">
          <p className="sm:text-sm md:text-xl">{user && user.name}</p>
          <span className="text-gray-500 text-sm">
            {user && user.role.slice(0, 1).toUpperCase() + user.role.slice(1)}
          </span>
        </div>
        <SearchBar/>
      </>
        : <><h1 className="text-lg font-semibold">{title}</h1>
          <div className="text-right">
            <p>{user && user.name}</p>
            <span className="text-gray-500 text-sm">
              {user && user.role.slice(0, 1).toUpperCase() + user.role.slice(1)}
            </span>
          </div></>}
    </div>
  );
};

export default TopSection;
