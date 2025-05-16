"use client";

import React from 'react'
import { useEffect,useState } from "react";
import { usePathname } from "next/navigation";
import {useDebounce} from  'use-debounce'
import Image from 'next/image';
export default function PageLoader(){
    const pathname=usePathname();
    const[loading,setloading]=useState(false);
    const [debouncedPathname]=useDebounce(pathname,200)


    useEffect(()=>{
        setloading(true);
        const timer=setTimeout(() => {
            setloading(false)
        }, 600);
        return ()=>clearTimeout(timer);

    },[debouncedPathname])
    return loading?(
        <div className="fixed inset-0 z-50  bg-white/80 flex items-center justify-center">
            <Image
                src="/assets/logoSerenify.png"
                alt="loading"
                width={96}
                height={96}
                className='w-24 h-24 object-contain'
                priority
                />
        </div>
    
    ):null;
}