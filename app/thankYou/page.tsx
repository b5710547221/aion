import { url } from "inspector";
import Image from "next/image";
import logo_aion from './../../assets/images/aion_logo.png';
import text1 from './../assets/images/text.png'
import texttk from './../../assets/images/Thankyou.png'
import Link from "@/node_modules/next/link";
export default function ThankYou() {
  return (
    <main className="w-full">
      <div className="w-full flex justify-center mt-8">
           <Image alt="test" src={logo_aion} width={350} height={100}/>
      </div>
      <div className="w-full flex justify-center mt-72 mb-8">
           <Image alt="test" src={texttk} width={350} height={100}/>
      </div>
      <div className="px-8 mt-4  w-full">
                        <Link href="\">
                          <button className=" w-full h-12  bg-blue1 text-white font-bold  mt-2 mb-2 border border-white   border-l rounded-xl">
                              BACK TO HOME
                          </button>
                        </Link>
                    </div>
     
     
    </main>
  );
}
