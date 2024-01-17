import React, { useState } from 'react';
import axios from 'axios';
import SaveUserExel from '../saveInfor/SaveUserExcel';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    school: '', 
    majors: '',
    phone: '',
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8083/api/register', {
        email: formData.email,
        name: formData.name,
        address: formData.address,
        majors: formData.majors,
        phone: formData.phone,
      });

      console.log('Đăng ký thành công!', response.data);

      // Chuyển đến bước nhập OTP hoặc hiển thị thông báo thành công tùy thuộc vào logic của bạn.
    } catch (error) {
      console.error('Lỗi khi đăng ký:', error.response ? error.response.data : error.message);
      // Xử lý lỗi khi đăng ký không thành công
    }
  };

  return (
    <div className='bg-banner-login bg-center bg-no-repeat bg-cover'>
      <form className="max-w-sm py-4 mx-auto px-4" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder='Nhập email của bạn...'
            className="shadow-sm outline-none bg-gray-50 border border-gray-300 text-sm rounded-lg  block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:shadow-sm-light"
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
            Họ và tên
          </label>
          <input
            type="text"
            id="name"
            placeholder='Nhập họ và tên đầy đủ...'
            className="shadow-sm  outline-none bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:shadow-sm-light"
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">
            Số điện thoại
          </label>
          <input
            type="text"
            id="phone"
            placeholder='+84'
            className="shadow-sm  outline-none bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:shadow-sm-light"
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
            Địa chỉ
          </label>
          <input
            type="text"
            id="address"
            placeholder='Nhập địa chỉ(xã, phường nếu có)'
            className="shadow-sm  outline-none bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:shadow-sm-light"
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="school" className="block mb-2 text-sm font-medium text-gray-900">
            Trường
          </label>
          <input
            type="text"
            id="school"
            placeholder='Trường THPT bạn học..'
            className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="majors" className="block mb-2 text-sm font-medium text-gray-900">
          Ngành học quan tâm
          </label>
          <input
            type="text"
            id="majors"
            placeholder='Ngành học quan tâm..'
            className="shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Đăng ký
        </button>
      </form>

      {/* <div className="">
        <SaveUserExel formData={formData}/>
      </div> */}
    </div>

  );
};

export default Register;
