"use client"
import { useState } from "react";
export default function NavPanel() {
    const [burger, setBurger] = useState(false);
    return (


<nav onBlur={() => setTimeout(() => setBurger(false), 300)} class={`border-gray-200 bg-[#333] dark:border-gray-700 relative z-10 ${burger ? "-mb-[276px]" : "-mb-[60px]"} w-[300px]`}>
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <button onClick={() => setBurger(!burger)}data-collapse-toggle="navbar-hamburger" type="button" class="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-hamburger" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
      </svg>
    </button>
    <div class={`${burger ? "" : "hidden"} w-full`} id="navbar-hamburger">
      <ul class="flex flex-col font-medium mt-4 rounded-lg bg-[#333] dark:border-gray-700">
        <li>
          <a href="/" class="block py-2 px-3 text-white bg-[#444] rounded-sm " aria-current="page">Home</a>
        </li>
        <li>
          <a href="/scoutingapp" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Scouting App</a>
        </li>
        <li>
          <a href="/qrcode" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white">QR Code Scanner</a>
        </li>
        <li>
          <a href="/admin-panel" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Admin Panel</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    );
}
