




import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    {/* Logo Section */}
                    <div className="text-blue-600 font-bold text-xl">Brand</div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-6">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                    isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/create"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                    isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"
                                }`
                            }
                        >
                            Add Products
                        </NavLink>
                        <NavLink
                            to="/cart"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                    isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"
                                }`
                            }
                        >
                            Cart
                        </NavLink>
                    </div>
                    
                    {/* Login Button */}
                    <div className="hidden md:flex">
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                    isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"
                                }`
                            }
                        >
                            Login
                        </NavLink>
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="text-gray-600 hover:text-blue-600 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <IoClose size={24} /> : <GiHamburgerMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white py-2 px-4 shadow-lg border-t">
                    <ul className="space-y-2">
                        <li>
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) =>
                                    `block px-4 py-2 rounded-md text-base transition-colors duration-200 ${
                                        isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"
                                    }`
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/create"
                                className={({ isActive }) =>
                                    `block px-4 py-2 rounded-md text-base transition-colors duration-200 ${
                                        isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"
                                    }`
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
                                    `block px-4 py-2 rounded-md text-base transition-colors duration-200 ${
                                        isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"
                                    }`
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Cart
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `block px-4 py-2 rounded-md text-base transition-colors duration-200 ${
                                        isActive ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600"
                                    }`
                                }
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </NavLink>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
