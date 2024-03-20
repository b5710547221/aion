import Link from "@/node_modules/next/link";
import { url } from "inspector";
import Image from "next/image";
import logo_aion from './../assets/images/aion_logo.png';
import text1 from './../assets/images/text.png'
export default function Home() {
  return (
    <main className="w-full">
      <div className="w-full flex justify-center mt-8">
           <Image alt="" src={logo_aion} width={350} height={100}/>
      </div>
      <div className="w-full flex justify-center mt-32">
           <Image alt="" src={text1} width={350} height={100}/>
      </div>
      <div className="ml-8 mr-8">
          <Link href="/register">
          <button className="w-full h-12 flex-justify-center bg-white-1  text-blue-2 font-bold mt-16 py-2 px-4  rounded-xl">
            ลงทะเบียน
          </button>
          </Link>
          <Link href="/phVerify">
          <button className="border border-white border-l w-full h-12 flex-justify-center bg-blue-1  text-white font-bold  mt-12 py-2 px-4 rounded-xl">
            TEST DRIVE
          </button>
          </Link>
      </div>
     
    </main>
  );
}
