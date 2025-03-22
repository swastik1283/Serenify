import React from 'react'
import Image from 'next/image'
const Login = () => {
  return (
    
    <section className="relative w-full h-screen flex justify-center ">
      <Image
      src="/assets/1.webp"
      layout="fill"
      objectFit="cover"
      alt="Background"
      className="absolute top-0 left-0 w-full h-full z-[-1]"
      />
      
    <form>
      <div className="container mx-15 max-w-[350px] mx-auto mt-20 py-2 px-20  bg-white/80 rounded-lg shadow-lg">
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
            </label>
            <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
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
            />
        </div>
        <div className="flex items-center justify-between">
            <button
            className="bg-blue-500 hover:bg-blue-700 text-white  py-1 px-1 rounded focus:outline-none focus:shadow-outline"
            type="button"
            >
            Sign In
            </button>
            <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
            >
            Forgot Password?
            </a>
        </div>
        </div>
    </form>
    </section>
  )
}

export default Login
