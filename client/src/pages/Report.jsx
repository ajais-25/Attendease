import React from 'react'
import TopSection from '../components/TopSection'
import { SlCalender } from "react-icons/sl";
import { GoClock } from "react-icons/go";

export default function Report() {

    const subject = "Software Engineering & agile Programming"
    const branch = "CST";
    const section = "2C"
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const now = new Date();
    const students = [
        { id: "TIPSGRM1012223", name: "Swapnamoy Midya", status: true },
        { id: "TIPSGRM1012223", name: "Prithvi Sen", status: true },
        { id: "TIPSGRM1012223", name: "Akshat Jaiswal", status: true },
        { id: "TIPSGRM1012223", name: "Sarthak Kumar", status: true },
        { id: "TIPSGRM1012223", name: "Souvik Kundu", status: true },
        { id: "TIPSGRM1012223", name: "Swapnamoy Midya", status: false }
    ]
    return (
        <div className='bg-gray-100 h-screen p-6'>
            <TopSection title="report" />

            <div className="p-6 bg-[#F0F7FF] shadow-md rounded-md h-[85%] ">
                <div className="flex justify-start items-center gap-10">
                    <span className='text-[#2B478B] text-3xl'>Attendance Report</span>
                    <span className='font-semibold text-3xl '>Total Students: 76</span>
                    <span className='font-semibold text-3xl text-[#11A529]'>Present: 56</span>
                </div>

                <div className="flex justify-start items-center mt-4 gap-10">
                    <span className='font-semibold'>
                        <p>{subject.slice(0, 22)}</p>
                        <p>{subject.slice(23,)}</p>
                    </span>
                    <span className='p-1 w-40 text-center text-[#989898] text-lg border-[#D3D3D3] border-2 rounded-md'>
                        Batch {branch} {section}
                    </span>
                    <span className='flex justify-center items-center gap-2 p-1 w-40 text-center text-[#989898] text-lg border-[#D3D3D3] border-2 rounded-md'>
                        <SlCalender /> {now.getDate()} {months[now.getMonth()]} {now.getFullYear()}
                    </span>
                    <span className='flex justify-center items-center gap-2 p-1 w-40 text-center text-[#989898] text-lg border-[#D3D3D3] border-2 rounded-md'>
                        <GoClock />  {now.getHours()}:{now.getMinutes()} {now.getHours() >= 12 ? "PM" : "AM"}
                    </span>
                </div>
                <div className="w-full h-16 flex justify-between pl-20 pr-60 items-center bg-[#F1F1F1] mt-4 border-2 border-[#D9D9D9]">
                    <div className="flex justify-between items-center gap-96">
                        <span className='text-lg'>Student ID</span>
                        <span className='text-lg'>Name</span>
                    </div>
                    <span className='text-lg'>Status</span>
                </div>
                <div className="overflow-y-scroll h-[60%] mt-4">
                    {students.map((std, index) => (
                        <div key={index} className="w-full h-16 flex justify-between pl-20 pr-52 items-center">
                            <div className="flex justify-between items-center gap-80">
                                <span className='text-lg'>{std.id}</span>
                                <span className='text-lg'>{std.name}</span>
                            </div>
                            {std.status ?
                                <span className='text-lg bg-[#E5FFF7] p-2 text-[#0CBC8B] rounded-md w-20 text-center h-10'>Present</span> :
                                <span className='text-lg bg-[#ede0e0] p-2 text-[#b42b2b] rounded-md w-20 text-center h-10'>Absent</span>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
