import React, { useState } from "react";
import axios from "axios";

//xác thực thành công thì thông tin user như email,name,school,phone... sẽ lưu lại và truyền qua ông này, ông này nhận formData
// eslint-disable-next-line react/prop-types
const SaveUserExel = ({ formData }) => {
  console.log(formData);
  const handleExportExcel = async () => {
    try {
      // Gửi dữ liệu người dùng lên server
      const response = await axios.post(
        "http://localhost:3000/api/exportFileXlsx",
        formData,
        {
          responseType: "arraybuffer", // Cần thiết để nhận file Excel từ server
        }
      );
      // Tạo một blob từ dữ liệu nhận được
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      // Tạo một đường dẫn URL tạm thời cho blob
      const url = URL.createObjectURL(blob);
      // Tạo một thẻ a để thực hiện việc tải xuống
      const a = document.createElement("a");
      a.href = url;
      a.download = "data.xlsx";
      document.body.appendChild(a);
      a.click();

      // Xóa thẻ a sau khi tải xuống hoàn tất
      document.body.removeChild(a);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="px-4 py-4">
      <button onClick={handleExportExcel}>Xuất file Excel</button>
      <button className="mb-4 block text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <a href="https://dashboard-server-bee.vercel.app/api/user/download">
          Lưu thành File Excel
        </a>
      </button>
    </div>
  );
};

export default SaveUserExel;
