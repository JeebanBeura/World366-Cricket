import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosArrowDown } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';

const BottomNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const navigate = useNavigate();
    const menuRef = useRef(null);

    const menuItems = [
        {
            title: 'Home',
            path: '/'
        },
        {
            title: 'About Us',
            path: '/about'
        },
        {
            title: 'Services',
            options: [
                { title: 'Service 1', path: '/service-1' },
                { title: 'Service 2', path: '/service-2' },
            ]
        },
        {
            title: 'Contact',
            path: '/contact'
        }
    ];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNavigate = (path) => {
        navigate(path);
        setMenuOpen(false);
        setActiveDropdown(null);
        window.scrollTo(0, 0);
    };

    return (
        <div className="w-full z-50">
            {/* Desktop Navbar */}
            <div className="hidden xl:flex items-center justify-between bg-primaryColor text-white px-10 py-4 shadow-md">
                <div className="text-2xl font-bold">World366Cricket</div>

                <div className="flex gap-8 items-center text-base">
                    {menuItems.map((item, index) => (
                        <div key={index} className="relative">
                            {item.options ? (
                                <div
                                    className="flex items-center gap-1 cursor-pointer"
                                    onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                                >
                                    {item.title} <IoIosArrowDown size={16} />
                                </div>
                            ) : (
                                <button onClick={() => handleNavigate(item.path)}>{item.title}</button>
                            )}

                            {/* Dropdown */}
                            {item.options && activeDropdown === index && (
                                <div className="absolute bg-white text-primaryTextColor shadow-lg mt-2 rounded-md w-40 overflow-hidden z-50">
                                    {item.options.map((opt, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => handleNavigate(opt.path)}
                                            className="px-4 py-2 hover:bg-primaryFadedColor cursor-pointer"
                                        >
                                            {opt.title}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    <button
                        onClick={() => handleNavigate('/admin-login')}
                        className="bg-accentColor hover:bg-green-600 transition-colors px-6 py-2 rounded-md text-white"
                    >
                        Login To Dashboard
                    </button>
                </div>
            </div>

            {/* Mobile Navbar */}
            <div className="xl:hidden flex justify-between items-center px-6 py-4 bg-white shadow-md">
                <div className="text-xl font-bold text-primaryColor">World366Cricket</div>
                <GiHamburgerMenu size={28} className="text-primaryColor cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} />
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        ref={menuRef}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg z-50 p-6 flex flex-col gap-6"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-lg font-bold text-primaryColor">Menu</div>
                            <button
                                className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md"
                                onClick={() => setMenuOpen(false)}
                            >
                                Close
                            </button>
                        </div>

                        {menuItems.map((item, index) => (
                            <div key={index}>
                                {item.options ? (
                                    <div>
                                        <div
                                            className="flex items-center justify-between text-primaryTextColor font-medium cursor-pointer"
                                            onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                                        >
                                            {item.title}
                                            <IoIosArrowDown />
                                        </div>
                                        {activeDropdown === index && (
                                            <div className="ml-4 mt-2 space-y-2">
                                                {item.options.map((opt, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="text-sm text-secondaryTextColor hover:text-primaryColor cursor-pointer"
                                                        onClick={() => handleNavigate(opt.path)}
                                                    >
                                                        {opt.title}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div
                                        className="text-primaryTextColor font-medium cursor-pointer"
                                        onClick={() => handleNavigate(item.path)}
                                    >
                                        {item.title}
                                    </div>
                                )}
                            </div>
                        ))}

                        <button
                            onClick={() => handleNavigate('/admin-login')}
                            className="mt-auto bg-accentColor hover:bg-green-600 text-white px-5 py-2 rounded-md w-full"
                        >
                            Login To Dashboard
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BottomNavbar;
