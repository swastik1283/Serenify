"use client";
import { useState,useEffect } from "react";
import DocLogin from "../DoctorLogin/page";
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
     <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome Dr. {doctors.fname}</h1>
      <p><strong>Email:</strong> {doctors.email}</p>
      <p><strong>Specialization:</strong> {doctors.role}</p>
      <p><strong>Fees:</strong> {doctors.fees}</p>
      <p><strong>Metamask:</strong> {doctors.metaid}</p>
    </div>
  )
}

export default Docdash
