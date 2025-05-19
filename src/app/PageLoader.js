"use client";

import React from 'react'
import { useEffect,useState } from "react";
import { usePathname } from "next/navigation";
import {useDebounce} from  'use-debounce'
import Image  from 'next/image';
export default function PageLoader(){
    const pathname=usePathname();
    const[loading,setloading]=useState(false);
    const [debouncedPathname]=useDebounce(pathname,500)


    useEffect(()=>{
        setloading(true);
        const timer=setTimeout(() => {
            setloading(false)
        }, 3000);
        return ()=>clearTimeout(timer);

    },[debouncedPathname])
    return loading ? (
        <div className="fixed inset-0 z-50  bg-[#E4E6EA] flex items-center justify-center">
            <video
                src="/assets/Serenify.mp4"
                           
                className='w-full h-[90%] object-contain'
                autoPlay muted loop

                />
        </div>
    
    ):null;
}