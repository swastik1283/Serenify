"use client";
import { useState,useEffect } from "react";
import DocLogin from "../DoctorLogin/page";
import Image from "next/image";
const Docdash = () => {
const[doctors,setdoctors]=useState(null);

useEffect(()=>{

    const fetchdoctor=async()=>{
        const res=await fetch("/api/auth/DoctorSession",{
           credentials:"include"
        })
        console.log(res);
        if(res.ok){
            const data= await res.json();
           setdoctors(data)
        }
       
    
    }
    fetchdoctor();
},[])

if(!doctors){
    return <p>Loading...</p>
}
    return (
        <section className="bg-[#e8d696] h-screen">
            <div className=" flex flex-row p-2 justify-between h-full ">
                <div className="flex-col items-center text-center w-[80%]  border-r border-gray-200">
                    <h1 className="bg-[#e8d696] text-black text-3xl text-center font-bold p-5">Recent Appointment</h1>
                </div>
     <div className=" flex-col items-end  w-[20%] ">

        <Image className="mx-23 mt-8" src="/assets/Doc.png" width={150} height={100} alt='docimg'/>

      <h1 className="text-2xl font-bold mb-4  mt-4  text-center text-black">Welcome Dr. {doctors.fname}</h1>
      <p><strong>Email:</strong> {doctors.email}</p>
      <p><strong>Specialization:</strong> {doctors.role}</p>
      <p><strong>Fees:</strong> {doctors.fees}</p>
      <p><strong>Metamask:</strong> {doctors.metaid}</p>
    </div>
    </div>
    </section>
  )
}

export default Docdash
