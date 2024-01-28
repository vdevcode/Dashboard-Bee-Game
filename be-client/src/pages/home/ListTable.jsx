/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";

const ListTable = () => {
  const [userRaking, setUserRaking] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(userRaking);
  useEffect(() => {
    // Khởi tạo userData trước khi fetch
    setUserRaking([]);

    fetchData(); // Gọi fetchData để đảm bảo dữ liệu mới nhất
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        // "http://localhost:8083/api/user/getDataForAdmin" server cu,
        "https://dashboard-server-bee.vercel.app/api/user/ranking"
      );

      if (response.data || response.data.data) {
        setUserRaking(response.data.data);
        console.log(response);
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

  return (
    <div className="bg-banner-login bg-center bg-no-repeat bg-cover max-w-screen-2xl py-4 container mx-auto px-4 lg:px-24">
         <h2 className="text-center font-medium mb-10">Trang nhận quà</h2>
      <div className="overflow-x-auto">
     
        <table className="table">
          {/* head */}
          <thead className=" uppercase  bg-yellow-300 mb-3" align="center">
            <tr>
              <th>Số thứ tự</th>
              <th>Tên</th>
              <th>Số điện thoại</th>
              <th>Điểm số</th>
              <th>Trường học</th>
              <th>Email </th>
              <th>Quà</th>
              <th>Tỉnh thành</th>
              <th>Ngày tạo</th>
              <th>Ngày cập nhật</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {userRaking.map((raking, index) => (
              <tr className="bg-base-200 text-[.8rem]" key={index}>
                <th>{index+1}</th>
                <th>{raking.email}</th>
                <td>{raking.phone}</td>
                <td>{raking.highestScore}</td>
                <td>{raking.school}</td>
                <td>{raking.email}</td>
                <td>Được nhận</td>
                <td>{raking.address}</td>
                <td>{raking.createdAt}</td>
                <td>{raking.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTable;
