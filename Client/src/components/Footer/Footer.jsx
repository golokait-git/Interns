import React from "react";
import Social from "../../pages/components/Social";

const Footer = () => {
  const date = new Date();
  return (
    <div>
      <footer
        className=" bg-opacity-75 
      bg-[url('/footer1.png')] pt-[4rem]  bottom-0"
      >
        {/* <footer
        className=" bg-opacity-75 
      bg-[url('https://golokait.com/wp-content/uploads/2023/06/footer-bg-1.png')] pt-[4rem]  bottom-0"
      > */}
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-left lg:text-left justify-center items-center mb-[9rem] ">
            <div className="w-full lg:w-6/12 px-4 ">
              <h4 className="text-4xl fonat-semibold text-blueGray-700 text-left">
                Let us keep in touch!
              </h4>
              <h5 className="text-md  text-blueGray-600  text-left py-3">
                Find us on any of these platforms, we respond 1-2 business days.
              </h5>
              <div className="mt-6 lg:mb-0 mb -6 flex  items-center ">
                <Social />
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4 pr-10">
              <div className="flex flex-wrap items-top ">
                <div className="w-full lg:w-5/12 px-4 ml-auto">
                  <span className="block text-blueGray-500 text-3xl font-semibold mb-3">
                    Get In Touch
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800
                         font-semibold block pb-2 text-lg "
                      >
                        Vrindavan India
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-blueGray-600 
                        hover:text-blueGray-800 font-semibold block pb-2 text-lg"
                      >
                        admin@brajsundar.com
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 
                        font-semibold block pb-2 text-lg"
                      >
                        +91 84334 35322
                      </a>
                    </li>
                    {/* <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="https://www.github.com/creativetimofficial?ref=njs-profile"
                      >
                        Github
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="https://www.creative-tim.com/bootstrap-themes/free?ref=njs-profile"
                      >
                        Free Products
                      </a>
                    </li> */}
                  </ul>
                </div>
                {/* <div className="w-full lg:w-4/12 px-4">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Other Resources
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile"
                      >
                        MIT License
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="https://creative-tim.com/terms?ref=njs-profile"
                      >
                        Terms &amp; Conditions
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="https://creative-tim.com/privacy?ref=njs-profile"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="https://creative-tim.com/contact-us?ref=njs-profile"
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
          <hr className="my-6 border-blueGray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full px-4 mx-auto text-center mb-4">
              <div className="text-md text-blueGray-500 font-semibold py-3 gap-10">
                {/* <h1 className="text-xl py-2">
                  {" "}
                  Copyright ©{" "}
                  <span id="get-current-year">{date.getFullYear()}</span>{" "}
                  <span className="text-white ">Brajsundar Das</span> All Rights
                  Reserved.
                </h1> */}
                <a
                  className="my-10 text-xl hover:text-white/90"
                  href="https://golokait.com/"
                  target="_blank"
                >
                  Developed By <span className="text-white">Goloka IT</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
