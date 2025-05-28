"use client";
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
const Login = () => {
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [message,setMessage]=useState("");
const router = useRouter();

   const handleLogin=async(e)=>{
    e.preventDefault();
    setMessage("");

  const response= await fetch("api/auth/login",{
method:"POST",
body:JSON.stringify({email,password}),
headers:{"Content-Type":"application/json"},
   })
   const data =await response.json();
   if(response.ok){
    setMessage("Login successful");
    setTimeout(()=>{
      router.push("/UserDash"),2000
    });
  }
    else{
      setMessage(data.error);
    }
   };
    return (
    
    <section className="relative w-full h-screen flex justify-center ">
      <Image
      src="/assets/20945352.jpg"
      layout="fill"
      objectFit="cover"
      alt="Background"
      className="absolute top-0 left-0 w-full h-full z-[-1]"
      />
      
    <form onSubmit={handleLogin}>
      <div className="container mx-15 max-w-[350px] mx-auto mt-20 py-2 px-20  bg-white/90 rounded-lg shadow-lg-gray">
      <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
           Email
               </label>
               <input
               className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
               id="email"
               type="email"
               placeholder="12@gmail.com"
               onChange={(e)=>setemail(e.target.value)} required
               />
               </div>
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
            </label>
            <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******"
            onChange={(e)=>setpassword(e.target.value)} required

            />
        </div>
        <div className="flex items-center justify-between">
            <button
            className="bg-blue-500 hover:bg-blue-700 text-white  py-1 px-1 rounded focus:outline-none focus:shadow-outline"
            type="submit"
        
            >
            Sign In
            </button>
        </div>
        </div>
    </form>
    </section>
  )
}

export default Login
