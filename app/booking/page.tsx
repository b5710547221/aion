"use client";
import axios from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import logo_aion from "./../../assets/images/aion_logo.png";
import Link from "next/link";

interface UserCreateDto {
  id?: number;
  name: string;
  email: string;
  phone: string;
  interestModel?: string;
  planForCarPercharsing?: string;
  dealer?: string;
  preferDateSlot?: Date | null;
  preferTimeSlot?: string | null;
  isLicensed?: boolean;
}

const dateSlot: any[] = [
  {
    value: "2024-03-25",
    label: "25 มีนาคม 2567",
  },
  {
    value: "2024-03-27",
    label: "27 มีนาคม 2567",
  },
  {
    value: "2024-03-28",
    label: "28 มีนาคม 2567",
  },
  {
    value: "2024-03-29",
    label: "29 มีนาคม 2567",
  },
  {
    value: "2024-03-30",
    label: "30 มีนาคม 2567",
  },
  {
    value: "2024-03-31",
    label: "31 มีนาคม 2567",
  },
  {
    value: "2024-04-01",
    label: "1 เมษายน 2567",
  },
  {
    value: "2024-04-02",
    label: "2 เมษายน 2567",
  },
  {
    value: "2024-04-03",
    label: "3 เมษายน 2567",
  },
  {
    value: "2024-04-04",
    label: "4 เมษายน 2567",
  },
  {
    value: "2024-04-05",
    label: "5 เมษายน 2567",
  },
  {
    value: "2024-04-06",
    label: "6 เมษายน 2567",
  },
  {
    value: "2024-04-07",
    label: "7 เมษายน 2567",
  },
];

const timeSlot: any[] = [
  {
    value: "11:00",
    label: "11:00",
  },
  {
    value: "11:15",
    label: "11:15",
  },
  {
    value: "11:30",
    label: "11:30",
  },
  {
    value: "11:45",
    label: "11:45",
  },
  {
    value: "12:00",
    label: "12:00",
  },
  {
    value: "12:15",
    label: "12:15",
  },
  {
    value: "12:30",
    label: "12:30",
  },
  {
    value: "12:45",
    label: "12:45",
  },
  {
    value: "13:00",
    label: "13:00",
  },
  {
    value: "13:15",
    label: "13:15",
  },
  {
    value: "13:30",
    label: "13:30",
  },
  {
    value: "13:45",
    label: "13:45",
  },
  {
    value: "14:00",
    label: "14:00",
  },
  {
    value: "14:15",
    label: "14:15",
  },
  {
    value: "14:30",
    label: "14:30",
  },
  {
    value: "14:45",
    label: "14:45",
  },
  {
    value: "15:00",
    label: "15:00",
  },
  {
    value: "15:15",
    label: "15:15",
  },
  {
    value: "15:30",
    label: "15:30",
  },
  {
    value: "15:45",
    label: "15:45",
  },
  {
    value: "16:00",
    label: "16:00",
  },
  {
    value: "16:15",
    label: "16:15",
  },
  {
    value: "16:30",
    label: "16:30",
  },
  {
    value: "16:45",
    label: "16:45",
  },
  {
    value: "17:00",
    label: "17:00",
  },
  {
    value: "17:15",
    label: "17:15",
  },
  {
    value: "17:30",
    label: "17:30",
  },
  {
    value: "17:45",
    label: "17:45",
  },
  {
    value: "18:00",
    label: "18:00",
  },
];

