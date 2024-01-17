import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      {/* min-h-screen */}
      <div className="">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
