"use client";
import React from 'react'
import { useRouter } from 'next/navigation';
const Page = () => {
const router=useRouter();
    return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#F7F7F7] to-[#E5E5E5]">
    <div className="flex flex-row w-50 h-30 bg-white">
        <div className="flex-col w-10 h-10 p-5">
           <button onClick={router.push('/Register')}> Client</button>
        </div>
    </div>

     <div className="flex flex-row w-20 h-30 bg-white">
        <div className="flex-col w-10 h-10 p-5">
           <button onClick={router.push('/DocRegister')}> doc</button>
        </div>
    </div>
</div>
  )
}

export default Page


