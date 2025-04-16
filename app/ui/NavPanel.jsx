"use client"
import { useState } from "react";
export default function NavPanel() {
    const [burger, setBurger] = useState(false);
    return (


<nav onBlur={() => setTimeout(() => setBurger(false), 300)} className={`border-gray-200 bg-[#333] dark:border-gray-700 relative z-10 ${burger ? "-mb-[276px]" : "-mb-[60px]"} w-[300px]`}>
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <button onClick={() => setBurger(!burger)}data-collapse-toggle="navbar-hamburger" type="button" className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
      </svg>
    </button>
    <div className={`${burger ? "" : "hidden"} w-full`} id="navbar-hamburger">
      <ul className="flex flex-col font-medium mt-4 rounded-lg bg-[#333] dark:border-gray-700">
        <li>
          <a href="/" className="block py-2 px-3 text-white bg-[#444] rounded-sm " aria-current="page">Home</a>
        </li>
        <li>
          <a href="/scoutingapp" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Scouting App</a>
        </li>
        <li>
          <a href="/qrcode" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white">QR Code Scanner</a>
        </li>
        <li>
          <a href="/admin-panel" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Admin Panel</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    );
}
