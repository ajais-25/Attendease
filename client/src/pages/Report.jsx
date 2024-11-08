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
        { id: "TIPSGRM1012223", name: "Swapnamoy Midya" },
        { id: "TIPSGRM1012223", name: "Prithvi Sen"},
        { id: "TIPSGRM1012223", name: "Akshat Jaiswal"},
        { id: "TIPSGRM1012223", name: "Sarthak Kumar"},
        { id: "TIPSGRM1012223", name: "Souvik Kundu" },
        { id: "TIPSGRM1012223", name: "Swapnamoy Midya"}
    ]
    return (
        <div className='bg-gray-100 min-h-screen flex flex-col justify-center items-center  p-6'>
            <TopSection title="report" />

            <div className="p-6 bg-[#F0F7FF] shadow-md rounded-md md:h-[530px]">
                <div className="flex flex-col md:flex-row justify-start items-center gap-10">
                    <span className='text-[#2B478B] text-3xl'>Attendance Report</span>
                    <span className='font-semibold text-3xl '>Total Students: 76</span>
                    <span className='font-semibold text-3xl text-[#11A529]'>Present: 56</span>
                </div>

                <div className="flex flex-col md:flex-row justify-start items-center mt-4 gap-10">
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
                <div className="sm:w-[700px] md:w-full h-10 grid grid-cols-5 bg-[#F1F1F1] mt-4 border-2 border-[#D9D9D9]">
                    <span className='col-span-2 text-center sm:text-sm md:text-lg'>Student ID</span>
                    <span className='col-span-2 text-center sm:text-sm md:text-lg'>Name</span>
                    <span className='col-span-1 sm:text-sm md:text-lg rounded-md  text-center h-10'>Status</span>
                </div>
                <div className="overflow-y-scroll md:w-full sm:overflow-x-scroll lg:overflow-x-hidden md:h-[300px] mt-4">
                    {students.map((std, index) => (
                        <div key={index} className="grid grid-cols-5 h-16 ">
                            <span className='col-span-2 sm:text-sm md:text-lg text-center'>{std.id}</span>
                            <span className='col-span-2 sm:text-sm md:text-lg text-center'>{std.name}</span>
                            <span className='col-span-1 sm:text-sm md:text-lg bg-[#E5FFF7] p-2 text-[#0CBC8B] rounded-md text-center h-10'>Present</span> 
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
