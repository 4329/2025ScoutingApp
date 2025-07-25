"use client"
import { useState } from "react";
export default function NavPanel() {
    const [burger, setBurger] = useState(false);
    const leave = () => setTimeout(() => setBurger(true), 300);
    
    const baseItem = "block py-2 px-3 rounded-sm text-gray-400 hover:bg-gray-700 hover:text-white" 

    return (
        <nav onMouseOut={() => {if (navigator.userAgent == "iPhone") leave();}} onBlur={leave} className={`relative z-10 ${burger ? "-mb-[276px] bg-[#333]" : "-mb-[60px]"} w-[300px]`}>
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4">
            <button onClick={e => {
                e.target.focus();
                setBurger(!burger);
            }}data-collapse-toggle="navbar-hamburger" type="button" className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
            <div className={`${burger ? "" : "hidden"} w-full`} id="navbar-hamburger">
              <ul className="flex flex-col font-medium mt-4 rounded-lg bg-[#333] dark:border-gray-700">
                <li>
                  <a href="/" className={`${baseItem}`}aria-current="page">Home</a>
                </li>
                <li>
                  <a href="/scoutingapp" className="block py-2 px-3 rounded-sm text-white bg-[#444] hover:bg-gray-100">Scouting App</a>
                </li>
                <li>
                  <a href="/qrcode" className={`${baseItem}`}>QR Code Scanner</a>
                </li>
                <li>
                  <a href="/admin-panel" className={`${baseItem}`}>Admin Panel</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    );
}
