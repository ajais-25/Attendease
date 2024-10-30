import React, { useState } from "react";
import ClassCard from "../components/Classes/ClassCard";
import AddClassForm from "../components/Classes/AddClassForm";

const Classes = () => {
  const [displayForm, setDisplayForm] = useState(false);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-10">
      <div className="flex justify-between w-full bg-white p-4 rounded-md shadow-md mb-6">
        <h1 className="text-lg font-semibold">Classes</h1>
        <div className="text-right">
          <p>Swapnamoy Midya</p>
          <span className="text-gray-500 text-sm">Student</span>
        </div>
      </div>

      <div className="w-full bg-white p-6 rounded-md shadow-md">
        <h2 className="text-3xl font-semibold text-blue-600 mb-4">Classes</h2>

        <div className="mb-4 flex gap-4 items-center">
          <span className="inline-block bg-gray-300 cursor-pointer text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
            Scheduled Classes
          </span>
          {/* Should only be for teacher, remove while integration */}
          <button
            className="text-white px-4 py-2 flex justify-center items-center gap-2 transition-all duration-300 bg-primary-600 hover:bg-primary-700 active:scale-95 rounded-md"
            onClick={() => setDisplayForm(true)}
          >
            <i className="fa-solid fa-plus"></i>
            Add Class
          </button>
        </div>

        <div className="grid grid-cols-4 gap-y-6 gap-x-2">
          <ClassCard isTeacher={true} />
          <ClassCard isTeacher={true} />
          <ClassCard isTeacher={true} />
          <ClassCard isTeacher={true} />
          <ClassCard isTeacher={true} />
          <ClassCard isTeacher={true} />
        </div>
      </div>
      <AddClassForm displayForm={displayForm} setDisplayForm={setDisplayForm} />
    </div>
  );
};

export default Classes;
