import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const textVariants = {
  initial: {
    y: -20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const dropdownVariants = {
  hidden: {
    opacity: 1,
    scale: 0.9,
    y: -10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: -1,
    transition: {
      duration: 0.5,
    },
  },
};

const MainNavbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuItems = [
    { label: "Literature", href: "#" },
    { label: "Events", href: "/events" },
    { label: "Connect", href: "/contact" },
  ];
  const menuItems2 = [
    { label: "About", href: "/about" },

    { label: "School of love", href: "/academy" },
    { label: "Media", href: "#" },
  ];

  return (
    // <motion.nav
    //   className={`hover:bg-gray-900 ${
    //     isScrolled ? "bg-gray-900" : "bg-transparent"
    //   }  absolute top-0 border-gray-200 border-gray-700 sticky top-0 z-10  `}
    // >
    <motion.nav
      className={`bg-gray-900 absolute top-0 
      border-gray-200 border-gray-700 sticky 
      top-0 z-10  `}
    >
      <motion.div
        className="max-w-screen-xl flex flex-wrap items-center justify-between p-3 m-auto    lg:pr-[7rem]"
        variants={textVariants.animate}
        initial="initial"
        animate="animate"
      >
        <div className="flex justify-between ">
          {" "}
          <div className="lg:none  block">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 
               text-sm text-gray-500 rounded-lg md:hidden bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
              // className=""
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="m-auto flex justify-center
           items-center absolute right-[30%] sm1:right-[40%]"
          >
            <a href="/" className="flex  mx-auto">
              <img
                className="w-[8rem] mx-auto md:hidden "
                src="/logoBold.png"
                alt="logo"
              />
            </a>
          </div>
        </div>
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
            // } w-full md:block md:w-auto h-[60vh]`}
          } w-full md:block md:w-auto mdl2:-ml-[5rem]`}
        >
          <ul
            className="flex flex-col font-medium p-4 md:p-0 mt-1  rounded-lg 
             md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 
            bg-transparent md:bg-transparent lg:gap-10 gap-3 "
          >
            {menuItems2.map((item, index) => (
              <motion.li
                key={index}
                variants={textVariants}
                className="relative group "
              >
                <a
                  href={item.href}
                  className="block py-2 px-3 text-gray-900 rounded 
                  hover:bg-gray-100 md:hover:bg-transparent md:border-0 
                  md:hover:text-blue-700 md:p-0 text-white md:hover:text-blue-500
                   hover:bg-gray-700 hover:text-white md:hover:bg-transparent 
                   text-white text-xl lg:text-lg "
                >
                  {item.label}
                </a>
                {item.label === "School of love" && (
                  <motion.div
                    className="z-10 hidden absolute left-0 mt-1 font-normal  divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700 divide-gray-600 group-hover:block"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <ul className="py-5 text-sm text-gray-700 text-gray-400">
                      <li>
                        <a
                          href="/academy/courses"
                          className="block px-4 py-2 hover:bg-gray-100 hover:bg-gray-600 
                          hover:text-white text-white"
                        >
                          Courses
                        </a>
                      </li>
                      <li>
                        <a
                          href="/academy/workshop"
                          className="block px-4 py-2 hover:bg-gray-100 hover:bg-gray-600 hover:text-white text-white"
                        >
                          Workshop
                        </a>
                      </li>
                      <li>
                        <a
                          href="/academy/coaching"
                          className="block px-4 py-2 hover:bg-gray-100 hover:bg-gray-600 hover:text-white text-white"
                        >
                          Coaching
                        </a>
                      </li>
                    </ul>
                  </motion.div>
                )}
                {item.label === "Media" && (
                  <motion.div
                    className="z-10 hidden absolute left-0 mt-1
                     font-normal bg-white divide-y divide-gray-100 rounded-lg shadow
                      w-40 bg-gray-700 divide-gray-600 group-hover:block text-white transition ease-in-out delay-150 "
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <ul
                      className="py-2 text-sm bg-gray-700 text-gray-400
                     transition ease-in-out delay-250 rounded "
                    >
                      <li>
                        <a
                          href="/academy/podcast"
                          className="block px-4 py-2
                           hover:bg-gray-100 hover:bg-gray-600 
                           hover:text-white text-white"
                        >
                          Podcast
                        </a>
                      </li>
                      <li>
                        <a
                          href="/reel"
                          className="block px-4 py-2 hover:bg-gray-100 hover:bg-gray-600 hover:text-white text-white"
                        >
                          Reel
                        </a>
                      </li>
                      <li>
                        <a
                          href="/video"
                          className="block px-4 py-2 hover:bg-gray-100 hover:bg-gray-600 hover:text-white text-white"
                        >
                          Video
                        </a>
                      </li>
                    </ul>
                  </motion.div>
                )}
                {/* ... other dropdowns */}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="w-[9rem] items-center ">
          {" "}
          <a href="/">
            <img
              className="items-center hidden md:block"
              src="/logoBold.png "
              alt="logo"
            />
          </a>
        </div>

        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto -mt-5 md:mt-0`}
        >
          <ul
            className="flex flex-col font-medium p-4 md:p-0 mt-1  rounded-lg 
             md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  
            bg-transparent md:bg-transparent lg:gap-10 gap-3 "
          >
            {" "}
            {menuItems.map((item, index) => (
              <motion.li
                key={index}
                variants={textVariants}
                className="relative group"
              >
                <a
                  href={item.href}
                  className="block py-2 
                  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent 
                  md:border-0 md:hover:text-blue-700 md:p-0 text-white 
                  md:hover:text-blue-500 hover:bg-gray-700 
                  hover:text-white md:hover:bg-transparent px-2
                   text-xl lg:text-lg  text-white"
                >
                  {item.label}
                </a>

                {item.label === "Literature" && (
                  <motion.div
                    className="z-10 hidden absolute left-0 mt-1 font-normal 
                     text-white
                     divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700 
                     divide-gray-600 group-hover:block"
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <ul className="py-2 text-sm text-gray-700 text-gray-400 text-white">
                      <li>
                        <a
                          href="/books"
                          className="block px-4 text-white py-2 hover:bg-gray-100 hover:bg-gray-600 hover:text-white"
                        >
                          Books
                        </a>
                      </li>
                      <li>
                        <a
                          href="/blogs"
                          className="block text-white px-4 py-2 hover:bg-gray-100 hover:bg-gray-600 hover:text-white"
                        >
                          Blogs
                        </a>
                      </li>
                    </ul>
                  </motion.div>
                )}
                {/* ... other dropdowns */}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default MainNavbar;
