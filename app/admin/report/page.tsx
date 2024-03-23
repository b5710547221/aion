import Link from "next/link";
import Image from "next/image";
import logo_aion from "./../../../assets/images/aion_logo.png";
import { Suspense } from "react";

function AdminReportPage() {
  return (
    <div className="w-full mb-12 px-4 xl:px-8">
      <div className="w-full flex justify-center  mt-3">
        <Link href="/">
          <Image alt="test" src={logo_aion} width={350} height={100} />
        </Link>
      </div>

      <div className="w-full text-center  mt-8">
        {/*   <Image  alt="test" src={text2} width={350} height={100}/> */}
        <div>
          <p className="font-deacon5  text-white text-2xl">BOOK A TEST DRIVE</p>
        </div>
        <div>
          <p className="font-deacon8 text-white text-xl">
            <br />
            AION Thailand @Motor Show 2024
            <br />
          </p>
        </div>
        <div>
          <p className="font-deacon13 text-blue1 text-lg">
            Please Fill In All Required Information.
          </p>
        </div>
      </div>

      
    </div>
  );
}

export default function MainPage() {
  return (
    <Suspense>
      <AdminReportPage />
    </Suspense>
  );
}
