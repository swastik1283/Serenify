import React from "react";
import { ethers } from "ethers";
import abi from "./Therapyabi.js";

const contractAddress="0x46F93E64A68f50A0b2Aa76e0A66b1078973cA313";


export const getContract=()=>{
   if(typeof window === "undefined") return null;
   if(!window.ethereum) throw new Error("Metamask not installed")
   
    const provider= new ethers.providers.Web3Provider(window.ethereum);
    const signer=provider.getSigner()
    const contract =new ethers.Contract(contractAddress,abi,signer);
    return contract;
}