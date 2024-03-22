"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import logo_aion from "./../../assets/images/aion_logo.png";
import Swal from "sweetalert2";

export default function PhVerify() {
  const [phone, setPhone] = useState<string>("");
  const router = useRouter();
  return (
    <main className="w-full">
      <div className="w-full flex justify-center mt-8">
        <Image alt="test" src={logo_aion} width={350} height={100} />
      </div>
      <div className="pl-8 pr-8 mt-12 relative w-full  h-14 input-component mb-5">
        <div className=" relative mt-4 h-14 input-component mb-5 w-full rounded-lg">
          <input
            id="phone"
            type="text"
            name="phone"
            className={`h-full w-full border  px-2 transition-all  rounded-lg border-black`}
            placeholder="012-345-6789"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            maxLength={10}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            // display by pattern
            value={phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
            // input number only
            onInput={(e: any) => {
              e.currentTarget.value = e.currentTarget.value.replace(
                /[^0-9]/g,
                ""
              );
            }}
            title="Error Message"
          />
          <label
            htmlFor="phone"
            className="font-deacon13 text-blue1 absolute text-base left-2 transition-all bg-white px-1"
          >
            Phone number / เบอร์โทรติดต่อ <span className="text-red">*</span>
          </label>
        </div>
      </div>
      <div className="ml-8 mr-8">
        {/* <Link
          className={}
          href="/booking"
        > */}
        <button
          className={`w-full h-12 flex-justify-center bg-white-1  text-blue-2 font-bold mt-16 py-2 px-4  rounded-xl ${
            phone.length === 10 ? "" : "cursor-not-allowed"
          }`}
          onClick={() => {
            phone.length === 10 && router.push(`/booking?phone=${phone}`);
          }}
        >
          SEARCH
        </button>
        {/* </Link> */}
      </div>
    </main>
  );
}
