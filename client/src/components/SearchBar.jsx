import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";


export default function SearchBar() {

    const [text,setText] = useState("");

  return (
    <div className='flex gap-3 border-2 border-black p-2 rounded-md'>
      <CiSearch className='w-6 h-6'/>
      <input type="text" placeholder='Quick Search...' value={text} onChange={(e)=>setText(e.target.value)} className='outline-none border-none w-72'/>
    </div>
  )
}
