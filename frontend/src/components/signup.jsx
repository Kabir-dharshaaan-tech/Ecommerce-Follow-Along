


import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axios from "axios";

function Signup(props) {
  let [hide, setHide] = useState(true);
  let [hided, setHided] = useState(true);
  let [err, setErr] = useState("");

  const handleHide = () => {
    setHide(!hide);
  };
  const handleHided = () => {
    setHided(!hided);
  };

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpass: "",
  });

  const handleForm = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, email, password, confirmpass } = data;

    if (password !== confirmpass) {
      setErr("Passwords do not match");
      return;
    }

    if (!name || !email || !password || !confirmpass) {
      setErr("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/user/signup", {
        name,
        email,
        password,
      });

      console.log("Successfully registered:", response.data);
      setErr(""); // Clear previous error if any
      // Optional: redirect to login page or clear form
    } catch (error) {
      console.log(error);

      const message =
        error?.response?.data?.message || "Something went wrong. Try again.";
      setErr(message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full sm:w-[400px] bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h1>

        {err && (
          <div className="bg-red-200 text-red-800 p-2 rounded-md mb-4 text-center">
            {err}
          </div>
        )}

        <label htmlFor="name" className="block text-gray-600 font-medium mb-2">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={data.name}
          onChange={handleForm}
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleForm}
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label htmlFor="password" className="block text-gray-600 font-medium mb-2">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={hide ? "password" : "text"}
            value={data.password}
            onChange={handleForm}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleHide}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {hide ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
          </button>
        </div>

        <label htmlFor="confirmpass" className="block text-gray-600 font-medium mb-2">
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmpass"
            name="confirmpass"
            type={hided ? "password" : "text"}
            value={data.confirmpass}
            onChange={handleForm}
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handleHided}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {hided ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-gray-600">Remember me</label>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md mb-4 hover:bg-blue-700 transition"
        >
          Signup
        </button>

        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <span
              onClick={props.x}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
