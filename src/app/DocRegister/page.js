"use client";
// import necessary components
import { useState } from "react";
import { useRouter } from "next/navigation";

// define the component
const DocRegister = () => {
  // define state variables
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [metaid, setmetaid] = useState("");
  const [file, setfile] = useState(null);
  const [fees, setfees] = useState("");
  const [role, setrole] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // define function to handle form submission
  const handleRegister = async (e) => {
    // prevent default form submission
    e.preventDefault();
    // reset message
    setMessage("");

    // create form data
    const formData = new FormData();
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("metaid", metaid);
    formData.append("file", file);
    formData.append("fees", fees);
    formData.append("role", role);

    // make API call
    const response = await fetch("api/auth/docregjs", {
      method: "POST",
      body: formData,
    });
    // get response data
    const data = await response.json();
    // if response is OK, set message to success and redirect after 2 seconds
    if (response.ok) {
      setMessage("Registration successful");
      setTimeout(() => {
        router.push("/DoctorLogin"), 2000;
      });
    } else {
      // if response is not OK, set message to error
      setMessage(data.error);
    }
  };

  // return JSX
  return (
    <section className="relative flex justify-center items-center ">
      {/* add two circles in the background that move in and out of each other */}
      <div className="absolute top-10 right-140 w-full h-full">
        <div className="blob1"></div>
        <div className="blob2"></div>
        <style jsx>{`
          .blob1 {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 200px;
            height: 200px;
            background: radial-gradient(
              rgb(255, 240, 105),
              rgb(255, 240, 105) 70%,
              transparent 70%
            );
            border-radius: 70%;
            animation: move 10s ease-in-out infinite;
          }

          .blob2 {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 150px;
            height: 150px;
            background: radial-gradient(
              rgb(255, 240, 105),
              rgb(255, 240, 105) 70%,
              transparent 70%
            );
            border-radius: 50%;
            animation: move 12s ease-in-out infinite;
            animation-delay: 0s;
          }

          @keyframes move {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(0.7);
            }
            100% {
              transform: scale(1);
            }
          }

          @keyframes rotate {
            0% {
              transform: rotate(-20deg) translateX(0px) scale(1);
            }
            25% {
              transform: rotate(-70deg) translateX(50px) scale(1.2);
            }
            50% {
              transform: rotate(-100deg) translateX(100px) scale(1.2);
            }
            100% {
              transform: rotate(-360deg) translateX(0px) scale(1);
            }
          }

          .blob2 {
            animation: rotate 5s ease-in-out infinite;
          }
        `}</style>
      </div>
      {/* add two circles in the background that move in and out of each other */}
      <div className="absolute bottom-100 left-100 w-full h-full">
        <div className="blob1"></div>
        <div className="blob2"></div>
        <style jsx>{`
          .blob1 {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 200px;
            height: 200px;
            background: radial-gradient(#ff69b4, #ff69b4 70%, transparent 70%);
            border-radius: 50%;
            animation: move 12s ease-in-out infinite;
          }

          .blob2 {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 150px;
            height: 150px;
            background: radial-gradient(#ff69b4, #ff69b4 70%, transparent 70%);
            border-radius: 50%;
            animation: move 16s ease-in-out infinite;
            animation-delay: 2.5s;
          }

          @keyframes move {
            0% {
              transform: scale(1);
            }
            10% {
              transform: scale(1.3);
            }
            20% {
              transform: scale(0.9);
            }
            30% {
              transform: scale(1.2);
            }
            40% {
              transform: scale(0.8);
            }
            50% {
              transform: scale(1.3);
            }
            60% {
              transform: scale(1.1);
            }
            70% {
              transform: scale(0.9);
            }
            80% {
              transform: scale(1.2);
            }
            90% {
              transform: scale(0.8);
            }
            100% {
              transform: scale(1);
            }
          }

          @keyframes rotate {
            0% {
              transform: rotate(40deg) translateX(0px) scale(1);
            }
            10% {
              transform: rotate(10deg) translateX(50px) scale(1.2);
            }
            20% {
              transform: rotate(-50deg) translateX(-25px) scale(0.8);
            }
            30% {
              transform: rotate(60deg) translateX(75px) scale(1.3);
            }
            40% {
              transform: rotate(-20deg) translateX(-50px) scale(0.9);
            }
            50% {
              transform: rotate(100deg) translateX(100px) scale(1.2);
            }
            60% {
              transform: rotate(-80deg) translateX(-75px) scale(0.8);
            }
            70% {
              transform: rotate(50deg) translateX(25px) scale(1.1);
            }
            80% {
              transform: rotate(-60deg) translateX(-100px) scale(0.9);
            }
            90% {
              transform: rotate(20deg) translateX(50px) scale(1.2);
            }
            100% {
              transform: rotate(300deg) translateX(0px) scale(1);
            }
          }

          .blob2 {
            animation: rotate 16s ease-in-out infinite;
          }
        `}</style>
      </div>
      {/* form */}
      <form
        onSubmit={handleRegister}
        className="bg-white/80 rounded-lg shadow-2xl max-w-md w-full p-8 m-4 md:w-1/2 md:p-12 scale-90">
        {/* first name */}
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="FirstName">
            First Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="FirstName"
            type="text"
            placeholder="First Name"
            onChange={(e) => setfname(e.target.value)}
            required
          />
        </div>

        {/* last name */}
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="LastName">
            Last Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="LastName"
            type="text"
            placeholder="Last Name"
            onChange={(e) => setlname(e.target.value)}
            required
          />
        </div>

        {/* email */}
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="example@gmail.com"
            onChange={(e) => setemail(e.target.value)}
            required
          />
        </div>

        {/* password */}
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******"
            onChange={(e) => setpassword(e.target.value)}
            required
          />
        </div>

        {/* meta id */}
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="metaid">
            MetaMask Id
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="metaid"
            type="text"
            placeholder="0x..."
            onChange={(e) => setmetaid(e.target.value)}
            required
          />
        </div>

        {/* fees */}
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="fees">
            Fees
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="fees"
            type="text"
            placeholder="$"
            onChange={(e) => setfees(e.target.value)}
            required
          />
        </div>

        {/* role */}
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="role">
            Role
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            id="role"
            type="text"
            placeholder="Therapist"
            onChange={(e) => setrole(e.target.value)}
            required
          />
        </div>

        {/* qualification certificate */}
        <div className="mb-4">
          <label
            className="block text-gray-800 text-sm font-bold mb-2"
            htmlFor="file">
            Qualification Certificate
          </label>
          <input
            type="file"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setfile(e.target.files[0])}
            required
          />
        </div>

        {/* submit button */}
        <div className="flex items-center justify-between">
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Register
           
          </button>
          <p className="mt-2 text-sm text-gray-600">
  Already have an account? <a href="/DoctorLogin" className="text-indigo-600 hover:underline">Login here</a>
</p>
          <p className="text-black">{message}</p>
        </div>
      </form>
    </section>
  );
};

export default DocRegister;


