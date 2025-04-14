// src/components/NavBar.jsx
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import axios from "axios"
import { CgProfile } from "react-icons/cg";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [isLogin,setIsLogin]=useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const fetchUser = async () => {
          try {
            let response = await axios.get("http://localhost:8080/user/checklogin", {
              withCredentials: true, // Ensure cookies are sent
            });
      
            if (response.status === 200) {
              setIsLogin(true)
              console.log(response.data);
            }
          } catch (error) {
            console.log("Error fetching user:", error);
          }
        };
      
        fetchUser();
      }, []);


    return (
        <nav className="bg-blue-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
                <div className="flex justify-between h-16">

                    {/* Hamburger Menu Button (visible on mobile) */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="text-gray-200 hover:text-white focus:outline-none focus:text-white"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? <GiHamburgerMenu /> : <IoClose />}
                        </button>
                    </div>

                    {/* nav bar for large screen */}
                    <div className="hidden md:flex md:items-center md:justify-center w-full ">
                        <ul className="flex space-x-6 border-2">
                            <li>
                                <NavLink
                                    to="/"
                                    end
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-white font-semibold px-3 py-2 rounded-md text-sm transition-colors duration-200"
                                            : "text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm transition-colors duration-200"
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/create"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-white font-semibold px-3 py-2 rounded-md text-sm transition-colors duration-200"
                                            : "text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm transition-colors duration-200"
                                    }
                                >
                                    Add Products
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/cart"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-white font-semibold px-3 py-2 rounded-md text-sm transition-colors duration-200"
                                            : "text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm transition-colors duration-200"
                                    }
                                >
                                    Cart
                                </NavLink>
                            </li>

                        </ul>
                        {isLogin?<div className='ml-auto'>
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-white font-semibold px-3 py-2 rounded-md text-sm transition-colors duration-200"
                                        : "text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm transition-colors duration-200"
                                }
                            >
                             <CgProfile className="w-[35px] h-[35px]"/>  {/* profile icon*/}
                            </NavLink>

                        </div>:<div className="ml-auto">
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-white font-semibold px-3 py-2 rounded-md text-sm transition-colors duration-200"
                                        : "text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm transition-colors duration-200"
                                }
                            >
                                Login
                            </NavLink>
                        </div>}
                        
                        
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-2" id="mobile-menu">
                    <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <li>
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) =>
                                    isActive
                                        ? "block text-white font-semibold px-3 py-2 rounded-md text-base transition-colors duration-200"
                                        : "block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base transition-colors duration-200"
                                }
                                onClick={() => setIsOpen(false)} // Close menu on link click
                            >
                                Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                to="/create"
                                className={({ isActive }) =>
                                    isActive
                                        ? "block text-white font-semibold px-3 py-2 rounded-md text-base transition-colors duration-200"
                                        : "block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base transition-colors duration-200"
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Add Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/cart"
                                className={({ isActive }) =>
                                    isActive
                                        ? "block text-white font-semibold px-3 py-2 rounded-md text-base transition-colors duration-200"
                                        : "block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base transition-colors duration-200"
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Cart
                            </NavLink>

                        </li>
                        {isLogin?<li >
                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-white font-semibold px-3 py-2 rounded-md text-sm transition-colors duration-200"
                                        : "text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm transition-colors duration-200"
                                }
                            >
                            <CgProfile className="w-[30px] h-[30px]"/>  {/* profile icon*/}
                            </NavLink>
                        </li>:<li >
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-white font-semibold px-3 py-2 rounded-md text-sm transition-colors duration-200"
                                        : "text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm transition-colors duration-200"
                                }
                            >
                                Login
                            </NavLink>
                        </li>}
                        
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default NavBar;