import { Link, NavLink } from "react-router-dom";
import { links } from "../assets/constants";
import { logo } from "../assets";
import { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
const NavLinks = () => (
  <div className="mt-10">
    {links.map((link) => (
      <NavLink
        key={link.name}
        to={link.to}
        className="flex px-4 items-center my-8  text-sm font-medium text-white hover:text-cyan-400 select-none"
      >
        {<link.icon className="mr-3 text-xl" />}
        {link.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <div className="py-10 px-4 bg-[#191624] md:flex hidden w-[220px] flex-col">
        <Link to="/">
          <img src={logo} alt="logo" className="object-contain w-full h-14" />
        </Link>
        <NavLinks />
      </div>

      {/* sidebar mobile */}
      <div className="absolute top-6 right-3 md:hidden block z-50">
        {mobileMenuOpen ? (
          <AiOutlineClose
            className="text-white w-6 h-6 mr-2 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            onClick={() => setMobileMenuOpen(true)}
            className="cursor-pointer text-white w-6 h-6 mr-2"
          />
        )}
      </div>
      <div
        className={`p-6 backdrop-blur-lg  md:hidden block absolute top-0  h-screen z-50 w-2/3 bg-gradient-to-tl  from-white/10 to-[#483d8b]
      smooth-transition ${mobileMenuOpen ? "left-0" : "-left-full"}`}
      >
        <img src={logo} alt="logo" className="object-contain w-full h-14" />

        <NavLinks />
      </div>
    </>
  );
};

export default Sidebar;
