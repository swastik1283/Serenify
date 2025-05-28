"use client";
import { useState,useEffect } from "react";
import DocLogin from "../DoctorLogin/page";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Docdash = () => {
const[doctors,setdoctors]=useState(null);
const route=useRouter();
useEffect(()=>{
  const fetchDoctor = async () => {
    try {
      const res = await fetch("/api/auth/DoctorSession", {
        method: "GET",
        credentials: "include", // ✅ this sends cookies
      });

      if (!res.ok) {
        console.error("❌ Failed to fetch doctor");
        return;
      }

      const { data } = await res.json();
      setdoctors(data);
    } catch (err) {
      console.error("Error fetching doctor", err);
    }
  };

  fetchDoctor();
}, []);

if(!doctors){
   
    return <p>Loading...</p>
}
    return (
        <section className="bg-[#e8d696] h-screen">
            <div className=" flex flex-row p-2 justify-between h-full ">
                <div className="flex-col items-center text-center w-[80%]  border-r border-gray-200">
                    <h1 className="bg-[#e8d696] text-black text-3xl text-center font-bold p-5">Recent Appointment</h1>
                 <button className="mt-5 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={()=>route.push('/client')}>Join Your Room </button>
                </div>
     <div className=" flex-col items-end  w-[20%] ">

        <Image className="mx-23 mt-8" src="/assets/Doc.png" width={150} height={100} alt='docimg'/>

      <h1 className="text-2xl font-bold mb-4  mt-4  text-center text-black">Welcome Dr. {doctors.fname}</h1>
    <div className=" font-bold mb-4  mt-4  text-center text-black">  <p><strong>Email:</strong> {doctors.email}</p>
      <p><strong>Specialization:</strong> {doctors.role}</p>
      <p><strong>Fees:</strong> {doctors.fees}</p>
      <p><strong>Metamask:</strong> {doctors.metaid}</p>
    </div>
    </div>
    </div>
    </section>
  )
}

export default Docdash
