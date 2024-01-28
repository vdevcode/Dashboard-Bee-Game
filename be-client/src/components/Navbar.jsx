/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // delete thanh scroll
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [loading, setLoading] = React.useState(false);
  const nagivate = useNavigate();

  const handleStartList = () => {
    setLoading(true);
    setTimeout(() => {
      nagivate("/list");
    }, 2000);
  };

  const navItems = (
    <>
      <li>
        <Link to="/">Trang chủ</Link>
      </li>
      <li>
        <Link to="/statistical">Thống kê xếp hạng</Link>
      </li>
      <li>
        <Link to="/gift">Danh sách vừa nhận quà</Link>
      </li>
      <li>
        <Link to="/login">Đăng nhập</Link>
      </li>
      <li>
        <Link to="/file">Tải File</Link>
      </li>
    </>
  );

  return (
    <header
      className={`navbar bg-yellow-300  px-4 lg:px-24 shadow-sm  ${
        isSticky
          ? "bg-yellow-400 shadow-md fixed top-0 z-10 right-0 left-0"
          : "bg-base-100"
      }`}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn  btn-ghost btn-circle w-[1.5rem]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm bg-white dropdown-content mt-3  z-10 p-2 shadow rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-xl text-blue-500">
         <img src="./public/images/logo.png" className="w-20" alt="" />
        </Link>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost  btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item bg-red-400"></span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