function Booking() {
  const query = useSearchParams();
  const router = useRouter();
  // step by query param step
  const phone = useMemo(() => {
    // get step from query
    const newphone = query.get("phone");
    if (!newphone || (newphone && newphone.length !== 10)) {
      return null;
    }
    return newphone;
  }, [query]);

  const [isLoad, setLoad] = useState(false);
  const [user, setUser] = useState<UserCreateDto>({
    name: "",
    email: "",
    phone: "",
    interestModel: "",
    planForCarPercharsing: "",
    dealer: "",
    preferDateSlot: null,
    preferTimeSlot: "",
    isLicensed: false,
  });

  const fetchUserbyPhone = useCallback(async (p: string) => {
    try {
      setLoad(true);
      const response = await axios({
        method: "GET",
        url: "https://aion-api.showkhun.com/user?phone=" + p,
        // url: "http://localhost:4000/user?phone=" + p,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      if (response.data && response.data.isSuccess) {
        if ((response.data?.data?.data ?? []).length > 0) {
          setUser(response.data?.data?.data[0]);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "หมายเลขนี้ยังไม่มีข้อมูลในระบบ กรุณาลงทะเบียน",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            router.replace("/registerAndBooking");
            return;
          });
          return;
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.replace("/phVerify");
      });
      return;
    } finally {
      setLoad(false);
    }
  }, []);

  useEffect(() => {
    try {
      if (phone && phone.length === 10) {
        fetchUserbyPhone(phone);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        router.replace("/phVerify");
      });
    }
  }, [phone]);

  const handleUpdateData = useCallback(async (user: UserCreateDto) => {
    try {
      setLoad(true);
      if (!user.id) throw new Error("User id not found");
      if (!user.preferDateSlot) throw new Error("Prefer date slot not found");
      if (!user.preferTimeSlot) throw new Error("Prefer time slot not found");

      const response = await axios({
        method: "PUT",
        url: "https://aion-api.showkhun.com/user/" + user.id,
        // url: "http://localhost:4000/user",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        data: {
          preferDateSlot: dayjs(user.preferDateSlot).format("YYYY-MM-DD"),
          preferTimeSlot: user.preferTimeSlot,
          isLicensed: user.isLicensed,
        },
      });
      if (response.data && response.data.isSuccess) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          router.replace("/thankYou");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: (error as Error).message,
        showConfirmButton: false,
        timer: 1500,
      })
    }
  }, []);

  return (
    <div className="w-full mb-12 px-4 xl:px-8  ">
      {/* fullscreen loading */}
      <div
        className={`fixed top-0 left-0 z-50 w-full h-full bg-white bg-opacity-60 items-center justify-center ${
          isLoad ? "flex" : "hidden"
        }`}
      >
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>

      <div className="w-full flex justify-center  mt-8">
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

      <div className="w-full   bg-cream  overflow-hidden shadow-lg bg-blue-20 bg-opacity-60 border  rounded-2xl mt-8">
        <div className="flex flex-col gap-4 justify-center items-center w-full h-fit  pl-4 pr-4">
          <p className="text-left w-full pt-4 font-deacon13">
            คุณ : {user.name}
          </p>
          <div className="w-full h-27 ">
            <a
              href="#"
              className="h-16   block  pl-4 pr-4  bg-white border border-gray-200 rounded-2xl shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <p className="font-deacon13 mb-2 text-blue1 text-sm font-bold tracking-tight text-gray-900 dark:text-white font-sm">
                Phone
              </p>
              <p className="font-deacon13 mb-2 font-normal text-gray1 dark:text-gray1 ">
                {user.phone}
              </p>
            </a>
          </div>
          <div className="w-full h-27">
            <a
              href="#"
              className="h-16 block pl-4 pr-4  bg-white border border-gray-200 rounded-2xl shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <p className="font-deacon13 mb-2 text-blue1 text-sm font-bold tracking-tight text-gray-900 dark:text-white font-sm">
                E-mail
              </p>
              <p className="font-deacon13 mb-2 font-normal text-gray1  dark:text-gray1 ">
                {user.email}
              </p>
            </a>
          </div>
          <div className="w-full h-27">
            <a
              href="#"
              className="h-16 block pl-4 pr-4  bg-white border border-gray-200 rounded-2xl shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <p className="font-deacon13 mb-2 text-blue1 text-sm font-bold tracking-tight text-gray-900 dark:text-white font-sm">
                Interested model
              </p>
              <p className="font-deacon13 mb-2 font-normal text-gray1  dark:text-gray1 ">
                {user.interestModel !== "" ? user.interestModel : "-"}
              </p>
            </a>
          </div>
          <div className="w-full h-27">
            <a
              href="#"
              className="h-16 block  pl-4 pr-4  bg-white border border-gray-200 rounded-2xl shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <p className="font-deacon13 mb-2 text-blue1 text-sm font-bold tracking-tight text-gray-900 dark:text-white font-sm">
                Plan for Car Purchasing
              </p>
              <p className="font-deacon13 mb-2 font-normal text-gray1  dark:text-gray1 ">
                {user.planForCarPercharsing !== ""
                  ? user.planForCarPercharsing
                  : "-"}
              </p>
            </a>
          </div>
          <div className="w-full h-27 mb-4">
            <a
              href="#"
              className="h-16 block  pl-4 pr-4  bg-white border border-gray-200 rounded-2xl shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <p className="font-deacon13 mb-2 text-blue1 text-sm font-bold tracking-tight text-gray-900 dark:text-white font-sm">
                Dealer
              </p>
              <p className="font-deacon13 mb-2 font-normal text-gray1  dark:text-gray1 ">
                {user.dealer !== "" ? user.dealer : "-"}
              </p>
            </a>
          </div>
        </div>
      </div>

      <div className="w-full   bg-cream shadow-lg border  rounded-2xl mt-8 py-4">
        <div className="flex flex-col gap-4 justify-center items-center w-full h-fit  pl-4 pr-4">
          <div className=" relative   mt-4 h-12 input-component mb-5 w-full rounded-xl">
            <div className="relative group ">
              <Select
                id="preferDateSlot"
                inputId="preferDateSlot"
                menuPlacement="top"
                value={
                  user.preferDateSlot
                    ? dateSlot.find((v) => {
                        return (
                          v.value ===
                          dayjs(user.preferDateSlot).format("YYYY-MM-DD")
                        );
                      })
                    : null
                }
                options={dateSlot}
                className={`w-full text-gray-500 bg-white hover:bg-white focus:ring-4 rounded-lg`}
                onChange={(e) => {
                  setUser({
                    ...user,
                    preferDateSlot: dayjs(e.value).toDate(),
                  });
                }}
                styles={{
                  control: (styles) => ({
                    ...styles,
                    borderColor:
                      "border-color: rgb(0 0 0 / var(--tw-border-opacity))",
                    borderRadius: "0.5rem",
                    height: "3.5rem",
                  }),
                }}
              />
            </div>
            <label
              htmlFor="model"
              className="font-deacon13 text-blue1 absolute text-base left-2 transition-all xl:text-black bg-white px-1"
            >
              Prefer date slot / โปรดเลือกวัน
            </label>
          </div>
          <div className=" relative   mt-4 h-12 input-component mb-5 w-full rounded-xl">
            <div className="relative group ">
              <Select
                id="preferTimeSlot"
                inputId="preferTimeSlot"
                menuPlacement="top"
                options={timeSlot}
                value={
                  user.preferTimeSlot
                    ? timeSlot.find((v) => v.value === user.preferTimeSlot)
                    : null
                }
                className={`w-full text-gray-500 bg-white hover:bg-white focus:ring-4 rounded-lg`}
                onChange={(e) => {
                  setUser({ ...user, preferTimeSlot: e.value });
                }}
                styles={{
                  control: (styles) => ({
                    ...styles,
                    borderColor:
                      "border-color: rgb(0 0 0 / var(--tw-border-opacity))",
                    borderRadius: "0.5rem",
                    height: "3.5rem",
                  }),
                }}
              />
            </div>
            <label
              htmlFor="model"
              className="font-deacon13 text-blue1 absolute text-base left-2 transition-all xl:text-black bg-white px-1"
            >
              Prefer time slot / โปรดเลือกรอบเวลา
            </label>
          </div>
        </div>
        {/* <p className="mb-2 ml-2 text-sm text-blue2 font-deacon13 ">
          Do you have a driver license?/ คุณมีใบขับขี่หรือไม่?*
        </p>
        <div className=" flex columns-2 p-4">
          <div className=" items-center w-full ">
            <input
              id="link-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ms-2 text-lg  text-gray-900 dark:text-gray-300 font-deacon13">
              มี
            </label>
          </div>
          <div className=" items-center w-full ">
            <input
              id="link-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ms-2 text-lg  text-gray-900 dark:text-gray-300 font-deacon13">
              ไม่มี
            </label>
          </div>
        </div> */}
        <div className="w-full text-left p-4">
          <label className="font-bold text-base text-blue1">
            Do you have a driver licnse? / คุณมีใบขับขี่หรือไม่ ?{" "}
          </label>
          <div className=" items-center w-full ">
            {/* radiobox */}
            <label className="ms-2 text-base  text-gray-900 dark:text-gray-300 font-deacon13 mr-5">
              <input
                id="isLicensed"
                type="radio"
                name="isLicensed"
                value="true"
                onChange={() => {
                  return false;
                }}
                checked={user.isLicensed}
                onClick={() => {
                  setUser({ ...user, isLicensed: true });
                }}
                className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />{" "}
              Yes/มี
            </label>
            <label className="ms-2 text-base  text-gray-900 dark:text-gray-300 font-deacon13">
              <input
                id="isLicensed"
                type="radio"
                name="isLicensed"
                value="false"
                onChange={() => {
                  return false;
                }}
                checked={!user.isLicensed}
                onClick={() => {
                  setUser({ ...user, isLicensed: false });
                }}
                className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />{" "}
              No/ไม่มี
            </label>
          </div>
        </div>
        <p className="text-center mb-2 ml-2 text-sm text-red">
          (การทดลองขับอนุญาตให้เฉพาะผู้ที่มีใบขับขี่เท่านั้น)
        </p>
      </div>
      <div className="mt-4 mr-2 w-full">
        <button
          type="button"
          className={`border border-white border-l w-full h-12  bg-blue-1  text-white font-bold  mt-2 mb-2   py-2 px-4 rounded-xl`}
          onClick={() => {
            handleUpdateData(user);
          }}
          disabled={!user.preferDateSlot || !user.preferTimeSlot || user.preferTimeSlot === ""}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}
export default function MainPage() {
  return (
    <Suspense>
      <Booking />
    </Suspense>
  );
}
