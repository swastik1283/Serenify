"use client";

import Navbar from "../Navbar/page";
import { useRouter } from "next/navigation";

import { useState,useEffect } from "react";


const UserDash = () => {

  const router=useRouter();
  const [doctors,setdoctors]=useState([]);

  useEffect(()=>{
  const fetchdoctor=async()=>{
     try{
      const res=await fetch("api/auth/Docdet");
      const data=await res.json();
      if(data.success){
        console.log('success');
        setdoctors(data.data);
      }
    }
      catch(error){
        console.error("failed to fetch doctors",error);
      }

     };
     fetchdoctor();
  },[])
  
  return (
    <div className="min-h-screen bg-white-100">
      <Navbar/>
      <section>
        <div className="container mx auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4 text-black">Meet Your Help</h1>
        </div>

      </section>

      <section className="bg-gray-300 py-8">
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left ">Doctor  ID</th>
                    
                    <th className="py-3 px-6 text-left ">Name</th>
                    <th className="py-3 px-6 text-left">field</th>
                    <th className="py-3 px-6 text-left">fees</th>
                    <th className="py-3 px-6 text-left">Role</th>
                    <th className="py-3 px-6 text-left">Join</th>
                </tr>
          
            </thead>
            
              <tbody className="text-gray-600 text-sm font-light">
              {doctors.map((doctors)=>(
                <tr key={doctors.metaid} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left text-black">{doctors.metaid}</td>
                    <td className="py-3 px-6 text-left">{doctors.fname}</td>
                    <td className="py-3 px-6 text-left">{doctors.lname}</td>
                    <td className="py-3 px-6 text-left">{doctors.fees}</td>
                    <td className="py-3 px-6 text-left">{doctors.role}</td>
                    <td className="py-3 px-6 "><button key={doctors.metaid} className="px-4 py-4 bg-blue-500 text-white rounded-xl hover:bg-red-500 hover:text-black"   type="button" onClick={()=>router.push(`/Payment?metaid=${doctors.metaid}`)}> Connect</button></td>
                </tr>
              ))}
              </tbody>
           
        </table>
</section>
</div>
  )
}

export default UserDash
