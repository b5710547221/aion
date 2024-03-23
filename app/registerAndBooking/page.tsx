"use client";
import Link from "@/node_modules/next/link";
import axios from "axios";
import { Field, Form, Formik, FormikErrors } from "formik";
import Image from "next/image";
import { Suspense, useCallback, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import Swal from "sweetalert2";
import { boolean, object, string } from "yup";
import logo_aion from "./../../assets/images/aion_logo.png";

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

import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
export interface RegisterFormValues {
  name: string;
  email: string;
  phone: string;
  interestModel: string;
  planForCarPercharsing: string;
  dealer: string;
  preferDateSlot: string;
  preferTimeSlot: string;
  isLicensed: boolean;
  approveCheckbox?: boolean;
}

const yupSchema = object().shape({
  name: string().required("Name is required").min(2),
  email: string(),
  phone: string().required("Phone is required").min(9).max(13),
  interestModel: string(),
  planForCarPercharsing: string(),
  dealer: string(),
  preferDateSlot: string(),
  preferTimeSlot: string(),
  isLicensed: boolean(),
});

function Register() {
  const [isLoad, setIsLoad] = useState(false);
  const router = useRouter();
  const query = useSearchParams();
  // step by query param step
  const step = useMemo(() => {
    // get step from query
    const newStep = query.get("step");
    if (!newStep) {
      return 1;
    }
    // // pram.step is number 1 2 3
    if (parseInt(newStep as string) > 3) {
      return 1;
    }
    return parseInt(newStep as string);
  }, [query]);
  const checkStep1 = useCallback(
    (errors: FormikErrors<RegisterFormValues>, values: RegisterFormValues) => {
      if (
        step === 1 &&
        !errors.name &&
        !errors.email &&
        !errors.phone &&
        !errors.interestModel &&
        !errors.planForCarPercharsing &&
        !errors.dealer &&
        values.name !== "" &&
        values.phone !== ""
      ) {
        return true;
      }
      return false;
    },
    []
  );
  const handleSubmit = useCallback(async (values: RegisterFormValues) => {
    setIsLoad(true);
    try {
      const response = await axios({
        method: "POST",
        url: "https://aion-api.showkhun.com/user",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        data: { ...values, approveCheckbox: undefined },
      });
      if (response.data && response?.data?.isSuccess) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          router.replace("/thankYou");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Register Fail",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Register Fail",
      });
    } finally {
      setIsLoad(false);
    }
  }, []);

  return (
    <div className="w-full mb-12 px-3 xl:px-8 ">
      <div className="w-full flex justify-center  mt-8">
        <Link href="/">
          <Image alt="test" src={logo_aion} width={350} height={100} />
        </Link>
      </div>
      <div className="w-full text-center mt-8">
        <div>
          <p className="font-deacon5 pr-32 text-white text-3xl">Registration</p>
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
      {isLoad && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <p>Loading...</p>
          </div>
        </div>
      )}
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          interestModel: "",
          planForCarPercharsing: "",
          dealer: "",
          preferDateSlot: dayjs().format("YYYY-MM-DD"),
          preferTimeSlot: "",
          isLicensed: true,
          approveCheckbox: undefined,
        }}
        onSubmit={async (values: RegisterFormValues) => {
          await handleSubmit(values);
        }}
        validationSchema={yupSchema}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <div
              className={`w-full overflow-hidden shadow-lg bg-white border  rounded-lg mt-8 bg-opacity-70 ${
                step === 1 ? "flex" : "hidden"
              }`}
            >
              <div className="flex flex-col gap-8 justify-center items-center w-full h-fit my-4 pl-4 pr-4">
                <div className="relative mt-4 h-14 input-component mb-5 w-full">
                  <Field
                    id="name"
                    type="text"
                    name="name"
                    disabled={step > 1}
                    className={`h-full w-full border  px-2 transition-all  rounded-lg ${
                      errors.name && touched.name
                        ? "border-red"
                        : "border-black"
                    }`}
                    placeholder="ชื่อ - สกุล"
                  />
                  <label
                    htmlFor="name"
                    className="font-deacon13 label-element text-blue1 absolute text-base left-2 transition-all bg-white px-1"
                  >
                    Name-Surname / ชื่อ-สกุล <span className="text-red">*</span>
                  </label>
                  {errors.name && touched.name && (
                    <small className="text-red">{errors.name}</small>
                  )}
                </div>

                <div className=" relative mt-4 h-14 input-component mb-5 w-full rounded-lg">
                  <Field
                    id="phone"
                    type="text"
                    name="phone"
                    disabled={step > 1}
                    className={`h-full w-full border  px-2 transition-all  rounded-lg ${
                      errors.phone && touched.phone
                        ? "border-red"
                        : "border-black"
                    }`}
                    placeholder="012-345-6789"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    maxLength={10}
                    // display by pattern
                    value={values.phone.replace(
                      /(\d{3})(\d{3})(\d{4})/,
                      "$1-$2-$3"
                    )}
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
                    className="font-deacon13 label-element text-blue1 absolute text-base left-2 transition-all bg-white px-1"
                  >
                    Phone number / เบอร์โทรติดต่อ{" "}
                    <span className="text-red">*</span>
                  </label>
                </div>

                <div className=" relative mt-4 h-14 input-component mb-5 w-full rounded-lg">
                  <Field
                    id="email"
                    type="email"
                    name="email"
                    className={`h-full w-full border  px-2 transition-all border-black rounded-lg ${
                      errors.email && touched.email ? "border-red" : ""
                    }`}
                    placeholder="loremipsum@example.com"
                    disabled={step > 1}
                  />
                  <label
                    htmlFor="email"
                    className="font-deacon13 label-element text-blue1 absolute text-base left-2 transition-all bg-white px-1"
                  >
                    E-mail
                  </label>
                  {errors.email && touched.email && (
                    <small className="text-red">{errors.email}</small>
                  )}
                </div>

                <div className=" relative mt-4 h-12 input-component mb-5 w-full rounded-lg">
                  <div className="relative group ">
                    <Select
                      id="interestModel"
                      inputId="interestModel"
                      options={[
                        { value: "Hyper HT", label: "Hyper HT" },
                        { value: "Hyper SSR", label: "Hyper SSR" },
                        {
                          value: "Y Plus Premium 490",
                          label: "Y Plus Premium 490",
                        },
                        {
                          value: "Y Plus Premium 410",
                          label: "Y Plus Premium 410",
                        },
                        { value: "Y Plus Elite", label: "Y Plus Elite" },
                      ]}
                      isDisabled={step > 1}
                      className={`w-full text-gray-500  ${
                        errors.interestModel && touched.interestModel
                          ? "border-red border"
                          : ""
                      } bg-white hover:bg-white focus:ring-4 rounded-lg`}
                      onChange={(e) => {
                        setFieldValue("interestModel", e?.value ?? "");
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
                    htmlFor="interestModel"
                    className="font-deacon13 label-element absolute text-base left-2 transition-all text-black bg-white px-1"
                  >
                    Interested Model
                  </label>
                  {errors.interestModel && touched.interestModel && (
                    <small className="text-red">{errors.interestModel}</small>
                  )}
                </div>

                <div className=" relative   mt-4 h-12 input-component mb-5 w-full rounded-xl">
                  <div className="relative group ">
                    <Select
                      id="planForCarPercharsing"
                      inputId="planForCarPercharsing"
                      options={[
                        { value: "1 month", label: "1 month" },
                        { value: "2-3 months", label: "2-3 months" },
                        { value: "3 months+", label: "3 months+" },
                      ]}
                      className={`w-full text-gray-500  ${
                        errors.planForCarPercharsing &&
                        touched.planForCarPercharsing
                          ? "border-red border"
                          : ""
                      } bg-white hover:bg-white focus:ring-4 rounded-lg`}
                      onChange={(e) => {
                        setFieldValue("planForCarPercharsing", e?.value ?? 0);
                      }}
                      isDisabled={step > 1}
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
                    htmlFor="planForCarPercharsing"
                    className="font-deacon13 label-element text-blue1 absolute text-base left-2 transition-all xl:text-black bg-white px-1"
                  >
                    Plan for car percharsing
                  </label>
                  {errors.planForCarPercharsing &&
                    touched.planForCarPercharsing && (
                      <small className="text-red">
                        {errors.planForCarPercharsing}
                      </small>
                    )}
                </div>

                <div className=" relative   mt-4 h-12 input-component mb-5 w-full rounded-xl">
                  <div className="relative group ">
                    <Select
                      id="dealer"
                      inputId="dealer"
                      isDisabled={step > 1}
                      menuPlacement="top"
                      options={[
                        { value: "V Group", label: "V Group" },
                        { value: "Gold integrate", label: "Gold integrate" },
                        { value: "Harmony", label: "Harmony" },
                        { value: "Sensu", label: "Sensu" },
                        {
                          value: "Rungcharoen star ev",
                          label: "Rungcharoen star ev",
                        },
                        { value: "Milestone", label: "Milestone" },
                        { value: "Hangthaithada", label: "Hangthaithada" },
                      ]}
                      className={`w-full text-gray-500 border ${
                        errors.dealer && touched.dealer ? "border-red" : ""
                      } bg-white hover:bg-white focus:ring-4 rounded-lg`}
                      onChange={(e) => {
                        setFieldValue("dealer", e?.value ?? "");
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
                    className="font-deacon13 label-element text-blue1 absolute text-base left-2 transition-all xl:text-black bg-white px-1"
                  >
                    Dealer
                  </label>
                  {errors.dealer && touched.dealer && (
                    <small className="text-red">{errors.dealer}</small>
                  )}
                </div>
              </div>
            </div>

            <div
              className={`w-full shadow-lg bg-white border  rounded-lg mt-4 ${
                step === 3 ? "flex" : "hidden"
              }`}
            >
              <div className="flex flex-col gap-8 justify-center items-center w-full h-fit my-4 pl-4 pr-4">
                <div className="relative mt-4 h-12 input-component mb-5 w-full rounded-xl">
                  <div className="relative group ">
                    <Select
                      id="preferDateSlot"
                      inputId="preferDateSlot"
                      menuPlacement="top"
                      options={dateSlot}
                      className={`w-full text-gray-500  ${
                        errors.preferTimeSlot && touched.preferTimeSlot
                          ? "border-red border"
                          : ""
                      } bg-white hover:bg-white focus:ring-4 rounded-lg`}
                      onChange={(e) => {
                        setFieldValue("preferDateSlot", e?.value ?? "");
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
                    htmlFor="preferDateSlot"
                    className="font-deacon13 label-element text-blue1 absolute text-base left-2 transition-all xl:text-black bg-white px-1"
                  >
                    Prefer date slot
                  </label>
                  {errors.preferDateSlot && touched.preferDateSlot && (
                    <small className="text-red">{errors.dealer}</small>
                  )}
                </div>

                <div className="  relative mt-4 h-14 input-component mb-5 w-full">
                  <div className="relative group ">
                    <Select
                      id="preferTimeSlot"
                      inputId="preferTimeSlot"
                      menuPlacement="top"
                      options={timeSlot}
                      className={`w-full text-gray-500  ${
                        errors.preferTimeSlot && touched.preferTimeSlot
                          ? "border-red border"
                          : ""
                      } bg-white hover:bg-white focus:ring-4 rounded-lg`}
                      onChange={(e) => {
                        setFieldValue("preferTimeSlot", e?.value ?? "");
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
                    htmlFor="preferTimeSlot"
                    className="font-deacon13 label-element text-blue1 absolute text-base left-2 transition-all bg-white px-1"
                  >
                    Prefer time slot
                  </label>
                  {errors.preferTimeSlot && touched.preferTimeSlot && (
                    <small className="text-red">{errors.preferTimeSlot}</small>
                  )}
                </div>

                <div className="w-full text-left">
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
                        checked={values.isLicensed}
                        onClick={() => setFieldValue("isLicensed", true)}
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
                        checked={!values.isLicensed}
                        onClick={() => setFieldValue("isLicensed", false)}
                        className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />{" "}
                      No/ไม่มี
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`w-full  overflow-hidden shadow-lg bg-white bg-opacity-60 border  rounded-lg mt-4 ${
                step === 2 ? "flex" : "hidden"
              }`}
            >
              <div className="flex flex-col gap-8 justify-center items-center w-full my-2 pl-4 pr-4">
                <div className="relative w-full px-4 pr-4 mt-4 border border-black bg-white rounded-xl py-2 overflow-hidden">
                  <div className="font-deacon13  mb-4 text-black text-lg">
                    เมื่อผู้ลงทะเบียนกด ยอมรับ
                    แสดงว่าคุณเข้าใจและตกลงที่จะอนุญาต ให้บริษัทฯ
                    นำข้อมูลส่วนบุคคลของคุณไปใช้ในการทำสื่อโฆษณาประชาสัมพันธ์ติดตามสถานะและยอมรับการส่งเสริมการขายโปรดตรวจสอบนโยบายความเป็นส่วนตัวของเราโดยละเอียด
                    ตามลิ้งค์แนบ
                  </div>
                  <div
                    style={{
                      maxWidth: "100%",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "wrap",
                    }}
                  >
                    <Link
                      href="https://www.aionauto.com/privacy/agreement"
                      className=" text-blue-2 hover:text-blue-1"
                    >
                      <small className=" text-underline  text-base font-deacon13">
                        {" "}
                        https://www.aionauto.com/privacy/agreement
                      </small>
                    </Link>
                  </div>
                </div>
                <div className=" items-center w-full ">
                  <label className="ms-2 text-base  text-gray-900 dark:text-gray-300 font-deacon13">
                    <Field
                      id="approveCheckbox"
                      type="checkbox"
                      value="true"
                      onChange={() => {
                        setFieldValue(
                          "approveCheckbox",
                          values.approveCheckbox ? false : true
                        );
                      }}
                      checked={values.approveCheckbox}
                      className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />{" "}
                    ยอมรับ
                  </label>
                </div>
              </div>
            </div>
            <div className={`w-full mt-4 ${step < 3 ? "flex" : "hidden"}`}>
              <button
                type="button"
                className={`border border-white border-l w-full h-12  bg-blue-1  text-white font-bold  mt-2 mb-2   py-2 px-4 rounded-xl ${
                  checkStep1(errors, values) ? "" : "cursor-not-allowed"
                }`}
                onClick={() => {
                  if (checkStep1(errors, values)) {
                    // scroll to error element
                    if (document) {
                      const errorElement =
                        document.querySelector(".border-red");
                      errorElement?.scrollIntoView({ behavior: "smooth" });
                    }
                    // set step ?step=2
                    if (step === 1) {
                      router.push("/registerAndBooking?step=2");
                    }
                  }

                  if (step === 2 && values.approveCheckbox) {
                    router.push("/registerAndBooking?step=3");
                  }
                  return;
                }}
              >
                {step === 1 ? "SUBMIT" : "ยอมรับ"}
              </button>
            </div>

            <div className={`w-full mt-4 ${step === 3 ? "flex" : "hidden"}`}>
              <button
                type="submit"
                className="border border-white border-l w-full h-12  bg-blue-1  text-white font-bold  mt-2 mb-2   py-2 px-4 rounded-xl"
              >
                SUBMIT
              </button>
            </div>

            {/* modal */}
            <div className="fixed top-0 left-0 w-full h-full bg-opacity-75 bg-white z-50 justify-center items-center hidden">
              <div className="p-8 rounded-lg">
                <p>Loading...</p>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default function MainPage() {
  return (
    <Suspense>
      <Register />
    </Suspense>
  );
}
