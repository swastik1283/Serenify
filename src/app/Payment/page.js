"use client"
import { useSearchParams } from "next/navigation";
import { useEffect,useState } from "react"
import {ethers} from "ethers";
import { getContract } from "../lib/web3/contract";
export default function Payment() {
    const searchParam=useSearchParams();
    const metaid=searchParam.get("metaid")
    const[doctors,setdoctors]=useState(null);

    useEffect(()=>{
        if(metaid){
            fetch(`api/auth/Docdet`)
            .then((res)=>res.json())
            .then((data)=> {
              const foundDoc=data.data?.find(doctors=>doctors.metaid===metaid);
            if(foundDoc){
              setdoctors(foundDoc);
                 }else{
                  alert("doc not found");
                 }
                      })
            .catch((err)=>{
               console.error("error fetching data ",err)
              alert("error infetching data")
              });
        }

    },[metaid])
    const handlePayment=async()=>{
          try{
            if((!doctors?.metaid) || (!doctors.fees)){
              return alert ("required metamask id or fees")
             
            }
            if(!ethers.utils.isAddress(doctors.metaid)){
              return alert("invalid wallet address");
            }
            const feeinEth=doctors.fees.toString();
            await window.ethereum.request({method:"eth_requestAccounts"})
            const contract=getContract()
            if(!contract) return alert("Smart contract not found");
            const tx=await contract.PayforTherapy(doctors.metaid,{
              value:ethers.utils.parseEther(feeinEth),
            });

            await tx.wait();
            alert("Payment succcessful");
          
          }
        catch(error){
          console.error("payment error",error)
          alert("payment failed")
        }
    }
  return (
    <div className="p-6">
    
      {doctors?(
        <>
         <h2 className="text-2xl font-bold mb-2">Therapy Payment</h2>
         <p>Doctor:{doctors.fname}</p>
         <p>Address of wallet:{doctors.metaid}</p>
       
         <p>Fees:{doctors.fees}</p>
           <button
            onClick={handlePayment}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Pay {doctors.fees} ETH
          </button>
        
        </>):(
          <p>Loading infor</p>
      )}
    </div>
  )
}

