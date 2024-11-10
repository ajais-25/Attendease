import React from 'react'
import TopSection from '../components/TopSection'

export default function StudentList() {

  const students = [
    { id: "TIPSGRM1012223", name: "Swapnamoy Midya", batch: "CST", section: "2C" },
    { id: "TIPSGRM1012223", name: "Prithvi Sen", batch: "CST", section: "2C" },
    { id: "TIPSGRM1012223", name: "Akshat Jaiswal", batch: "CST", section: "2C" },
    { id: "TIPSGRM1012223", name: "Sarthak Kumar", batch: "CST", section: "2C" },
    { id: "TIPSGRM1012223", name: "Souvik Kundu", batch: "CST", section: "2C" },
    { id: "TIPSGRM1012223", name: "Swapnamoy Midya", batch: "CST", section: "2C" },
    { id: "TIPSGRM1012223", name: "Sarthak Kumar", batch: "CST", section: "2C" },
    { id: "TIPSGRM1012223", name: "Souvik Kundu", batch: "CST", section: "2C" },
    { id: "TIPSGRM1012223", name: "Sarthak Kumar", batch: "CST", section: "2C" },
    { id: "TIPSGRM1012223", name: "Souvik Kundu", batch: "CST", section: "2C" },
    { id: "TIPSGRM1012223", name: "Swapnamoy Midya", batch: "CST", section: "2C" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col pl-80 items-center p-6">
      <TopSection title="report" />

      <div className="w-full bg-[#F0F7FF] shadow-md p-5">
        <div className="w-40 p-2 text-center rounded-md text-2xl font-semibold bg-blue-800">
          Student List
        </div>
        <div className="w-full bg-[#F1F1F1] grid grid-cols-10 my-4 p-2 border-[#D9D9D9] border-2">
          <span className='text-xl text-center col-span-3'>Student ID</span>
          <span className='text-xl text-center col-span-4'>Student Name</span>
          <span className='text-xl text-center col-span-3'>Batch</span>
        </div>

        <div className="overflow-y-scroll h-[330px]">
          {students.map((student, index) => (
            <div className="w-full grid grid-cols-10 my-4 p-2">
              <span className='text-lg text-center col-span-3'>{student.id}</span>
              <span className='text-lg pl-6 text-center col-span-4'>{student.name}</span>
              <span className='text-lg pl-6 text-center col-span-3'>{student.batch} {student.section}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
