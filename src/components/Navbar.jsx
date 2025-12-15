import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[#35209B] text-white">
      <div className="mycontainer flex justify-between items-center px-4 py-5 h-14">

      <div className="logo font-bold text-white text-2xl">
        <img src="/favicon.png" alt="logo" className="inline w-9 mr-1" />
        <span className="pt-1">
        <span className="text-green-500"> &lt;</span>
        <span>Pass</span>
         <span className="text-green-500">Vault/&gt;</span>
         </span>
      </div>

      <a href="https://github.com/pjha91275/IronVault" target="_blank">
      <button className="text-white my-5 mx-2 rounded-full flex justify-between items-center ring-white ring-1">
        <img src="/icons/github.svg" alt="github logo" className="invert w-10 p-1" />
        <span className="font-bold px-2">GitHub</span>
      </button>
      </a>
      </div>
    </nav>
  );
};

export default Navbar;
