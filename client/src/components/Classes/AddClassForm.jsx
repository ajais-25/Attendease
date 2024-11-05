import axios from "axios";
import React, { useEffect, useState } from "react";
import { API } from "../../api";

const AddClassForm = ({ displayForm, setDisplayForm }) => {
  const [batch, setBatch] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [teacherSubjects, setTeacherSubjects] = useState([]);
  const [teacherSections, setTeacherSections] = useState([]);

  const getTeacherSubjects = async () => {
    try {
      const response = await axios.get(`${API}/subject/teacher-subjects`);
      setTeacherSubjects(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTeacherSections = async () => {
    try {
      const response = await axios.get(`${API}/section/teacher-sections`);
      setTeacherSections(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTeacherSubjects();
    getTeacherSections();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API}/attendance/create`, {
        section: batch,
        subject,
        date,
        time,
      });
      console.log(response.data);
      setDisplayForm(false);
    } catch (error) {
      console.log(error);
    }

    setBatch("");
    setSubject("");
    setDate("");
    setTime("");
  };

  return (
    <div className="flex items-center w-96 justify-center bg-opacity-50 fixed top-[25%]">
      {displayForm && (
        <div className="bg-white p-6 py-10 rounded-lg shadow-lg w-full relative">
          <div
            className="absolute top-2 right-4 text-lg cursor-pointer hover:bg-gray-300 px-2 rounded-md"
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
                {teacherSections.map((section) => (
                  <option key={section._id} value={section._id}>
                    {section.branch} {section.year}
                    {section.section}
                  </option>
                ))}
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
                {teacherSubjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Picker */}
            <div className="flex gap-4 justify-between items-center">
              <input
                className="w-full border p-3 rounded-md border-gray-300 focus:outline-none focus:border-blue-500 cursor-pointer"
                type="date"
                name="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                className="w-full border p-3 rounded-md border-gray-300 focus:outline-none focus:border-blue-500 cursor-pointer"
                type="time"
                name="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

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
