"use client";
import Link from "@/node_modules/next/link";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import { useCallback, useState } from "react";
import Select from "react-select";
import { boolean, object, string } from "yup";
import logo_aion from "./../../assets/images/aion_logo.png";
import DatePicker from "react-datepicker";
import axios from "axios";
import Swal from "sweetalert2";

import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
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
}

const yupSchema = object().shape({
  name: string().required("Name is required").min(2),
  email: string().email().required("Email is required").email(),
  phone: string().required("Phone is required").min(9).max(13),
  interestModel: string().required("Interest Model is required"),
  planForCarPercharsing: string()
    .required("Plan for car percharsing is required")
    .min(1),
  dealer: string().required("Dealer is required"),
  preferDateSlot: string().required("Prefer Date Slot is required"),
  preferTimeSlot: string().required("Prefer Time Slot is required"),
  isLicensed: boolean().required("Is Licensed is required"),
});

export default function Register() {
  const [isLoad, setIsLoad] = useState(false);
  const handleSubmit = useCallback(async (values: RegisterFormValues) => {
    setIsLoad(true);
    try {
      const response = await axios({
        method: "POST",
        url: "https://aion-api.showkhun.com/user",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        data: values,
      });
      if (response.data && response?.data?.isSussess) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Register Success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          location.href = "/thankYou";
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
    <div className="w-full mb-12 pl-8 pr-8  ">
      <div className="w-full flex justify-center  mt-8">
        <Image alt="test" src={logo_aion} width={350} height={100} />
      </div>
      <div className="w-full text-center mt-8">
        {/*  <Image alt="test" src={text2} width={350} height={100}/> */}
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
          preferTimeSlot: "10:00 AM",
          isLicensed: true,
        }}
        onSubmit={async (values: RegisterFormValues) => {
          await handleSubmit(values);
        }}
        validationSchema={yupSchema}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <div className="w-full   overflow-hidden shadow-lg bg-white border  rounded-lg mt-8">
              <div className="flex flex-col gap-8 justify-center items-center w-full h-fit my-4 pl-4 pr-4">
                <div className="  relative mt-4 h-14 input-component mb-5 w-full">
                  <Field
                    id="name"
                    type="text"
                    name="name"
                    className={`h-full w-full border  px-2 transition-all  rounded-lg ${
                      errors.name && touched.name
                        ? "border-red"
                        : "border-black"
                    }`}
                    placeholder="ชื่อ - สกุล"
                  />
                  <label
                    htmlFor="name"
                    className="font-deacon13 text-blue1 absolute text-lg left-2 transition-all bg-white px-1"
                  >
                    Name-Surname / ชื่อ-สกุล *
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
                    className={`h-full w-full border  px-2 transition-all  rounded-lg ${
                      errors.phone && touched.phone
                        ? "border-red"
                        : "border-black"
                    }`}
                    placeholder="012-345-6789"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    // display by pattern
                    value={values.phone.replace(
                      /(\d{3})(\d{3})(\d{4})/,
                      "$1-$2-$3"
                    )}
                    title="Error Message"
                  />
                  <label
                    htmlFor="phone"
                    className="font-deacon13 text-blue1 absolute text-lg left-2 transition-all bg-white px-1"
                  >
                    Phone number / เบอร์โทรติดต่อ *
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
                  />
                  <label
                    htmlFor="email"
                    className="font-deacon13 text-blue1 absolute text-lg left-2 transition-all bg-white px-1"
                  >
                    E-mail
                  </label>
                  {errors.email && touched.email && (
                    <small className="text-red">{errors.email}</small>
                  )}
                </div>

                <div className=" relative   mt-4 h-12 input-component mb-5 w-full rounded-lg">
                  <div className="relative group ">
                    {/* <button
                      onClick={handleDropDown1}
                      id="dropdownDefaultButton"
                      data-dropdown-toggle="dropdown1"
                      className="text-gray-500 w-full h-14 border border-black bg-white hover:bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-right inline-flex items-center dark:bg-white dark:hover:bg-white dark:focus:ring-blue-800 z-10"
                      type="button"
                    >
                      <p className="w-full pl-4 justify-start flex">
                        {" "}
                        Hyper HT
                      </p>
                      <div className="justify-end flex w-full">
                        <svg
                          className="w-2.5 h-2.5 ms-3 mr-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </div>
                    </button>

                    <div
                      id="dropdown1"
                      className={`h-36 overflow-auto w-full  bg-white border border-black divide-y divide-gray-100 rounded-lg shadow xl:w-44 dark:bg-gray-700 ${
                        isOpen1 ? "block" : "hidden"
                      } z-20`}
                    >
                      <ul
                        className="z-20  w-full  text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton"
                      >
                        <li>
                          <a
                            href="#"
                            className="w-full block px-4 py-2  bg-low1 dark:hover:text-white"
                          >
                            Hyper HT
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="w-full  block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Hyper SSR
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="w-full block px-4 py-2 bg-low1 dark:hover:text-white"
                          >
                            Y Plus Premium 490
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="w-full  block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Y Plus Premium 410
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="w-full  block px-4 py-2 bg-low1 dark:hover:text-white"
                          >
                            Y Plus Elite
                          </a>
                        </li>
                      </ul>
                    </div> */}
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
                      className={`w-full text-gray-500 border ${
                        errors.interestModel && touched.interestModel
                          ? "border-red"
                          : "border-black"
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
                    className="font-deacon13 absolute text-lg left-2 transition-all text-black bg-white px-1"
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
                      className={`w-full text-gray-500 border ${
                        errors.planForCarPercharsing &&
                        touched.planForCarPercharsing
                          ? "border-red"
                          : "border-black"
                      } bg-white hover:bg-white focus:ring-4 rounded-lg`}
                      onChange={(e) => {
                        setFieldValue("planForCarPercharsing", e?.value ?? 0);
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
                    htmlFor="planForCarPercharsing"
                    className="font-deacon13 text-blue1 absolute text-lg left-2 transition-all xl:text-black bg-white px-1"
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
                        errors.dealer && touched.dealer
                          ? "border-red"
                          : "border-black"
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
                    className="font-deacon13 text-blue1 absolute text-lg left-2 transition-all xl:text-black bg-white px-1"
                  >
                    Dealer
                  </label>
                  {errors.dealer && touched.dealer && (
                    <small className="text-red">{errors.dealer}</small>
                  )}
                </div>

                <div className="relative mt-4 h-12 input-component mb-5 w-full rounded-xl">
                  <div className="relative group ">
                    <DatePicker
                      selected={
                        values.preferDateSlot !== ""
                          ? dayjs(values.preferDateSlot).toDate()
                          : dayjs().toDate()
                      }
                      id="preferDateSlot"
                      portalId="root-portal"
                      onChange={(date) => {
                        setFieldValue(
                          "preferDateSlot",
                          dayjs(date).format("YYYY-MM-DD")
                        );
                      }}
                      customInput={
                        <div
                          className={`w-full text-gray-500 border ${
                            errors.preferDateSlot && touched.preferDateSlot
                              ? "border-red"
                              : "border-black"
                          } bg-white hover:bg-white focus:ring-4 rounded-lg w-full focus:border-blue1 h-14 flex items-center justify-center px-2`}
                        >
                          {values.preferDateSlot !== ""
                            ? dayjs(values.preferDateSlot).format("DD-MMM-YYYY")
                            : "Select Date"}
                        </div>
                      }
                    />
                  </div>
                  <label
                    htmlFor="preferDateSlot"
                    className="font-deacon13 text-blue1 absolute text-lg left-2 transition-all xl:text-black bg-white px-1"
                  >
                    Prefer date slot / โปรดล็อกวัน
                  </label>
                  {errors.preferDateSlot && touched.preferDateSlot && (
                    <small className="text-red">{errors.dealer}</small>
                  )}
                </div>

                <div className="  relative mt-4 h-14 input-component mb-5 w-full">
                  <Field
                    id="preferTimeSlot"
                    type="text"
                    name="preferTimeSlot"
                    className={`h-full w-full border  px-2 transition-all  rounded-lg ${
                      errors.preferTimeSlot && touched.preferTimeSlot
                        ? "border-red"
                        : "border-black"
                    }`}
                    placeholder="ex. 10:00 AM"
                  />
                  <label
                    htmlFor="preferTimeSlot"
                    className="font-deacon13 text-blue1 absolute text-lg left-2 transition-all bg-white px-1"
                  >
                    Prefer time slot
                  </label>
                  {errors.preferTimeSlot && touched.preferTimeSlot && (
                    <small className="text-red">{errors.preferTimeSlot}</small>
                  )}
                </div>

                <div className="w-full text-left">
                  <label className="font-bold text-lg text-blue1">
                    Do you have a driver licnse? / คุณมีใบขับขี่หรือไม่ ?{" "}
                  </label>
                  <div className=" items-center w-full ">
                    {/* radiobox */}
                    <label className="ms-2 text-lg  text-gray-900 dark:text-gray-300 font-deacon13 mr-5">
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
                    <label className="ms-2 text-lg  text-gray-900 dark:text-gray-300 font-deacon13">
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

                <div className="relative w-full px-4 pr-4 mt-4 h-fit border border-black rounded-xl ">
                  <label className="font-deacon13  mb-4 text-black text-lg">
                    เมื่อผู้ลงทะเบียนกด ยอมรับ
                    แสดงว่าคุณเข้าใจและตกลงที่จะอนุญาต ให้บริษัทฯ
                    นำข้อมูลส่วนบุคคลของคุณไปใช้ในการทำสื่อโฆษณาประชาสัมพันธ์ติดตามสถานะและยอมรับการส่งเสริมการขายโปรดตรวจสอบนโยบายความเป็นส่วนตัวของเราโดยละเอียด
                    ตามลิ้งค์แนบ
                  </label>
                  <div id="link1">
                    <Link href="https://www.aionauto.com/privacy/agreement">
                      <label className=" text-black text-underline xl:text-blue1 text-lg font-deacon13">
                        {" "}
                        https://www.aionauto.com/privacy/agreement
                      </label>
                    </Link>
                  </div>
                </div>
                <div className=" items-center w-full ">
                  <input
                    id="link-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ms-2 text-lg  text-gray-900 dark:text-gray-300 font-deacon13">
                    ยอมรับ
                  </label>
                </div>
                <div className="ml-2 mr-2 w-full">
                  <button
                    type="submit"
                    className="border border-white border-l w-full h-12  bg-blue-1  text-white font-bold  mt-2 mb-2   py-2 px-4 rounded-xl"
                  >
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
