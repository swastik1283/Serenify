"use client";

import Navbar from "../Navbar/page";
import { useRouter } from "next/navigation";


const users=[
  {id:"1",name:"alice",field:"mentalissue",fees:"100",role:"doctor"
}];
const UserDash = () => {
 
  const router=useRouter();
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
                    <th className="py-3 px-6 text-left">User ID</th>
                    
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">field</th>
                    <th className="py-3 px-6 text-left">fees</th>
                    <th className="py-3 px-6 text-left">Role</th>
                    <th className="py-3 px-6 text-left">Join</th>
                </tr>
          
            </thead>
            
              <tbody className="text-gray-600 text-sm font-light">
              {users.map((user)=>(
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{user.id}</td>
                    <td className="py-3 px-6 text-left">{user.name}</td>
                    <td className="py-3 px-6 text-left">{user.field}</td>
                    <td className="py-3 px-6 text-left">{user.fees}</td>
                    <td className="py-3 px-6 text-left">{user.role}</td>
                    <td className="py-3 px-6 "><button className="px-4 py-4 bg-blue-500 text-white rounded-xl hover:bg-red-500 hover:text-black" type="button" onClick={()=>router.push('/client')}> Connect</button></td>
                </tr>
              ))}
              </tbody>
           
        </table>
</section>
</div>
  )
}

export default UserDash
