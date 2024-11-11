import React, { useLayoutEffect, useState } from "react";
import TopSection from "../components/TopSection";
import SubjectCard from "../components/SubjectCard";
import { useSelector } from "react-redux";
import NotFound from "./NotFound";
import axios from "axios";
import { API } from "../api";
import { useParams } from "react-router-dom";
import DayWiseAnalysis from "../components/DayWiseAnalysis";

export default function DetailedAnalytics() {
  const { id } = useParams();
  const [analytics, setAnalytics] = useState([]);
  const [details, setDetails] = useState([]);

  useLayoutEffect(() => {
    const getAnalytics = async () => {
      try {
        const response = await axios.get(`${API}/attendance/s/analytics/${id}`);
        setAnalytics(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getAnalytics();
  }, [id]);

  const user = useSelector((state) => state.auth.user);

  if (user.role !== "student") {
    return <NotFound />;
  }

  const subject = {
    totalClasses: analytics ? analytics.totalClasses : 0,
    totalPresent: analytics ? analytics.totalPresent : 0,
    subject: analytics ? analytics.subject : "",
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col pl-80 items-center p-6">
      <TopSection title="Analysis" />

      <div className="w-full bg-[#F0F7FF] rounded-xl shadow-md pl-10 pr-10 pb-10 pt-4">
        <div className="flex text-3xl font-semibold justify-center items-center rounded-lg">
          Subject Breakdown
        </div>
        <div className="h-[420px] mt-6 rounded-xl shadow-md bg-white">
          <div className="p-4 w-96">
            <SubjectCard subject={subject} />
          </div>
          <p className="text-xl font-semibold pl-5">Your History</p>
          <div className="grid grid-cols-9 px-5 py-2 text-lg font-medium mt-4 border-y-2  ">
            <span className="col-span-3">Month</span>
            <span className="col-span-3 text-start">Date</span>
            <span className="col-span-3 text-start">Status</span>
          </div>
          <div className="overflow-y-scroll h-[150px] ">
            {analytics.attendanceAnalytics &&
              analytics.attendanceAnalytics.map((analytic) => (
                <DayWiseAnalysis key={analytic.id} analytic={analytic} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
