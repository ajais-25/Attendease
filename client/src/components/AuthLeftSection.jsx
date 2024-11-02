import React from "react";
import classroom1 from "../assets/classroom1.png";

const AuthLeftSection = ({ heading, subHeading }) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center text-center mb-6 md:mb-0 md:mr-6">
      <h2 className="text-4xl font-bold text-black mb-4">{heading}</h2>
      <h3 className="text-xl font-semibold text-black">{subHeading}</h3>
      <div className="mt-8">
        <img src={classroom1} alt="Classroom Illustration" className="w-full" />
      </div>
    </div>
  );
};

export default AuthLeftSection;
