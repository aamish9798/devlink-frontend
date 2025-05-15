import React, { useState } from "react";
import { BsList, BsX } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  const [isShow, setIsShow] = useState(false);

  const toggleMenu = () => {
    setIsShow(!isShow);
  };

  // const user = true;
  return (
    <header>
      <div className="bg-[#020103] text-white/60 lg:p-4 border border-t-0 border-l-0 border-r-0 border-b-white/15 px-6 py-4">
        <div className="flex justify-between md:justify-center items-center gap-0 md:gap-x-30">
          <Link to="/" className="text-xl font-bold">
            <img src="/logo.png" alt="" className="w-10 h-10 md:w-12 md:h-12" />
          </Link>
          <nav className="hidden md:block px-8 py-2.5 border rounded-[60px] border-white/15">
            <ul className="flex gap-x-10 text-base">
              {user ? (
                <>
                  <li>
                    <Link to="/feed">Feed</Link>
                  </li>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/chat">Chat</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <div className="flex items-center">
            <div className="p-1.5 border border-white/15 rounded-xl mr-2 md:mr-6">
              {user ? (
                <button className="px-5 py-1.5 rounded-lg bg-[#8C45FF]/40 backdrop-blur text-white cursor-pointer border border-white/15 shadow-inner-custom text-xs md:text-base">
                  Logout
                </button>
              ) : (
                <button className="px-5 py-1.5 rounded-lg bg-[#8C45FF]/40 backdrop-blur text-white cursor-pointer border border-white/15 shadow-inner-custom text-xs md:text-base">
                  Join DevLink
                </button>
              )}
            </div>
            <div
              onClick={toggleMenu}
              className="flex items-center justify-center w-8 h-8 z-[999] cursor-pointer rounded-full text-white bg-purple-600 text-lg md:hidden"
            >
              {isShow ? <BsX /> : <BsList />}
            </div>

            <div
              className={` bg-[#371758] fixed top-0 left-0 h-full w-64 p-6 z-99 shadow-lg transition-transform duration-300 md:hidden ${
                isShow ? "translate-x-0" : "-translate-x-full"
              } `}
            >
              <nav className="text-base">
                <ul className="flex flex-col gap-y-5">
                  {user ? (
                    <>
                      <li className="border border-white/15 text-center text-base p-2 rounded-[60px]">
                        <Link to="/feed" onClick={toggleMenu}>
                          Feed
                        </Link>
                      </li>
                      <li className="border border-white/15 text-center text-base p-2 rounded-[60px]">
                        <Link to="/profile" onClick={toggleMenu}>
                          Profile
                        </Link>
                      </li>
                      <li className="border border-white/15 text-center text-base p-2 rounded-[60px]">
                        <Link to="/chat" onClick={toggleMenu}>
                          Chat
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="border border-white/15 text-center text-base p-2 rounded-[60px]">
                        <Link to="/login" onClick={toggleMenu}>
                          Login
                        </Link>
                      </li>
                      <li className="border border-white/15 text-center text-base p-2 rounded-[60px]">
                        <Link to="/signup" onClick={toggleMenu}>
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
