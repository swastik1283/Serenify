"use client"
import { useSearchParams } from "next/navigation";
import { useEffect,useState } from "react"
import handler from "../api/auth/Conversion/route";
import { isAddress,parseEther } from "ethers";
import { getContract } from "../lib/web3/contract";
import { useRouter } from "next/navigation";

export default function Payment() {
    const router=useRouter()
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

    },[metaid]);

    const handlePayment=async()=>{
     
          try{
            if((!doctors?.metaid) || (!doctors.fees)){
              return alert ("required metamask id or fees")
             
            }
            if(!isAddress(doctors.metaid)){
              return alert("invalid wallet address");
            }

            const convres=await fetch(`/api/auth/Conversion?inrAmount=${doctors.fees}&symbol=eth`);
            if (!convres.ok) {
  throw new Error("Conversion API request failed.");
}
            const convdata= await convres.json();

            const rate=parseFloat(convdata.amount)
           
               if(isNaN(rate)){
                  return alert("failed to fetch ETH conversion rate")
                  
           }
           const fee=(parseFloat(doctors.fees ))
           if(isNaN(fee)){
            return alert("doctor fees is not a valid number")
           }
            const feeinEth=(parseFloat(doctors.fees*rate).toFixed(8));
        

            console.log(`converter INR${doctors.fees} to ETH ${feeinEth}`)


            await window.ethereum.request({method:"eth_requestAccounts"})

            const contract= await getContract()

            if(!contract) return alert("Smart contract not found");

            const tx=await contract.PayforTherapy(doctors.metaid,{

              value:parseEther(feeinEth),

            });

            await tx.wait();
            alert("Payment succcessful");
            setTimeout(()=>{
             router.push('/client'),100;
            })
          
          }
        catch(error){
          console.error("payment error",error)
          alert(`payment Payment failed: ${error?.message || "Unknown error"}`)
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
            Pay {doctors.fees} INR
          </button>
        
        </>):(
          <p>Loading infor</p>
      )}
    </div>
  )
}

