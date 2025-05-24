import React from "react";
import {BrowserProvider,Contract} from "ethers";
import abi from "./Therapyabi.js";

const contractAddress="0x46F93E64A68f50A0b2Aa76e0A66b1078973cA313";


export const getContract= async()=>{
   if(typeof window === "undefined") return null;
   if(!window.ethereum) throw new Error("Metamask not installed")
   
    const provider= new BrowserProvider(window.ethereum);
    const signer= await provider.getSigner()
    const contract =new Contract(contractAddress,abi,signer);
    return contract;
}