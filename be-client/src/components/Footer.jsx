import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer max-w-screen-2xl  text-black bg-yellow-300  py-4 container mx-auto px-4 lg:px-24 ">
      <aside className="text-white">
      <Link to="/" className="text-xl text-blue-500">Flappy Bee</Link>

        <p className="text-black">
            Bản quyền thuộc về
           FPT UNIVERSITY
        </p>
      </aside>
      <nav>
        <header className="footer-title">Dịch vụ</header>
        <a className="link link-hover">Xây dựng thương hiệu</a>
        <a className="link link-hover">Thiết kế</a>
        <a className="link link-hover">Tiếp thị</a>
        <a className="link link-hover">Quảng cáo</a>
      </nav>
      <nav>
        <header className="footer-title">Công ty</header>
        <a className="link link-hover">Về chúng tôi</a>
        <a className="link link-hover">Liên hệ</a>
        <a className="link link-hover">Việc làm</a>
        <a className="link link-hover">Bộ báo chí</a>
      </nav>
      <nav>
        <header className="footer-title">Hợp pháp</header>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
