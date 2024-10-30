import React, { useState } from "react";

const AddClassForm = ({ displayForm, setDisplayForm }) => {
  const [batch, setBatch] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic
    console.log({ batch, subject, date });
    setBatch("");
    setSubject("");
    setDate("");
  };

  return (
    <div className="flex items-center w-96 justify-center bg-opacity-50 fixed top-[25%]">
      {displayForm && (
        <div className="bg-white p-6 py-10 rounded-lg shadow-lg w-full relative">
          <div
            className="absolute top-2 right-4 text-lg cursor-pointer"
            onClick={() => setDisplayForm(false)}
          >
            X
          </div>
          <h2 className="text-2xl font-semibold text-center mb-4">
            Add New Class
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Batch Dropdown */}
            <div>
              <select
                value={batch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full p-3 border rounded-md cursor-pointer border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Batch</option>
                <option value="CST 3A">CST 3A</option>
                <option value="CST 3A">CST 3B</option>
                <option value="CST 2C">CST 3C</option>
                {/* Add more options as needed */}
              </select>
            </div>

            {/* Subject Dropdown */}
            <div>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-3 border rounded-md border-gray-300 focus:outline-none cursor-pointer focus:border-blue-500"
              >
                <option value="">Select Subject</option>
                <option value="Software Engineering">AIML</option>
                <option value="Agile Programming">DBMS</option>
                {/* Add more options as needed */}
              </select>
            </div>

            {/* Date Picker */}
            <input
              className="w-full"
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Add Class
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddClassForm;
