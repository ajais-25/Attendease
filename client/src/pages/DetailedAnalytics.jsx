import React from 'react'
import TopSection from '../components/TopSection'
import SubjectCard from '../components/SubjectCard'


export default function DetailedAnalytics() {

  const subject = {
    totalClasses: 5,
    totalPresent: 3,
    subject: "DBMS"
  }

  const details = [
    { month: 9, date: 2, year: 2024, studentPresent: true },
    { month: 9, date: 3, year: 2024, studentPresent: false },
    { month: 9, date: 4, year: 2024, studentPresent: true },
    { month: 9, date: 4, year: 2024, studentPresent: true }
  ]

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const prefix = [
    "th",
    "st",
    "nd",
    "rd"
  ]

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col pl-80 items-center p-6">
      <TopSection title="Analysis" />

      <div className='w-full bg-[#F0F7FF] rounded-xl shadow-md pl-10 pr-10 pb-10 pt-4'>
        <div className="flex text-3xl font-semibold justify-center items-center rounded-lg">
          Subject Breakdown
        </div>
        <div className="h-[420px] mt-6 rounded-xl shadow-md bg-white">
          <div className='p-4 w-96'>
            <SubjectCard subject={subject} />
          </div>
          <p className='text-xl font-semibold pl-5'>Your History</p>
          <div className="grid grid-cols-9 px-5 py-2 text-lg font-medium mt-4 border-y-2  ">
            <span className='col-span-3'>Month</span>
            <span className='col-span-3 text-start'>Date</span>
            <span className='col-span-3 text-start'>Status</span>
          </div>
          <div className='overflow-y-scroll h-[150px] '>
            {details.map((detail, index) => (
              <div className="grid grid-cols-9 font-medium text-gray-400 px-5 py-2 text-lg mt-4">
                <span key={index} className='col-span-3 '>{months[detail.month-1]}</span>
                <span className='ml-2 col-span-3 text-start'>{detail.date}{((detail.date) % 10) <= 3 ? prefix[detail.date % 10] : "th"}</span>
                <span className='ml-2 col-span-3 text-start'>{detail.studentPresent?"Present":"Absent"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
