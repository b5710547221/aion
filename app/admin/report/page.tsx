"use client";
import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { FC, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import * as FileSaver from "file-saver";
import Select from "react-select";
import logo_aion from "./../../../assets/images/aion_logo.png";
import XLSX from "sheetjs-style";
import Swal from "sweetalert2";
import timezone from "dayjs/plugin/timezone";
import buddhistEra from "dayjs/plugin/buddhistEra";
import "dayjs/locale/th";

dayjs.extend(timezone);
dayjs.extend(buddhistEra);

// default timezone
dayjs.tz.setDefault("Asia/Bangkok");

// cancelToken
let source = axios.CancelToken.source();

interface IAdminReportSearch {
  search: string;
  preferDateSlot?: string | null;
  preferTimeSlot?: string | null;
  totalRows: number;
  offset: number;
  limit: number;
  order: string;
  orderBy: string;
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
  updatedAt?: string;
  createdAt?: string;
  bookingAt?: string;
}
interface APIResponse {
  isSuccess: boolean;
  data: {
    data: UserCreateDto[];
    count: number;
    offset: number;
  };
  message?: string;
}

function AdminReportPage() {
  const [search, setSearch] = useState<IAdminReportSearch>({
    search: "",
    preferDateSlot: null,
    preferTimeSlot: null,
    totalRows: 0,
    offset: 0,
    limit: 50,
    order: "desc",
    orderBy: "id",
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserCreateDto | null>(null);

  const [users, setUsers] = useState<UserCreateDto[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const mapNameToDataColumn = useCallback((name: string) => {
    switch (name) {
      case "Name":
        return "name";
      case "Email":
        return "email";
      case "Phone":
        return "phone";
      case "Interest Model":
        return "interestModel";
      case "Plan For Car Purchasing":
        return "planForCarPercharsing";
      case "Dealer":
        return "dealer";
      case "Prefer Date Slot":
        return "preferDateSlot";
      case "Prefer Time Slot":
        return "preferTimeSlot";
      case "Is Licensed":
        return "isLicensed";
      case "Updated At":
        return "updatedAt";
      case "Booking At":
        return "bookingAt";
      case "createdAt":
        return "createdAt";
      default:
        return "name";
    }
  }, []);

  const handleSelectRow = useCallback((row: UserCreateDto) => {
    setSelectedUser(row);
    setShowModal(true);
  }, []);

  const fetchAllData = useCallback(async () => {
    if (search.totalRows === 0) return [];
    // loop fetch data by search
    const datas: UserCreateDto[] = [];
    try {
      const totalRows = search.totalRows;
      let currentPages = 0;
      const limit = search.limit;

      // loop fetch data by search
      while (currentPages < totalRows) {
        const response: AxiosResponse<APIResponse, any> = await axios({
          method: "GET",
          url: "https://aion-api.showkhun.com/user",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          params: {
            search: search.search,
            preferDateSlot: search.preferDateSlot,
            preferTimeSlot: search.preferTimeSlot,
            offset: currentPages,
            limit: limit,
            order: search.order,
            orderBy: search.orderBy,
          },
          cancelToken: source.token,
        });
        if (response.data.isSuccess) {
          datas.push(...response.data.data.data);
          currentPages += limit;
        }
      }

      return datas;
    } catch (error) {
      return [];
    }
  }, [search]);

  const handleDownloadExcel = useCallback(
    async (usrs: UserCreateDto[], isAll: boolean = false) => {
      setIsLoad(true);
      let dats: UserCreateDto[] = [];
      if (isAll) {
        // fetch all data by search
        dats = await fetchAllData();
      } else {
        dats = usrs;
      }
      if (dats.length === 0) {
        Swal.fire({
          icon: "warning",
          title: "ไม่พบข้อมูล",
          text: "ไม่พบข้อมูลที่ต้องการดาวน์โหลด",
        });
        setIsLoad(false);
        return;
      }
      try {
        // create a new workbook with filter header and remap column name
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(
          dats.map((item) => {
            let isLC = "-";
            if (item.preferTimeSlot !== null && item.preferTimeSlot !== "") {
              isLC = item.isLicensed ? "Yes" : "No";
            }
            return {
              Name: item.name,
              Email: item.email,
              Phone: item.phone,
              "Interest Model": item.interestModel,
              "Plan For Car Purchasing": item.planForCarPercharsing,
              Dealer: item.dealer,
              "Prefer Date Slot": item.preferDateSlot
                ? dayjs(item.preferDateSlot).locale("th").format("DD/MM/BBBB")
                : "-",
              "Prefer Time Slot": item.preferTimeSlot ?? "-",
              "Is Licensed": isLC,
              "Created At": item.createdAt
                ? dayjs(item.createdAt).format("DD/MM/BBBB HH:mm")
                : "-",
              "Booking At": item.bookingAt
                ? dayjs(item.bookingAt).format("DD/MM/BBBB HH:mm")
                : "-",
              "Updated At": item.updatedAt
                ? dayjs(item.updatedAt).format("DD/MM/BBBB HH:mm")
                : "-",
            };
          })
        );
        // set column width
        ws["!cols"] = [
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 100 },
          { wpx: 150 },
          { wpx: 100 },
          { wpx: 150 },
          { wpx: 100 },
          { wpx: 100 },
          { wpx: 100 },
          { wpx: 150 },
          { wpx: 150 },
          { wpx: 150 },
        ];
        // set column header style and filter data
        ws["!autofilter"] = { ref: "A1:J1" };
        ws["!filter"] = { ref: "A1:J1" };
        // set column Prefer Date Slot to date type and set date format
        XLSX.utils.book_append_sheet(wb, ws, "Report");
        const excelBuffer = XLSX.write(wb, {
          bookType: "xlsx",
          type: "array",
        });
        const blob = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        });
        // Download the excel browser
        FileSaver.saveAs(blob, `Report.xlsx`);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: (error as any).message,
        });
      } finally {
        setIsLoad(false);
      }
    },
    [fetchAllData]
  );

  const handleSearch = useCallback(async (ps?: IAdminReportSearch) => {
    source.cancel();
    source = axios.CancelToken.source();
    setIsLoad(true);
    try {
      const response: AxiosResponse<APIResponse, any> = await axios({
        method: "GET",
        url: "https://aion-api.showkhun.com/user",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        params: {
          search: ps?.search ?? "",
          preferDateSlot: ps?.preferDateSlot ?? undefined,
          preferTimeSlot: ps?.preferTimeSlot ?? undefined,
          offset: ps?.offset ?? 0,
          limit: ps?.limit ?? 50,
          order: ps?.order ?? "desc",
          orderBy: ps?.orderBy ?? "id",
        },
        cancelToken: source.token,
      });
      if (response.data.isSuccess) {
        setUsers(response.data.data.data);
        setSearch((prev) => ({
          ...prev,
          totalRows: response.data.data.count,
          offset: ps?.offset ?? prev.offset,
          limit: ps?.limit ?? prev.limit,
          order: ps?.order ?? prev.order,
          orderBy: ps?.orderBy ?? prev.orderBy,
        }));
      }
      setIsLoad(false);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        setIsLoad(false);
      }
    }
  }, []);

  const handleMenuSearch = useCallback(
    (
      s: string,
      preferDateSlot?: string | null,
      preferTimeSlot?: string | null
    ) => {
      if (s !== "" && !preferDateSlot && !preferTimeSlot) {
        handleSearch({
          ...search,
          search: s,
          offset: 0,
        });
        return;
      }
      handleSearch({
        ...search,
        preferDateSlot,
        preferTimeSlot,
        offset: 0,
        search: s,
      });
    },
    [handleSearch, search]
  );

  const handleOnTableSort = useCallback(
    async (column: any, sortDirection: any) => {
      if (!column.name) return;
      const order = sortDirection === "asc" ? "asc" : "desc";
      const columnData = mapNameToDataColumn(column.name);
      handleSearch({ ...search, order, orderBy: columnData, offset: 0 });
    },
    [handleSearch, mapNameToDataColumn, search]
  );

  const handlePaginationChange = useCallback(
    (page: number, _totalRows: number) => {
      handleSearch({ ...search, offset: (page - 1) * search.limit });
    },
    [handleSearch, search]
  );

  const handlePaginationPerpageChange = useCallback(
    (newPerPage: number, _page: number) => {
      handleSearch({
        ...search,
        limit: newPerPage,
        offset: 0,
      });
    },
    [handleSearch, search]
  );

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const columns: TableColumn<UserCreateDto>[] = useMemo(
    () => [
      {
        name: "Name",
        // custom header
        customHeader: (column: any) => {
          return (
            <div className="text-center">
              <span>{column.name}</span>
            </div>
          );
        },
        selector: (row) => row.name,
        cell: (row) => {
          return <HilightedText needle={search.search} haystack={row.name} />;
        },
        sortable: true,
        width: "200px",
      },
      {
        name: "Email",
        selector: (row) => (row.email && row.email !== "" ? row.email : "-"),
        cell: (row) => {
          return <HilightedText needle={search.search} haystack={row.email} />;
        },
        sortable: true,
        width: "150px",
      },
      {
        name: "Phone",
        selector: (row) => (row.phone && row.phone !== "" ? row.phone : "-"),
        cell: (row) => {
          return <HilightedText needle={search.search} haystack={row.phone} />;
        },
        sortable: true,
        width: "120px",
      },
      {
        name: "Interest Model",
        selector: (row) =>
          row.interestModel && row.interestModel !== ""
            ? row.interestModel
            : "-",
        sortable: true,
        width: "170px",
      },
      {
        name: "Plan For Car Purchasing",
        selector: (row) =>
          row.planForCarPercharsing && row.planForCarPercharsing !== ""
            ? row.planForCarPercharsing
            : "-",
        sortable: true,
        center: true,
      },
      {
        name: "Dealer",
        selector: (row) => (row.dealer && row.dealer !== "" ? row.dealer : "-"),
        sortable: true,
        width: "170px",
      },
      {
        name: "Date Slot",
        selector: (row) =>
          row?.preferDateSlot ? dayjs(row.preferDateSlot).unix() : 0,
        // custom render
        cell: (row) =>
          row.preferDateSlot
            ? dayjs(row.preferDateSlot).locale("th").format("DD MMM BBBB")
            : "-",
        sortable: true,
        center: true,
        width: "120px",
      },
      {
        name: "Time Slot",
        selector: (row) =>
          row.preferTimeSlot && row.preferTimeSlot !== ""
            ? row.preferTimeSlot
            : "-",
        sortable: false,
        center: true,
        width: "100px",
      },
      {
        name: "Is Licensed",
        selector: (row) => {
          if (row.preferTimeSlot !== null && row.preferTimeSlot !== "") {
            return row.isLicensed ? "Yes" : "No";
          }
          return "-";
        },
        center: true,
        width: "100px",
      },
      {
        name: "Created At",
        selector: (row) => (row.createdAt ? dayjs(row.createdAt).unix() : 0),
        cell: (row) =>
          row.createdAt
            ? dayjs(row.createdAt).locale("th").format("DD MMMM BBBB HH:mm")
            : "-",
        sortable: true,
        center: true,
        width: "170px",
      },
      {
        name: "Booking At",
        selector: (row) => (row.bookingAt ? dayjs(row.bookingAt).unix() : 0),
        cell: (row) =>
          row.bookingAt
            ? dayjs(row.bookingAt).locale("th").format("DD MMMM BBBB HH:mm")
            : "-",
        sortable: true,
        center: true,
        width: "170px",
      },
      {
        name: "Updated At",
        selector: (row) => (row.updatedAt ? dayjs(row.updatedAt).unix() : 0),
        cell: (row) =>
          row.updatedAt
            ? dayjs(row.updatedAt).locale("th").format("DD MMMM BBBB HH:mm")
            : "-",
        sortable: true,
        center: true,
        width: "170px",
      },
    ],
    [search.search]
  );

  return (
    <div className="w-full mb-12 px-4 xl:px-8">
      <div
        className={`fixed top-0 left-0 z-50 w-full h-full bg-white bg-opacity-60 items-center justify-center ${
          isLoad ? "flex" : "hidden"
        }`}
      >
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>

      <div className="w-full flex justify-center  mt-3">
        <Link href="/">
          <Image alt="test" src={logo_aion} width={350} height={100} />
        </Link>
      </div>

      <div className="w-full text-center  mt-8">
        {/*   <Image  alt="test" src={text2} width={350} height={100}/> */}
        <div>
          <p className="font-deacon5  text-white text-2xl">
            Admin: Report Test-Drive User
          </p>
        </div>
        <div>
          <p className="font-deacon8 text-white text-xl">
            <br />
            AION Thailand @Motor Show 2024
            <br />
          </p>
        </div>
      </div>

      <div className="w-full mt-8 ">
        {/* Search navigation */}
        <div className="w-full flex justify-end">
          <div className="w-full flex justify-end gap-4 flex-col xl:flex-row">
            <div className="w-full xl:w-3/12">
              <input
                className="w-full h-12 px-3 rounded-md"
                type="text"
                placeholder="Search by Name, Email, Phone"
                onChange={(e) => {
                  setSearch((prev) => ({
                    ...prev,
                    search: e.target.value,
                  }));
                }}
                // enter key press
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleMenuSearch(search.search);
                  }
                }}
              />
            </div>

            <div className="w-full xl:w-3/12">
              <Select
                options={dateSlot}
                placeholder="Select Date"
                className="w-full h-12"
                isClearable
                styles={{
                  control: (styles) => ({
                    ...styles,
                    backgroundColor: "white",
                    borderRadius: "5px",
                    height: "3rem",
                  }),
                }}
                onChange={(selected) => {
                  setSearch((prev) => ({
                    ...prev,
                    preferDateSlot: selected?.value,
                  }));
                }}
              />
            </div>

            <div className="w-full xl:w-3/12">
              <Select
                options={timeSlot}
                placeholder="Select Time"
                className="w-full h-12"
                isClearable
                styles={{
                  control: (styles) => ({
                    ...styles,
                    backgroundColor: "white",
                    borderRadius: "5px",
                    height: "3rem",
                  }),
                }}
                onChange={(selected) => {
                  setSearch((prev) => ({
                    ...prev,
                    preferTimeSlot: selected?.value,
                  }));
                }}
              />
            </div>

            <button
              type="button"
              className="w-full xl:w-1/12 h-12 bg-blue-500 text-white border border-white border-l  bg-blue-1 font-bold  py-2 rounded-xl"
              onClick={() =>
                handleMenuSearch(
                  search.search,
                  search.preferDateSlot,
                  search.preferTimeSlot
                )
              }
            >
              Search
            </button>
          </div>
        </div>
      </div>
      {/* export excel button */}
      <div className="w-full mt-4 flex justify-end">
        <button
          onClick={() => {
            Swal.fire({
              icon: "warning",
              title: "ต้องการดาวน์โหลดข้อมูลทั้งหมดหรือไม่?",
              // custom button 'ทั้งหมด' and 'บางส่วน'
              showCancelButton: true,
              confirmButtonText: "ทั้งหมด",
              cancelButtonText: "แค่หน้านี้",
            }).then((result) => {
              if (result.isConfirmed) {
                handleDownloadExcel(users, true);
              } else {
                handleDownloadExcel(users);
              }
            });
          }}
          className=" w-44 h-12 bg-green-500 text-white rounded-md flex items-center justify-center"
          disabled={isLoad || users.length === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 256 256"
            className="fill-current mr-2"
          >
            <g fill="currentColor" strokeMiterlimit="10" strokeWidth="6">
              <path
                d="M77.474 17.28L61.526 1.332A4.516 4.516 0 0058.311 0H15.742a4.553 4.553 0 00-4.548 4.548v80.904A4.553 4.553 0 0015.742 90h58.516a4.554 4.554 0 004.549-4.548V20.496a4.517 4.517 0 00-1.333-3.216zM61.073 5.121l12.611 12.612H62.35a1.278 1.278 0 01-1.276-1.277V5.121zM15.742 3h42.332v13.456a4.281 4.281 0 004.276 4.277h13.457v33.2H14.194V4.548A1.55 1.55 0 0115.742 3zm58.516 84H15.742a1.55 1.55 0 01-1.548-1.548V56.934h61.613v28.519A1.55 1.55 0 0174.258 87z"
                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
              ></path>
              <path
                d="M62.702 82.28h-6.334a1.5 1.5 0 010-3h6.334a.95.95 0 00.948-.948v-3.404a.95.95 0 00-.948-.948h-3.886a3.952 3.952 0 01-3.948-3.948v-3.404a3.952 3.952 0 013.948-3.948h4.313a1.5 1.5 0 010 3h-4.313a.95.95 0 00-.948.948v3.404a.95.95 0 00.948.948h3.886a3.952 3.952 0 013.948 3.948v3.404a3.952 3.952 0 01-3.948 3.948zM49.898 82.343h-5.969a4.351 4.351 0 01-4.347-4.346V64.179a1.5 1.5 0 113 0v13.818c0 .742.604 1.346 1.347 1.346h5.969a1.5 1.5 0 010 3zM30.937 72.479l4.02-7.6a1.5 1.5 0 10-2.651-1.402l-3.066 5.795-3.066-5.795a1.5 1.5 0 00-2.651 1.402l4.02 7.6-4.02 7.6a1.5 1.5 0 102.651 1.402l3.066-5.795 3.066 5.795a1.499 1.499 0 102.651-1.402l-4.02-7.6z"
                transform="matrix(2.81 0 0 2.81 1.407 1.407)"
              ></path>
            </g>
          </svg>
          Export to Excel
        </button>
      </div>

      {/* Table */}
      <div className="w-full mt-4">
        <DataTable
          columns={columns}
          data={users}
          progressPending={isLoad}
          sortServer
          onSort={handleOnTableSort}
          // paginationServer
          paginationServer
          pagination
          paginationPerPage={search.limit}
          paginationTotalRows={search.totalRows}
          paginationRowsPerPageOptions={[10, 50, 100, 200, 500, 1000]}
          onChangePage={handlePaginationChange}
          onChangeRowsPerPage={handlePaginationPerpageChange}
          onRowClicked={handleSelectRow}
        />
      </div>

      {/* Modal detail */}
      <div
        className={`fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-60 items-center justify-center ${
          showModal ? "flex" : "hidden"
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowModal(false);
            setSelectedUser(null);
          }
        }}
      >
        <div className="w-1/2 bg-white p-4 rounded-lg">
          <div className="flex justify-between border-b-2 border-b-gray-400 py-2">
            <h1 className="text-2xl font-bold">User Detail</h1>
            <button
              onClick={() => {
                setShowModal(false);
                setSelectedUser(null);
              }}
              className="text-red-500"
            >
              Close
            </button>
          </div>
          <div className="mt-4">
            <p>Name: {selectedUser?.name}</p>
            <p>Email: {selectedUser?.email}</p>
            <p>Phone: {selectedUser?.phone}</p>
            <p>Interest Model: {selectedUser?.interestModel}</p>
            <p>
              Plan For Car Purchasing: {selectedUser?.planForCarPercharsing}
            </p>
            <p>Dealer: {selectedUser?.dealer}</p>
            <p>
              Prefer Date Slot:{" "}
              {selectedUser?.preferDateSlot
                ? dayjs(selectedUser?.preferDateSlot)
                    .locale("th")
                    .format("DD MMMM BBBB")
                : "-"}
            </p>
            <p>
              Prefer Time Slot:{" "}
              {selectedUser?.preferTimeSlot &&
              selectedUser.preferTimeSlot !== ""
                ? selectedUser.preferTimeSlot
                : "-"}
            </p>
            <p>
              Is Licensed:{" "}
              {selectedUser?.preferTimeSlot !== null &&
              selectedUser?.preferTimeSlot !== ""
                ? selectedUser?.isLicensed
                  ? "Yes"
                  : "No"
                : "-"}
            </p>
            <p>
              Updated At:{" "}
              {selectedUser?.updatedAt
                ? dayjs(selectedUser?.updatedAt)
                    .locale("th")
                    .format("DD MMMM BBBB HH:mm")
                : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
interface HilightedTextProps {
  needle: string;
  haystack: string;
}
const HilightedText: FC<HilightedTextProps> = ({ needle, haystack }) => {
  const [results, setResults] = useState<string[]>([]);
  useEffect(() => {
    if (needle !== "" && needle !== "\\") {
      const regEx = new RegExp(`(${needle})`, "i");
      setResults(haystack?.split(regEx));
    } else {
      setResults(haystack?.split(""));
    }
  }, [needle, haystack]);

  return (
    <span>
      {results?.length > 0 &&
        results.map((item, i) => {
          if (needle?.toUpperCase() === item?.toUpperCase()) {
            return (
              <mark
                key={
                  "mykey-" + needle?.toUpperCase() + "-" + item + "-" + (i + 1)
                }
              >
                {item}
              </mark>
            );
          }
          return `${item}`;
        })}
    </span>
  );
};
export default function MainPage() {
  return (
    <Suspense>
      <AdminReportPage />
    </Suspense>
  );
}
