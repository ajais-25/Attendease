import React, { useLayoutEffect, useState } from "react";
import TopSection from "../components/TopSection";
import SubjectCard from "../components/SubjectCard";
import axios from "axios";
import { API } from "../api.js";
import Loading from "../components/Loading";

const Analytics = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const getAnalytics = async () => {
      try {
        const response = await axios.get(`${API}/attendance/s/analytics`);
        setSubjects(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getAnalytics();
  }, []);

  return (
    <div className="min-h-screen pl-80 bg-gray-100 p-6">
      <TopSection title="Analytics" name="Swapnamoy Midya" role="Student" />

      <div className="mt-6 text-center">
        <h2 className="text-2xl font-semibold">Subject Breakdown</h2>
      </div>

      {loading && <Loading />}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((subject) => (
          <SubjectCard key={subject._id} subject={subject} />
        ))}
      </div>
    </div>
  );
};

export default Analytics;
