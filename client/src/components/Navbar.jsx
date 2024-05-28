import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { HiMenuAlt4 } from "react-icons/hi";

import logo from "../../images/OIG.R.jpeg";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.8] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {/* {["New Purchase", "Retrieve", "Digital Gold"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))} */}
        <a href="http://localhost:3000/" style={{ fontSize: '20px' }}  class="mx-6 cursor-pointer undefined">New Purchase</a>
        <a href="http://localhost:4000/" style={{ fontSize: '20px' }}  class="mx-6 cursor-pointer undefined">Retrieve</a>
        <a href="http://localhost:5000/" style={{ fontSize: '20px' }}  class="mx-6 cursor-pointer undefined">Digital Gold</a>
        <li style={{ fontSize: '18px' }} className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            <a href={"http://localhost:3000/"} className="`mx-4 cursor-pointer my-2 text-lg">New Purchase</a>
            <a href={"http://localhost:4000/"} className="`mx-4 cursor-pointer my-2 text-lg">Retrieve</a>
            <a href={"http://localhost:5000/"} className="`mx-4 cursor-pointer my-2 text-lg">Digital Gold</a>

          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
