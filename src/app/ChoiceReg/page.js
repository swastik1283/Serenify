"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#F7F7F7] to-[#E5E5E5]">
      {/* Container for the text and buttons */}
      <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-lg box-shadow-black space-y-5 z-20">
        {/* Text Prompt */}
        <h2 className="text-xl font-semibold text-center text-black">
          Are you A?
        </h2>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => router.push('/Register')}
            className="w-32 h-12 bg-blue-400 text-white rounded-md hover:bg-blue-700 hover:transform hover:translate-y-1  hover:scale-110 transition-all duration-500  cursor-pointer "
          >
            Client
          </button>
          <button
            onClick={() => router.push('/DocRegister')}
            className="w-32 h-12 bg-green-400 text-white rounded-md hover:bg-green-700 hover:transform hover:translate-y-1  hover:scale-110 transition-all duration-500 cursor-pointer "
          >
            Doc
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
