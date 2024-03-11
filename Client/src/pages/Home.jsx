import React from "react";
import Contact from "../components/contact/Contact";
import Hero from "../components/hero/Hero";
import Navbar from "../components/navbar/Navbar";
import Parallax from "../components/parallax/Parallax";
import Portfolio from "../components/portfolio/Portfolio";
import Services from "../components/services/Services";
import Mainnavbar from "../components/mainNavbar/Mainnavbar";
import Blog from "./components/blogs/blogs.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Videos from "./components/carousel/Videos.jsx";
import Books from "../components/Books/Books.jsx";
import Reel from "../components/Reel/Reel.jsx";
import HomeCard from "./components/HomeCard/HomeCard.jsx";
import Testimonials from "../components/Testimonials/Testimonials.jsx";
// import Books from "./Books/Books.jsx";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Uncomment the following lines */}
      {/* <Cursor /> */}
      <section id="Homepage">
        {/* Uncomment the following lines */}
        {/* <div className="md:hidden block"> */}
        {/* <Navbar /> */}
        {/* </div> */}
        {/* Uncomment the following lines */}
        {/* <div className="md:block hidden">
          <Mainnavbar />
        </div> */}
        <Hero />
      </section>
      <section id="Services">
        <Parallax type="services" />
      </section>
      {/* <section id="Portfolio">
        <Parallax type="portfolio" />
      </section> */}
      {/* <section>
        {" "}
        <Portfolio />
      </section> */}
      {/* <section> */}
      <div className="my-12"></div>
      <div className="my-[7rem]">
        <h1
          className="sm:text-3xl text-3xl  text-center font-medium title-font
         mb-5 text-white"
        >
          Explore
        </h1>{" "}
        <div className="grid mx-auto items-center gap-3 lg:gap-10 px-10 lg:px-[7rem] lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
          <HomeCard data="Courses" link="/academy/courses" />
          <HomeCard data="Workshops" link="/academy/workshop" />
          <HomeCard data="Coaching" link="/academy/coaching" />
          {/* <HomeCard />
        <HomeCard /> */}
        </div>
      </div>
      <Books />
      <div className="my-[5rem]"></div>
      <Blog />
      <div className="my-[5rem]"></div>
      <Videos />
      <div className="my-[5rem]"></div>
      <Testimonials />
      <div className="my-[5rem] 2xl:my-0"></div>
      <Contact />
    </div>
  );
};

export default Home;
