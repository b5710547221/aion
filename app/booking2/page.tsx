'use client'
import { url } from "inspector";
import Image from "next/image";
import logo_aion from './../../assets/images/aion_logo.png';
import text1 from './../../assets/images/text.png'
import text2 from './../../assets/images/booking.png'
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Link from "@/node_modules/next/link";

export default function Booking2() {
    const [isOpen1, setOpen1] = useState(false);

    const handleDropDown1 = () => {
      setOpen1(!isOpen1);
    };
    const [isOpen2, setOpen2] = useState(false);

 const handleDropDown2 = () => {
   setOpen2(!isOpen2);
 };
 
     
    
    
  return (
    
    <div className="w-full mb-12 pl-8 pr-8  ">
      <div className="w-full flex justify-center  mt-8">
           <Image alt="test" src={logo_aion} width={350} height={100}/>
      </div>
      <div className="w-full flex justify-center  mt-8">
           <Image alt="test" src={text2} width={350} height={100}/>
      </div>
      

      <div className="w-full   bg-cream  overflow-hidden shadow-lg bg-white border  rounded-2xl mt-8">
         <div className="flex flex-col gap-4 justify-center items-center w-full h-fit  pl-4 pr-4">
         <div className=" relative   mt-4 h-12 input-component mb-5 w-full">
                    <div className="relative group ">
                        <button onClick={handleDropDown1} id="dropdownDefaultButton" data-dropdown-toggle="dropdown1" className="text-gray-500 w-full h-14 border border-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-right inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        <p className="w-full pl-4 justify-start flex">25 มีนาคม 2567</p>
                        <div className="justify-end flex w-full">
                            <svg className="w-2.5 h-2.5 ms-3 mr-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </div>
                        </button>
                         
                    <div id="dropdown1" className={`h-36 overflow-auto w-full  bg-white border border-black divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-70 ${
                isOpen1 ? "block" : "hidden"
        }           `}>
                        <ul className="z-10  w-full  text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li>
                            <a href="#" className="w-full block px-4 py-2  bg-low1 dark:hover:text-white">25 มีนาคม 2567 </a>
                        </li>
                        <li>
                            <a href="#" className="w-full block px-4 py-2   dark:hover:text-white">27 มีนาคม 2567</a>
                        </li>
                        <li>
                            <a href="#" className="w-full block px-4 py-2  bg-low1 dark:hover:text-white">28 มีนาคม 2567</a>
                        </li>
                        <li>
                            <a href="#" className="w-full block px-4 py-2   dark:hover:text-white">29 มีนาคม 2567</a>
                        </li>
                        <li>
                            <a href="#" className="w-full block px-4 py-2  bg-low1 dark:hover:text-white">30 มีนาคม 2567</a>
                        </li>
                        <li>
                            <a href="#" className="w-full block px-4 py-2   dark:hover:text-white">31 มีนาคม 2567</a>
                        </li>
                        <li>
                            <a href="#" className="w-full block px-4 py-2  bg-low1 dark:hover:text-white">1 มษายน 2567</a>
                        </li>
                        <li>
                            <a href="#" className="w-full block px-4 py-2   dark:hover:text-white">2 มษายน 2567</a>
                        </li>
                        <li>
                            <a href="#" className="w-full block px-4 py-2  bg-low1 dark:hover:text-white">3 มษายน 2567</a>
                        </li>
                        <li>
                            <a href="#" className="w-full block px-4 py-2   dark:hover:text-white">4 มษายน 2567</a>
                        </li>
                        <li>
                            <a href="#" className="w-full block px-4 py-2  bg-low1 dark:hover:text-white">5 มษายน 2567</a>
                        </li>
                        <li>
                            <a href="#" className="w-full block px-4 py-2   dark:hover:text-white">6 เมษายน 2567</a>
                        </li>
                        <li>
                            <a href="#" className="w-full block px-4 py-2  bg-low1 dark:hover:text-white">7 เมษายน 2567</a>
                        </li>
                        
                        </ul>
                    </div>
                    </div>
                    <label htmlFor="model" className="absolute text-sm left-2 transition-all text-blue2 bg-white px-1">
                        Prefer date slot / โปรดเลือกวัน
                    </label>
                </div>
                <div className=" relative   mt-4 h-12 input-component mb-5 w-full">
                    <div className="relative group ">
                        <button onClick={handleDropDown2} id="dropdownDefaultButton" data-dropdown-toggle="dropdown2" className="text-gray-500 w-full h-14 border border-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-right inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        <p className="w-full pl-4 justify-start flex">11:00</p> 
                        <div className="justify-end flex w-full">
                            <svg className="w-2.5 h-2.5 ms-3 mr-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </div>
                        </button>
                         
                    <div id="dropdown2" className={`h-36 overflow-auto w-full  bg-white border border-black divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${
                    isOpen2 ? "block" : "hidden"
                        }`}>
                        <ul className="z-10  w-full  text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li>
                            <a href="#" className="w-full block px-4 py-2  bg-low1 dark:hover:text-white">11.00</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">11.15</a>
                        </li>
                        <li>
                            <a href="#" className="w-full block px-4 py-2 bg-low1 dark:hover:text-white">11.30</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">11.45</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2 bg-low1 dark:hover:text-white">12.00</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2  dark:hover:text-white">12.15</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2 bg-low1 dark:hover:text-white">12.30</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2  dark:hover:text-white">12.45</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2 bg-low1 dark:hover:text-white">13.00</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2  dark:hover:text-white">13.15</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2 bg-low1 dark:hover:text-white">13.30</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2  dark:hover:text-white">13.45</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2 bg-low1 dark:hover:text-white">14.00</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2  dark:hover:text-white">14.15</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2 bg-low1 dark:hover:text-white">14.30</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2  dark:hover:text-white">14.45</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2 bg-low1 dark:hover:text-white">15.00</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2  dark:hover:text-white">15.15</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2 bg-low1 dark:hover:text-white">15.30</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2  dark:hover:text-white">15.45</a>
                        </li>

                        <li>
                            <a href="#" className="w-full  block px-4 py-2 bg-low1 dark:hover:text-white">16.00</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2  dark:hover:text-white">16.15</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2 bg-low1 dark:hover:text-white">16.30</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2  dark:hover:text-white">16.45</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2 bg-low1 dark:hover:text-white">17.00</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2  dark:hover:text-white">17.15</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2 bg-low1 dark:hover:text-white">17.30</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2  dark:hover:text-white">17.45</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2 bg-low1 dark:hover:text-white">18.00</a>
                        </li>
                        </ul>
                    </div>
                    </div>
                    <label htmlFor="model" className="absolute text-sm left-2 transition-all text-blue2 bg-white px-1">
                       Prefer time slot / โปรดเลือกรอบเวลา
                    </label>
                </div>
               
              </div>
              <p className="mb-2 ml-2 text-sm text-blue2">Do you have a driver license?/ คุณมีใบขับขี่หรือไม่?*</p>
               <div className=" flex columns-2 p-4">
                    <div className=" items-center w-full ">
                        <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label  className="ms-2 text-lg  text-gray-900 dark:text-gray-300">มี</label>
                    </div>
                    <div className=" items-center w-full ">
                        <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label  className="ms-2 text-lg  text-gray-900 dark:text-gray-300">ไม่มี</label>
                    </div>
               </div>
               <p className="text-center mb-2 ml-2 text-sm text-red">(การทดลองขับอนุญาตให้เฉพาะผู้ที่มีใบขับขี่เท่านั้น)</p>
        </div>
                    <div className="mt-4 mr-2 w-full">
                       <Link href="/thankYou">
                        <button className="  w-full h-12  bg-gray1  text-gray font-bold  mt-2 mb-2    rounded-xl">
                            SUMMIT
                        </button>
                        </Link>
                    </div>
     
    </div>
    );

}
