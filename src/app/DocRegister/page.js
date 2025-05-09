"use client";
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
const DocRegister = () => {
  const [fname,setfname]=useState("");
  const [lname,setlname]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const[metaid,setmetaid]=useState("");
  const[file,setfile]=useState(null);
  const[message,setMessage]=useState("");
 const router =useRouter();
  const handleRegister=async(e)=>{
    e.preventDefault();
    setMessage("");

    const formData=new FormData();
    formData.append("fname",fname);
    formData.append("lname",lname);
    formData.append("email",email);
    formData.append("password",password);
    formData.append("metaid",metaid);
    formData.append("file",file);

  
    const response=await fetch("api/auth/docregjs",{
      method:"POST",
      body:formData,
    });
     console.log(response);
    const data=await response.json();
    if(response.ok){
      setMessage("Registration successful");
      setTimeout(()=>{
        router.push("/Login"),2000
      });
    }
    else{
      setMessage(data.error);
    }
  };

  return (  
       <section className="relative w-full h-screen flex justify-center ">
         <Image
         src="/assets/1.webp"
         layout="fill"
         objectFit="cover"
         alt="Background"
         className="absolute top-0 left-0 w-full h-full z-[-1]"
         />
         
       <form onSubmit={handleRegister}>
         <div className="container mx-15 max-w-[350px] mx-auto mt-20 py-2 px-20  bg-white/80 rounded-lg shadow-lg">
           <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
               FirstName
               </label>
               <input
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               id="FirstName"
               type="text"
               placeholder="FirstName"
               onChange={(e)=>setfname(e.target.value)} required
               />
           </div>

           <div className="mb-4">
               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
               Last Name
               </label>
               <input
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
               id="LastName"
               type="text"
               placeholder="LastName"
               onChange={(e)=>setlname(e.target.value)} required
               />  
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


           <div className="mb-6">
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
       MetaMask Id
               </label>
               <input
               className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
               id="Metamask"
               type="text"
               placeholder="00x....."
               onChange={(e)=>setmetaid(e.target.value)} required
               />
           </div>

           <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Qualification Certificate
            </label>
            <input 
              type="file"
              onChange={(e)=>setfile(e.target.files[0])
            } required>

              </input>
           </div>
           <div className="flex items-center justify-between">
               <button
               className="bg-blue-500 hover:bg-blue-700 text-white  py-1 px-1 rounded focus:outline-none focus:shadow-outline"
               type="submit"
               >
             Register
               </button>
              <p>{message}</p>
           </div>
           </div>
           </div>
       </form>
       </section>
     
   
  )
}

export default DocRegister
