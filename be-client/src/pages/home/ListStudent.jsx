/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";

import ListTable from "./ListTable";
// import { Table } from 'flowbite-react';
// import { google } from "googleapis";

const AdminDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showStudentsLimit, setShowStudentsLimit] = useState(0);
  const [sortOption, setSortOption] = useState("");

  const [searchParams, setSearchParams] = useState({
    name: "",
    address: "",
    major: "",
    phone: "",
    sort: "",
    page: 1,
    limit: null,
  });

  useEffect(() => {
    // Khởi tạo userData trước khi fetch
    setUserData([]);

    fetchData(); // Gọi fetchData để đảm bảo dữ liệu mới nhất
  }, [searchParams]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        // "http://localhost:8083/api/user/getDataForAdmin" server cu,
        "https://dashboard-server-bee.vercel.app/api/user/getDataForAdmin",
        {
          params: searchParams,
        }
      );

      if (response.data || response.data.data) {
        setUserData(response.data.data);
        setTotalPages(response.data.data.pagination.limit);
        setCurrentPage(response.data.data.pagination.page);
        setShowStudentsLimit(response.data.data.pagination.total);
      } else {
        console.error(
          "Dữ liệu từ server không đúng định dạng hoặc rỗng:",
          response
        );
      }
    } catch (error) {
      console.error("Error lỗi:", error);
      if (error.response) {
        console.error("Lỗi server từ BE:", error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchParamsChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({ ...prevParams, [name]: value }));
  };

  const handleSearch = () => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      page: 1,
      sort: sortOption,
    }));
  };

  const handlePageChange = (newPage) => {
    setSearchParams((prevParams) => ({ ...prevParams, page: newPage }));
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sendDataToGoogleSheets = async (data) => {
    try {
      const response = await axios.post(
        "https://script.google.com/macros/s/AKfycbzCdDZ7T5o2_3kY3bVNNgHKajOdv471DzWdRICIuiz3GA-igCKDPKr3yl0Sfpwo-LoJxQ/exec",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error sending data to Google Sheets:", error);
    }
  };

  return (
    <div className="bg-banner-login bg-center bg-no-repeat bg-cover max-w-screen-2xl py-4 container mx-auto px-4 lg:px-24 ">
      <h2 className="text-center font-medium mb-10">Trang admin</h2>
      <div>
        <p className="text-sm mb-3 text-red-500 flex items-center">
          {" "}
          <FaFilter className="mr-2" />
          Lọc sinh viên theo
        </p>
        <label className="mb-3 text-sm">
          Họ và tên:
          <input
            type="text"
            name="name"
            placeholder="Nhập họ và tên đầy đủ..."
            value={searchParams.name}
            className="shadow-sm outline-none bg-gray-50 border border-gray-300 text-sm rounded-lg  block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:shadow-sm-light"
            onChange={handleSearchParamsChange}
          />
        </label>
        <label className="mb-3 text-sm">
          Tỉnh thành:
          <input
            type="text"
            name="address"
            placeholder="Nhập địa chỉ(xã, phường nếu có)"
            value={searchParams.address}
            onChange={handleSearchParamsChange}
            className="shadow-sm outline-none bg-gray-50 border border-gray-300 text-sm rounded-lg  block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:shadow-sm-light"
          />
        </label>
        <label className="mb-3 text-sm">
          Ngành học quan tâm:
          <input
            type="text"
            name="major"
            placeholder="Ngành học quan tâm.."
            className="shadow-sm outline-none bg-gray-50 border border-gray-300 text-sm rounded-lg  block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:shadow-sm-light"
            value={searchParams.major}
            onChange={handleSearchParamsChange}
          />
        </label>
        <label className="mb-3 text-sm">
          Số điện thoại:
          <input
            type="text"
            placeholder="+84"
            name="phone"
            className="shadow-sm outline-none bg-gray-50 border border-gray-300 text-sm rounded-lg  block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:shadow-sm-light"
            value={searchParams.phone}
            onChange={handleSearchParamsChange}
          />
        </label>

        <label className="mb-3 text-sm">
          Sắp xếp theo:
          <select
            name="sort"
            value={sortOption}
            onChange={handleSortChange}
            className="shadow-sm outline-none bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:shadow-sm-light"
          >
            <option value="">Không sắp xếp</option>
            <option value="name">Họ và tên</option>
            <option value="address">Tỉnh thành</option>
            <option value="phone">Số điện thoại</option>
            {/* Thêm các tùy chọn sort khác nếu cần */}
          </select>
        </label>

        <button
          onClick={handleSearch}
          className="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Bắt đầu tìm kiếm
        </button>
      </div>
      <div className="mt-5 ">
        <div className="">
          <p className="text-sm mb-3 text-red-500 flex items-center">
            <FaList className="mr-2" /> Danh sách sinh viên
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() =>
                sendDataToGoogleSheets({
                  name: searchParams.name,
                  address: searchParams.address,
                  phone: searchParams.phone,
                  email: searchParams.email,
                  majors: searchParams.major,
                })
              }
              className="my-4 h-[40px] text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Đẩy dữ liệu lên Google Sheets
            </button>
            <Link to="/statistical">
              <button className="my-4 h-[40px] text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Xem trang thống kê
              </button>
            </Link>
            <a
              href="https://dashboard-server-bee.vercel.app/api/user/download"
              onClick={() => document.getElementById("my_modal_2").showModal()}
              className="mb-2 h-[40px] ml-0 md:ml-4 text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Tải File Excel
            </a>
          </div>
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box bg-black">
              <h3 className="font-bold text-lg text-white">
                File excel chứa toàn bộ dữ liệu sinh viên
              </h3>
              <p className="py-4 text-white">Bạn đã tải về thành công</p>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>Đóng thông báo</button>
            </form>
          </dialog>
        </div>

        <p className="bg-white inline-block p-2 mb-2 mt-6 rounded-lg">
          Trang {currentPage} / {Math.round(showStudentsLimit / 20)}, số lượng
          học sinh: {showStudentsLimit}
        </p>

        {loading ? (
          <div className="">
            <p>Đang tải dữ liệu... </p>
            <span className="loading loading-spinner text-primary"></span>
          </div>
        ) : (
          <div className="relative overflow-x-auto ">
            <table className="w-full text-sm text-left rtl:text-right ">
              <thead className=" uppercase  bg-yellow-300 mb-3" align="center">
                <tr className="text-sm  text-center mb-3 ">
                  <th scope="col" className="px-6 py-3">Số thứ tự</th>

                  <th scope="col" className="px-6 py-3">
                    Họ và tên
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Tỉnh thành
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Số điện thoại
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ngành học
                  </th>
                </tr>
              </thead>
              {Array.isArray(userData.data) && userData.data.length > 0 ? (
                <tbody className="bg-white border-b text-white dark:bg-gray-800 dark:border-gray-700">
                  {userData.data.map((user, index) => (
                    <tr
                      key={user._id}
                      className="text-center border border-white "
                    >
                      <td className="px-6 py-4">{index + 1}</td>

                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.address}</td>
                      <td className="px-6 py-4">{user.phone}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.majors.join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="4" className="text-center">
                      Không có dữ liệu.
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
            <div className="mt-5">
              <button
                onClick={() => handlePageChange(searchParams.page - 1)}
                type="button"
                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
              >
                Trang Trước
              </button>

              {/* Ví dụ về nút "Trang Sau" */}
              <button
                onClick={() => handlePageChange(searchParams.page + 1)}
                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                Trang Sau
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
