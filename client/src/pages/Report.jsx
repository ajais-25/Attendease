import React from 'react'
import TopSection from '../components/TopSection'

export default function Report() {
    return (
        <div className='bg-gray-100 min-h-screen p-6'>
            <TopSection title="report" />

            <div className="p-4 bg-[#F0F7FF] shadow-md rounded-md">
                <div className="flex gap-10">
                    <span className='text-[#2B478B] text-2xl'>Attendance Report</span>
                    <span className='font-semibold text-2xl '>Total Students: </span>
                    <span className='font-semibold text-2xl text-[#11A529]'>Present: </span>
                </div>

                <div className="">
                    
                </div>
            </div>
        </div>
    )
}
