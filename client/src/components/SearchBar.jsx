import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";


export default function SearchBar() {

    const [text,setText] = useState("");

  return (
    <div className='flex justify-center items-center gap-3 border-2 border-black h-10 p-2 rounded-md'>
      <CiSearch className='w-6 h-6'/>
      <input type="text" placeholder='Quick Search...' value={text} onChange={(e)=>setText(e.target.value)} className='outline-none border-none sm:w-20 md:w-52 lg:w-72'/>
    </div>
  )
}
