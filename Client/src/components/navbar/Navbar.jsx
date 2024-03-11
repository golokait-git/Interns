import Social from "../../pages/components/Social";
import Sidebar from "../sidebar/Sidebar";
import "./navbar.scss";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <div className="navbar overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar />
      <div className="lg:mx-[10rem] flex justify-between ">
        {" "}
        <div className="my-[2rem] flex w-[12rem] rounded mx-auto">
          {/* ml-auto mr-10 lg:ml-0 lg:mr-0 mx-auto */}
          <a href="/">
            <img className=" items-center " src="/logo.png" alt="logo" />
          </a>
        </div>
        {/* <div className="lg:block hidden my-[2rem]">
          <Social />
        </div> */}
      </div>
      {/* <h1 className="">hello </h1> */}
      <div className="wrapper">
        {/* <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Lama Dev
        </motion.span> */}
        {/* <div className="social">
          <a href="#">
            <img src="/facebook.png" alt="" />
          </a>
          <a href="#">
            <img src="/instagram.png" alt="" />
          </a>
          <a href="#">
            <img src="/youtube.png" alt="" />
          </a>
          <a href="#">
            <img src="/dribbble.png" alt="" />
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
