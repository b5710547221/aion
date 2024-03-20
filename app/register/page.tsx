import { url } from "inspector";
import Link from "@/node_modules/next/link";
import Image from "next/image";
import logo_aion from './../../assets/images/aion_logo.png';
import text1 from './../../assets/images/text.png'
import text2 from './../../assets/images/text2.png'
import React from 'react';
import ReactDOM from 'react-dom';

export default function Register() {

 
     
    
    
  return (
    
    <div className="w-full mb-12 pl-8 pr-8  ">
      
      <div className="w-full flex justify-center  mt-8">
           <Image alt="" src={logo_aion} width={350} height={100}/>
      </div>
      <div className="w-full flex justify-center  mt-8">
           <Image alt="" src={text2} width={350} height={100}/>
      </div>
    
      <div className="w-full  rounded overflow-hidden shadow-lg bg-white border  rounded-xl mt-8">
         <div className="flex flex-col gap-8 justify-center items-center w-full h-fit my-4 pl-4 pr-4">
           
                <div className="  relative w-full  mt-4 h-14 input-component mb-5 w-full">
                    <input
                        id="name"
                        type="text"
                        name="name"
                        className="h-full w-full border  px-2 transition-all border-black rounded-xl"
                        placeholder="ชื่อ - สกุล"
                    />
                    <label htmlFor="name" className="absolute text-lg left-2 transition-all bg-white px-1">
                        Name-Surname / ชื่อ-สกุล *
                    </label>
                </div>

           
                <div className=" relative w-full  mt-4 h-14 input-component mb-5 w-full">
                    <input
                        id="Phone"
                        type="text"
                        name="Phone"
                        className="h-full w-full border  px-2 transition-all border-black rounded-xl"
                        placeholder="012-345-6789"
                    />
                    <label htmlFor="Phone" className="absolute text-lg left-2 transition-all bg-white px-1">
                       Phone number / เบอร์โทรติดต่อ *
                    </label>
                </div>
         
                <div className=" relative w-full  mt-4 h-14 input-component mb-5 w-full">
                    <input
                        id="email"
                        type="text"
                        name="email"
                        className="h-full w-full border  px-2 transition-all border-black rounded-xl"
                        placeholder="loremipsum@example.com"
                    />
                    <label htmlFor="email" className="absolute text-lg left-2 transition-all bg-white px-1">
                        E-mail
                    </label>
                </div>
                
                <div className=" relative   mt-4 h-12 input-component mb-5 w-full">
                    <div className="relative group ">
                        <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown1" className="text-gray-500 w-full h-14 border border-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-right inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        | Hyper HT
                        <div className="justify-end flex w-full">
                            <svg className="w-2.5 h-2.5 ms-3 mr-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </div>
                        </button>
                         
                    <div id="dropdown1" className="h-36 overflow-auto w-full z-10 hidden bg-white border border-black divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="w-full  text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li>
                            <a href="#" className="w-full block px-4 py-2  bg-low1 dark:hover:text-white">Hyper HT</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Hyper SSR</a>
                        </li>
                        <li>
                            <a href="#" className="w-full block px-4 py-2 bg-low1 dark:hover:text-white">Y Plus Premium 490</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Y Plus Premium 410</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2 bg-low1 dark:hover:text-white">Y Plus Elite</a>
                        </li>
                        </ul>
                    </div>
                    </div>
                    <label htmlFor="model" className="absolute text-lg left-2 transition-all text-black bg-white px-1">
                        Interested Model
                    </label>
                </div>
                
                <div className=" relative   mt-4 h-12 input-component mb-5 w-full">
                    <div className="relative group ">
                        <button  id="dropdownDefaultButton2" data-dropdown-toggle="dropdown2" className="text-gray-500 w-full h-14 border border-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-right inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        | 1 month
                        <div className="justify-end flex w-full">
                            <svg className="w-2.5 h-2.5 ms-3 mr-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </div>
                        </button>
                         
                    <div id="dropdown2" className="h-36 overflow-auto w-full z-10 hidden bg-white border border-black divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="w-full  text-sm text-black dark:text-gray-200" aria-labelledby="dropdownDefaultButton2">
                        <li>
                            <a href="#" className="w-full block px-4 py-2 bg-low1 dark:hover:text-white">1 month</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">2-3 months</a>
                        </li>
                        <li>
                            <a href="#" className="w-full block px-4 py-2 bg-low1 dark:hover:text-white">3 months+</a>
                        </li>
                       
                        </ul>
                    </div>
                    </div>
                    <label htmlFor="model" className="absolute text-lg left-2 transition-all text-black bg-white px-1">
                        Plan for car percharsing
                    </label>
                </div>

               <div className=" relative   mt-4 h-12 input-component mb-5 w-full">
                    <div className="relative group ">
                        <button id="dropdownDefaultButton3" data-dropdown-toggle="dropdown3" className="text-gray-500 w-full h-14 border border-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  py-2.5 text-right inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        | V group
                        <div className="justify-end flex w-full mr-4">
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </div>
                        </button>
                         
                    <div id="dropdown3" className="h-36 overflow-auto w-full z-10 hidden bg-white border border-black divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="w-full text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton3">
                        <li>
                            <a href="#" className="w-full block px-4 py-2 bg-low1 dark:hover:text-white">V Group</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Gold integrate</a>
                        </li>
                        <li>
                            <a href="#" className="w-full block px-4 py-2 bg-low1 dark:hover:text-white">Harmony</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sensu</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2 bg-low1 dark:hover:text-white">Rungcharoen star ev</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Milestone</a>
                        </li>
                        <li>
                            <a href="#" className="w-full  block px-4 py-2 bg-low1 dark:hover:text-white">Hangthaithada</a>
                        </li>
                        </ul>
                    </div>
                    </div>
                    <label htmlFor="model" className="absolute text-lg left-2 transition-all text-black bg-white px-1">
                        Dealer
                    </label>
                </div>
        
                        
                    <div className="relative w-full px-4  mt-4 h-fit border border-black rounded-2xl">
                                <label className="mt-4 mb-4 text-black text-lg">
                                    เมื่อผู้ลงทะเบียนกด ยอมรับ แสดงว่าคุณเข้าใจและตกลงที่จะอนุญาต ให้บริษัทฯ นำข้อมูลส่วนบุคคลของคุณไปใช้ในการทำสื่อโฆษณาประชาสัมพันธ์ติดตามสถานะและยอมรับการส่งเสริมการขายโปรดตรวจสอบนโยบายความเป็นส่วนตัวของเราโดยละเอียด ตามลิ้งค์แนบ 
                                    
                                </label>
                                <label className="text-black text-underline">https://www.aionauto.com/privacy/agreement</label>
                    </div>
                    <div className=" items-center w-full ">
                        <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label  className="ms-2 text-lg  text-gray-900 dark:text-gray-300">ยอมรับ</label>
                    </div>
                    <div className="ml-2 mr-2 w-full">
                        <Link href="/thankYou">
                        <button className="border border-white border-l w-full h-12  bg-blue-1  text-white font-bold  mt-2 mb-2   py-2 px-4 rounded-xl">
                            SUMMIT
                        </button>
                        </Link>
                    </div>  
              </div>
        </div>
    </div>
    );

}
