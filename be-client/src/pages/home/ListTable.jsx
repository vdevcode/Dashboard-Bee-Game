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
        "https://dashboard-server-bee.vercel.app/api/user/ranking",
        {
         data
        }
      );

      if (response.data || response.data.data) {
        setUserRaking(response.data.data);
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
      {userRaking}
    </div>
  );
};

export default ListTable;
