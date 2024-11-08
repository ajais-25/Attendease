import React, { useLayoutEffect, useState } from "react";
import ClassCard from "../components/Classes/ClassCard";
import AddClassForm from "../components/Classes/AddClassForm";
import TopSection from "../components/TopSection";
import axios from "axios";
import { API } from "../api";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";


const Classes = () => {
  const [displayForm, setDisplayForm] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [change, setChange] = useState(false);
  let suffix = "/s/student";

  const user = useSelector((state) => state.auth.user);

  useLayoutEffect(() => {
    if (user && user.role === "teacher") {
      setIsTeacher(true);
      suffix = "/t/incomplete";
    }

    const getClasses = async () => {
      try {
        const response = await axios.get(`${API}/attendance${suffix}`);
        setClasses(response.data.data);
      } catch (error) {
        console.log("Error fetching classes: ", error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getClasses();
  }, [change]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      

      {/* Main content */}
      <div className="flex flex-col flex-1 items-center p-10">
        <TopSection title="Classes" />

        <div className="w-full bg-white p-6 rounded-md shadow-md">
          <h2 className="text-3xl font-semibold text-blue-600 mb-4">Classes</h2>

          <div className="mb-4 flex gap-4 items-center">
            <span className="inline-block bg-gray-300 cursor-pointer text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
              Scheduled Classes
            </span>
            {/* Should only be for teacher, remove while integration */}
            {isTeacher && (
              <button
                className="text-white px-4 py-2 flex justify-center items-center gap-2 transition-all duration-300 bg-primary-600 hover:bg-primary-700 active:scale-95 rounded-md"
                onClick={() => setDisplayForm(true)}
              >
                <i className="fa-solid fa-plus"></i>
                Add Class
              </button>
            )}
          </div>

          {loading && <Loading />}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-y-6 gap-x-2">
            {classes.map((classDetails) => (
              <ClassCard
                key={classDetails._id}
                isTeacher={isTeacher}
                classDetails={classDetails}
              />
            ))}
          </div>
        </div>
        <AddClassForm
          displayForm={displayForm}
          setDisplayForm={setDisplayForm}
          setChange={setChange}
        />
      </div>
    </div>
  );
};

export default Classes;
