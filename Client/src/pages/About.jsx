import React from "react";

const About = () => {
  return (
    <div className="lg:mx-[2rem] mx-[1rem] my-10 ">
      <div>
        <h1 className="text-center text-4xl font-bold mb-14">About Me</h1>{" "}
      </div>
      <div className="flex lg:flex-row flex-col max-w-[100%] gap-10 items-center">
        <div className="">
          <div
            className=" flex hover:transform hover:scale-105 cursor-pointer
           duration-500	lg:w-[27rem] mx-3"
          >
            <img
              // src="https://www.brajsundar.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage5.ee7f73a3.jpg&w=640&q=75"
              alt=""
              src="/hero22.png"
              className="rounded-[1rem] py-auto items-center"
            />
          </div>
        </div>
        <div className="lg:max-w-[60%] w-full my-auto font-bold mx-10">
          {/* <h1 className=" text-4xl font-bold mb-7 ">Brajsundar Das</h1> */}
          <p className="lg:text-2xl md:text-xl text-md">
            Brajsundar Das was born in December 1984 to an aristocratic Brahmin
            family. He was brought up in a spiritual environment and learned
            about Lord activities from his mother since the age of five. He
            joined ISKCON (International Society for Krishna Consciousness) in
            2002 and received his first initiation in 2007.
          </p>
          <p className="my-10"></p>
          <p className="lg:text-2xl md:text-xl text-md">
            He has dedicated his life to spreading the knowledge of Srimad
            Bhāgavatam under the guidance of his spiritual masters. Brajsundar
            Das resides in the holydham of Vrindavan Dham since 2007. He has
            been instrumental in establishing ISKCON Bhagavata Mahavidyalaya
            educational centers in India, Europe, and North America. He authored
            a book titled 'Taking Shelter of Srimad Bhagavatam.'
          </p>
        </div>
        {/* <div className=" flex hover:transform hover:scale-105 cursor-pointer duration-500	"> */}
        {/* <div className="flex rounded-xl w-[27rem] mt-4 bg-white/15 ml-4 h-[18rem] border-4 border-white/50"></div> */}
      </div>
      {/* <div className="my-[12rem]"></div> */}

      <div className="flex flex-col-reverse lg:flex-row max-w-[100%]  items-center my-10">
        <div className="lg:max-w-[70%] w-full items-center lg:mb-[14rem] lg:-mr-[5rem]">
          <h1 className=" lg:text-4xl md:text-2xl text-3xl font-bold mb-7 text-center ">
            Qualification :{" "}
          </h1>
          {/* <p className="text-xl">
            Brajsundar Das was born in December 1984 to an aristocratic Brahmin
            family. He was brought up in a spiritual environment and learned
            about Lord activities from his mother since the age of five. He
            joined ISKCON (International Society for Krishna Consciousness) in
            2002 and received his first initiation in 2007. He has dedicated his
            life to spreading the knowledge of Srimad Bhāgavatam under the
            guidance of his spiritual masters. Brajsundar Das resides in the
            holydham of Vrindavan Dham since 2007. He has been instrumental in
            establishing ISKCON Bhagavata Mahavidyalaya educational centers in
            India, Europe, and North America. He authored a book titled 'Taking
            Shelter of Srimad Bhagavatam.'
          </p> */}
          <p className="lg:text-2xl md:text-xl text-md font-bold">
            Brajsundar Das grew up in a spiritual environment within an
            aristocratic Brahmin family. He started learning about Lord
            activities from his mother at the age of five.
          </p>
          <p className="my-10"></p>

          <p className="lg:text-2xl md:text-xl text-md font-bold">
            Brajsundar Das pursued his secular education and obtained a Diploma,
            Bachelor's, and Master's degree in Information Technology. He also
            holds an M.A. in History. Currently, he is pursuing a Ph.D.
          </p>
        </div>
        <div className=" flex hover:transform hover:scale-105 cursor-pointer duration-500	">
          {/* <div className="flex rounded-xl w-[27rem] mt-4 bg-white/15 ml-4 h-[18rem] border-4 border-white/50 "></div> */}
          {/* <div className=" rounded  absolute w-[27rem]"> */}
          <div className=" rounded   lg:w-[31rem] w-[20rem] lg:h-full  md:mb-[5rem]">
            <img
              // src="https://www.brajsundar.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage1.4c516f51.jpg&w=640&q=75"
              src="/img7.png"
              alt=""
              className="rounded-xl  lg:h-full"
            />
          </div>
        </div>
      </div>

      {/* <div className="flex max-w-[100%] gap-10 items-center mt-14 flex-row-reverse">
        <div className="max-w-[60%] ">
          <h1 className=" text-4xl font-bold mb-7 ">Education </h1>
          <p className="text-xl">
            Brajsundar Das pursued his secular education and obtained a Diploma,
            Bachelor's, and Master's degree in Information Technology. He also
            holds an M.A. in History. Currently, he is pursuing a Ph.D.
          </p>
        </div>
        <div className=" flex hover:transform hover:scale-105 cursor-pointer duration-500	">
          <div className=" rounded   w-[17rem]">
            <img
              src="/img7.png"
              alt=""
              className="rounded-xl "
            />
          </div>
        </div>
      </div> */}

      {/* <div className="flex max-w-[100%] gap-10 items-center mt-14 ">
        <div className="max-w-[60%] ">
          <h1 className=" text-4xl font-bold mb-7 ">Childhood</h1>
          <p className="text-xl">
            Brajsundar Das grew up in a spiritual environment within an
            aristocratic Brahmin family. He started learning about Lord
            activities from his mother at the age of five.
          </p>
        </div>
        <div className=" flex hover:transform hover:scale-105 cursor-pointer duration-500	">
          <div className=" rounded   w-[24rem] mb-[2rem]">
            <img
              src="/img9.png"
              alt=""
              className="rounded-xl "
            />
          </div>
        </div>
      </div> */}
      <div className="lg:-mt-[10rem] lf:mt-5"></div>
      <div className="flex flex-col	 lg:flex-row max-w-[100%]  items-center my-10">
        <div className=" flex hover:transform hover:scale-105 cursor-pointer duration-500	">
          <div className=" rounded   lg:w-[26rem] lg:h-[48rem] lg:w-[20rem] lg:h-[42rem] lg:mb-12 ">
            <img src="/img10.png" alt="" className="rounded-xl " />
          </div>
        </div>
        <div className="lg:max-w-[70%] w-full items-center lg:mb-[14rem] lg:-mr-[5rem] lg:mt-[10rem]">
          <h1 className=" lg:text-4xl md:text-2xl text-3xl font-bold mb-7 text-center ">
            Career :{" "}
          </h1>
          <p className="lg:text-2xl md:text-xl text-md font-bold items-center">
            After joining ISKCON, Brajsundar Das dedicated his life to spreading
            the knowledge of Srimad Bhāgavatam. He established ISKCON Bhagavata
            Mahavidyalaya educational centers in India, Europe, and North
            America. Brajsundar Das conducted more than 215 seminars on Srimad
            Bhagavatam in over 21 countries and 168 cities. He trained over
            4756+ devotees through his Bhāgavata Teachers Training course.
          </p>
          <p className="my-10"></p>

          <p className="lg:text-2xl md:text-xl text-md font-bold items-center mx-auto">
            He serves as an editor of the E-Magazine 'Nityam Bhagavata Sevaya,'
            circulated to over 35,811 devotees worldwide. Brajsundar Das has a
            substantial online following with more than 4 lakh followers on
            various social media platforms. He hosts two podcasts, 'One Purpose'
            in English and 'Bhagavata Vani' in Hindi.
          </p>
        </div>
      </div>
      {/* <div className="my-[7rem]"></div> */}
    </div>
  );
};

export default About;
