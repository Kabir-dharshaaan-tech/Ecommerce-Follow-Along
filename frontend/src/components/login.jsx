import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();

  const [hide, setHide] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleHide = () => {
    setHide(!hide);
  };

  const handleForm = (e) => {
    setError("")
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { email, password } = data;
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      await axios
        .post("http://localhost:8080/user/login", {
          email,
          password,
        }, {
          withCredentials: true   
        })
        .then((response) => {
          console.log(response,"888")
          navigate("/");
        });

      console.log("Login successful");
      
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full sm:w-[400px] bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login to your account
          </h1>

          {error && (
            <div className="bg-red-200 text-red-800 p-2 rounded-md mb-4 text-center">
              {error}
            </div>
          )}

          <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
            Email address
          </label>
          <input
            id="email"
            type="email"
            name="email"
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
              {hide ? (
                <FaRegEye size={20} />
              ) : (
                <FaRegEyeSlash size={20} />
              )}
            </button>
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-600">Remember me</label>
            </div>
            <a href="#" className="text-blue-600 hover:underline text-sm">
              Forgot password?
            </a>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md mb-4 hover:bg-blue-700 transition"
          >
            Login
          </button>

          <div className="text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <span
                onClick={props.x}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
