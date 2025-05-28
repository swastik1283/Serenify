"use client";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import React from 'react'

const Page = () => {
    const[channelName,setChannelName]=useState();
    const[userName,setUserName]=useState();
    const router=useRouter();
    const onCallClick=()=>{
      const query=new URLSearchParams({
        channelName,
        userName
      }
      ).toString();
            router.push('/call?'+query)
    }
  return (
   
    <div className="flex flex-col justify-start items-center m-auto p-8 h-screen bg-black">
       <div className="flex flex-col ">
        <h1 className="text-3xl mb-2 font-bold text-white"> 
            Welcome to the  conference room
        </h1>

         
        <div className="flex flex-col w-100 mb-2 mt-4">
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             id="channelName" value={channelName} onChange={(e)=>setChannelName(e.target.value)}placeholder='channel name'/>    
        </div>

        <div className="flex flex-col w-100 mt-2">
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " id="channelName" value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder="Enter your name" required/>
    </div>
 <div className="flex flex-col w-50 ">
    <button type="button" className="text-white mt-4 ml- bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{onCallClick()}}>Join</button>
  </div>
  <div className="flex flex-col  ">
    <h2 className="text-xl mt-2 font-bold text-white"> 
         Note: Kindly use the doctor fees as the Channel name
        </h2>
    </div>  
  </div>
  
    </div>
    
  )
}

export default Page