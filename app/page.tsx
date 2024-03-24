import Link from "@/node_modules/next/link";
import Image from "next/image";
import logo_aion from './../assets/images/aion_logo.png';

export default function Home() {
  return (
    <main className="w-full">
      <div className="w-full flex justify-center mt-8">
            <Image alt="test" src={logo_aion} width={350} height={100}/> 
         
      </div>
      <div className="w-full text-center text-3xl mt-32">
           {/* <Image alt="test" src={text1} width={350} height={100}/> */}
           <p className="font-deacon5 text-white">Bangkok International</p>
           <p  className="font-deacon5 text-white">Motor Show 2024</p>
      </div>
      <div className="ml-8 mr-8">
          <Link href="/register">
          <button className="font-deacon8 w-full h-12 flex-justify-center bg-white-1  text-blue-2 font-bold mt-16 py-2 px-4  rounded-xl">
            ลงทะเบียน
          </button>
          </Link>
          <Link href="/phVerify">
          <button className="font-deacon8 border border-white border-l w-full h-12 flex-justify-center bg-blue-1  text-white font-bold  mt-12 py-2 px-4 rounded-xl">
            TEST DRIVE
          </button>
          </Link>
      </div>
     
    </main>
  );
}
