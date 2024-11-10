import React from "react";
import TopSection from "../components/TopSection";
import { SlCalender } from "react-icons/sl";
import { GoClock } from "react-icons/go";
import { useSelector } from "react-redux";
import NotFound from "./NotFound";

export default function Report() {
  const user = useSelector((state) => state.auth.user);

  if (user.role !== "teacher") {
    return <NotFound />;
  }

  const subject = "Software Engineering & Agile Programming";
  const branch = "CST";
  const section = "2C";
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const now = new Date();
  const students = [
    { id: "TIPSGRM1012223", name: "Swapnamoy Midya", batch:"CST", section:"2C" },
    { id: "TIPSGRM1012223", name: "Prithvi Sen" ,batch:"CST", section:"2C" },
    { id: "TIPSGRM1012223", name: "Akshat Jaiswal",batch:"CST", section:"2C" },
    { id: "TIPSGRM1012223", name: "Sarthak Kumar" ,batch:"CST", section:"2C" },
    { id: "TIPSGRM1012223", name: "Souvik Kundu" ,batch:"CST", section:"2C"},
    { id: "TIPSGRM1012223", name: "Swapnamoy Midya" ,batch:"CST", section:"2C"},
    { id: "TIPSGRM1012223", name: "Sarthak Kumar" ,batch:"CST", section:"2C"},
    { id: "TIPSGRM1012223", name: "Souvik Kundu" ,batch:"CST", section:"2C" },
    { id: "TIPSGRM1012223", name: "Sarthak Kumar" ,batch:"CST", section:"2C"},
    { id: "TIPSGRM1012223", name: "Souvik Kundu" ,batch:"CST", section:"2C"},
    { id: "TIPSGRM1012223", name: "Swapnamoy Midya" ,batch:"CST", section:"2C"},
  ];
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col pl-80 items-center p-6">
      <TopSection title="report" />

      <div className="sm:p-2 md:p-6 w-full bg-[#F0F7FF] shadow-md rounded-md lg:h-[530px]">
        <div className="flex flex-col md:flex-row justify-start items-center gap-10">
          <span className="text-[#2B478B] text-3xl">Attendance Report</span>
          <span className="font-semibold text-3xl ">Total Students: 76</span>
          <span className="font-semibold text-3xl text-[#11A529]">
            Present: 56
          </span>
        </div>

        <div className="flex flex-col md:flex-row justify-start items-center mt-4 gap-10">
          <span className="font-semibold w-44">
            <p>{subject}</p>
          </span>
          <span className="p-1 w-40 text-center text-[#989898] text-lg border-[#D3D3D3] border-2 rounded-md">
            Batch {branch} {section}
          </span>
          <span className="flex justify-center items-center gap-2 p-1 w-40 text-center text-[#989898] text-lg border-[#D3D3D3] border-2 rounded-md">
            <SlCalender /> {now.getDate()} {months[now.getMonth()]}{" "}
            {now.getFullYear()}
          </span>
          <span className="flex justify-center items-center gap-2 p-1 w-40 text-center text-[#989898] text-lg border-[#D3D3D3] border-2 rounded-md">
            <GoClock /> {now.getHours()}:{now.getMinutes()}{" "}
            {now.getHours() >= 12 ? "PM" : "AM"}
          </span>
        </div>
        <div className="overflow-hidden border-[#D9D9D9] mt-6 rounded-md">
          <table className="min-w-full">
            <tbody>
              <tr className="bg-[#F1F1F1]">
                <td className="py-2 px-4 w-60 font-bold">Student ID</td>
                <td className="py-2 px-4 font-bold">Name</td>
                <td className="py-2 px-3 w-40 font-bold">Status</td>
              </tr>
            </tbody>
          </table>

          {/* Scrollable Table Body */}
          <div className="h-64 overflow-y-auto">
            <table className="min-w-full bg-white">
              <tbody>
                {students.map((student, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-4 w-60">{student.id}</td>
                    <td className="py-2 px-4">{student.name}</td>
                    <td className="py-2 px-4 w-40">
                      <span className="px-2 py-1 bg-green-100 text-green-600 rounded">
                        Present
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
