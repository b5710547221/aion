import { url } from "inspector";
import Image from "next/image";
import Link from "@/node_modules/next/link";
import logo_aion from './../../assets/images/aion_logo.png';
import text1 from './../assets/images/text.png'

export default function PhVerify() {
  return (
    <main className="w-full">
      <div className="w-full flex justify-center mt-8">
           <Image  alt="" src={logo_aion} width={350} height={100}/>
      </div>
      <div className="pl-8 pr-8 mt-12 relative w-full  h-14 input-component mb-5 w-full">
                    <input
                        id="email"
                        type="text"
                        name="email"
                        className="h-full w-full border  px-2 transition-all border-black rounded-xl"
                        placeholder="012-345-6789"
                    />
                    <label htmlFor="email" className="absolute text-lg left-2 transition-all bg-transparent px-1">
                        Phone Number / เบอร์โทรติดต่อ *
                    </label>
                </div>
                <div className="ml-8 mr-8">
                     <Link href="/booking">
                     <button className=" w-full h-12 flex-justify-center bg-white-1  text-blue-2 font-bold mt-16 py-2 px-4  rounded-xl">
                    SEARCH
                    </button>
                    </Link>
                </div>
           
     
    </main>
  );
}
