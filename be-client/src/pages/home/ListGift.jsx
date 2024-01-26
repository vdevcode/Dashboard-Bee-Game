import React, { useState, useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

const ListGift = () => {
  const [gift, setGift] = React.useState([]);
  const [loading, setLoading] = useState();
  console.log(gift);

  useEffect(() => {
    setGift([]);

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        // "http://localhost:8083/api/user/getDataForAdmin" server cu,
        "https://dashboard-server-bee.vercel.app/api/gift/getGiftUpdate"
      );

      if (response.data || response.data.data) {
        setGift(response.data.data);
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
           <h2 className="text-center font-medium mb-10">Danh sách nhận quà</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Tên</th>
              <th>Số điện thoại</th>
              <th>Quà</th>
              <th>Ngày cập nhật</th>
            </tr>
          </thead>
          <tbody>
            {gift.map((gifts, index) => (
              <tr key={index}>
                {/* <td>{gifts.owners.length}</td> */}
                <td>
                  {gifts.owners.length > 0
                    ? `${gifts.owners[0].name}`
                    : "Chưa có người nhận"}
                </td>
                <td> {gifts.owners.length > 0
                    ? `${gifts.owners[0].phone}`
                    : "Chưa có  số điện thoại"}</td>
                <td>{gifts.name}</td>
                    <td>{gifts.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListGift;
