import React, { useState } from "react";
import "./Event.css";
const Events = () => {
  const [formModal, setFormModal] = useState(false);
  const [formData, setFormData] = useState({
    "First   Name": "",
    "Last Name": "",
    Email: "",
    "Confirm Email": "",
    "Phone Number": "",
    "Organization Name": "",
    format: "",
    "organization name": "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
  });
  console.log(formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
    setFormModal(false); // Close the modal after submission
  };

  return (
    <div className="overflow-hidden">
      {/* Background Image */}
      <div className="w-full h-full">
        <img
          src="./event-bg.jpg"
          alt="brajsundardas"
          className=" w-[100vw] mx-auto h-[80vh] object-cover"
        />
      </div>

      <div className="my-10 overflow-x-hidden ">
        {/* Button  */}
        <button
          type="button"
          className="border rounded border-violet-500
           text-white text-bold flex justify-center items-center
            m-auto w-fit px-14 py-5 text-black hover:bg-white/10 cursor-pointer font-semibold text-lg "
          onClick={() => setFormModal(true)}
        >
          Book Me
        </button>

        {formModal && (
          <div className="fixed inset-0 flex items-center justify-center z-10 my-4">
            <div className="bg-white p-8 overflow-auto max-h-full w-[60rem]">
              <div className="flex justify-end ">
                <button
                  type="button"
                  className="text-gray-900 hover:text-gray-800 "
                  onClick={() => setFormModal(false)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <div className="mb-5">
                {" "}
                <h1 className="text-black mb-4 text-3xl font-semibold">
                  Book BrajSundar Das
                  <br />
                </h1>
                <span className="text-black mb-4">
                  {" "}
                  Please fill out the form below and provide as much information
                  as possible.
                </span>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 overflow-x-hidden "
              >
                <div className="flex gap-4 md:flex-row flex-col">
                  <input
                    className="shadow appearance-none border w-full py-3 bg-gray-500/10
                    px-4 text-gray-700
                    leading-tight focus:outline-none placeholder-gray-700 focus:shadow-outline border border-black font-semibold font-md"
                    id="fname"
                    type="text"
                    placeholder="ENTER FIRST NAME"
                    style={{ fontSize: "1rem" }} // Adjust placeholder font size
                  />
                  <input
                    className="shadow appearance-none border w-full py-3 bg-gray-500/10
                     px-4 text-gray-700
                     leading-tight focus:outline-none placeholder-gray-700 focus:shadow-outline border border-black font-semibold font-md"
                    id="lname"
                    type="text"
                    placeholder="ENTER LAST NAME"
                    style={{ fontSize: "1rem" }} // Adjust placeholder font size
                  />
                </div>
                <div className="flex gap-4 md:flex-row flex-col">
                  <input
                    className="shadow appearance-none border w-full py-3 bg-gray-500/10
       px-4 text-gray-700
       leading-tight focus:outline-none placeholder-gray-700 focus:shadow-outline border border-black font-semibold font-md"
                    id="fname"
                    type="text"
                    placeholder="ENTER EMAIL ADDRESS"
                    style={{ fontSize: "1rem" }} // Adjust placeholder font size
                  />
                  <input
                    className="shadow appearance-none border w-full py-3 bg-gray-500/10
                  px-4 text-gray-700
                  leading-tight focus:outline-none placeholder-gray-700 focus:shadow-outline border border-black font-semibold font-md"
                    id="lname"
                    type="text"
                    placeholder="CONFIRM EMAIL ADDRESS"
                    style={{ fontSize: "1rem" }} // Adjust placeholder font size
                  />
                </div>
                <div className="flex gap-4 md:flex-row flex-col">
                  <input
                    className="shadow appearance-none border w-full py-3 bg-gray-500/10
                    px-4 text-gray-700
                    leading-tight focus:outline-none placeholder-gray-700 focus:shadow-outline border border-black font-semibold font-md"
                    id="fname"
                    type="text"
                    placeholder="ENTER CONTACT NUMBER"
                  />
                  <input
                    className="shadow appearance-none border w-full py-3 bg-gray-500/10
                    px-4 text-gray-700
                    leading-tight focus:outline-none placeholder-gray-700 focus:shadow-outline border border-black font-semibold font-md"
                    id="lname"
                    type="text"
                    placeholder="NAME OF ORGANIZATION"
                    style={{ fontSize: "1rem" }} // Adjust placeholder font size
                  />
                </div>
                <div className="flex gap-4 md:flex-row flex-col">
                  <div className="w-full text-gray-800  font-semibold">
                    <select
                      name="eventTtype"
                      className="bg-gray-50 border border-black text-md block w-full p-3 bg-gray-500/10 border-black placeholder-gray-400 font-semibold"
                    >
                      <option className="text-gray-800">
                        IS THIS EVENT IN PERSON OR VIRTUAL
                      </option>
                      <option
                        name="eventTtype"
                        value="In Person"
                        className="text-black"
                      >
                        In Person
                      </option>
                      <option
                        name="eventTtype"
                        value="Virtual"
                        className="text-black"
                      >
                        Virtual
                      </option>
                    </select>
                  </div>
                  <input
                    className="shadow appearance-none border w-full py-3 bg-gray-500/10
                     px-4 text-gray-700
                     leading-tight focus:outline-none placeholder-gray-700 focus:shadow-outline border border-black font-semibold
                     placeholder-sm  font-md md:w-[96%]"
                    id="lname"
                    type="text"
                    placeholder="WHAT DATE ARE YOU ENQUIRING ABOUT ?"
                    style={{ fontSize: "1rem" }} // Adjust placeholder font size
                  />
                </div>
                <div className="flex gap-4 md:flex-row flex-col">
                  <div className="w-full text-gray-800 font-semibold">
                    <select
                      name="sessionTtype"
                      className="bg-gray-50 border text-md block w-full p-3 bg-gray-500/10 border-black dark:placeholder-gray-400 font-semibold"
                    >
                      <option className="text-gray-400">
                        WHAT IS THE FORMAT OF SPEAKER SESSION
                      </option>
                      <option
                        name="sessionTtype"
                        value="KEYNOTE"
                        className="text-black"
                      >
                        KEYNOTE
                      </option>
                      <option
                        name="sessionTtype"
                        value="WORKSHOP"
                        className="text-black"
                      >
                        WORKSHOP
                      </option>
                      <option
                        name="sessionTtype"
                        value="Q&A"
                        className="text-black"
                      >
                        Q&A
                      </option>
                      <option
                        name="sessionTtype"
                        value="TBD"
                        className="text-black"
                      >
                        TBD
                      </option>
                    </select>
                  </div>
                  <div className="w-full text-gray-800 font-semibold">
                    <select
                      name="sessionLength"
                      className="bg-gray-50 border text-[1rem] block w-full p-3 bg-gray-500/10 border-black dark:placeholder-gray-400 
                      font-semibold"
                    >
                      <option className="text-gray-400">
                        WHAT IS THE LENGTH OF SESSION
                      </option>
                      <option
                        name="sessionLength"
                        value="1-2 HOURS"
                        className="text-black"
                      >
                        1-2 HOURS
                      </option>
                      <option
                        name="sessionLength"
                        value="OVER 2 HOURS"
                        className="text-black"
                      >
                        OVER 2 HOURS
                      </option>
                      <option
                        name="sessionTtype"
                        value="Q&A"
                        className="text-black"
                      >
                        T&B
                      </option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4  md:flex-row flex-col font-bold ">
                  <div className="w-full text-gray-800  font-bold md:w-[105%]">
                    <select
                      name="sessionLength"
                      className="bg-gray-800/10  border text-md block w-full p-3 bg-gray-500/1
                      0 border-black dark:placeholder-gray-900 font-semibold "
                      placeholder="  IS THIS A PUBLICITY/MARKETED EVENT"
                    >
                      <option
                        className="text-black"
                        selected
                        // style={{ color: "green" }}
                      >
                        IS THIS A PUBLICITY/MARKETED EVENT
                      </option>
                      <option
                        name="sessionLength"
                        value="1-2 HOURS"
                        className="text-black"
                      >
                        Yes
                      </option>
                      <option
                        name="sessionLength"
                        value="OVER 2 HOURS"
                        className="text-black"
                      >
                        No
                      </option>
                    </select>
                  </div>
                  <input
                    className="shadow appearance-none border w-full py-3 bg-gray-500/10
                    px-4 text-gray-700
                    leading-tight focus:outline-none placeholder-gray-700 focus:shadow-outline border border-black font-semibold font-md"
                    id="lname"
                    type="text"
                    placeholder="IF RECORDED, WHAT IS THE INTENDED USE?"
                    style={{ fontSize: "1rem" }} // Adjust placeholder font size
                  />
                </div>
                <div className="mb-6"></div>
                <div className="col-span-2 md:col-span-1 ">
                  <button
                    type="submit"
                    className="border border-black text-black py-2 px-10 rounded font-semibold"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="lg:mx-[7rem] mx-[2rem] my-10">
          <h1 className="font-semibold text-2xl">BRAJSUNDAR OFFERS</h1>
          <ul className="grid md:grid-cols-2 grid-cols-1 gap-7 my-2 pl-10 list-disc text-xl">
            <li>Courses</li>
            <li>Retreats</li>
            <li>Workshops</li>
            <li>Meet &amp; Greets</li>
            <li>Book Signings</li>
          </ul>
          <div className="py-20 ">
            {" "}
            <h1 className="font-semibold text-2xl">MOST POPULAR TOPICS</h1>
            <div className="my-5">
              {" "}
              <p className="text-2xl font-semibold py-5">
                Making Marriage Success:
              </p>
              <p className="text-lg">
                Join me, Brajsundar Das, on a journey to rediscover the joy and
                fulfillment in your marriage. This course delves into practical
                tools and timeless wisdom to navigate challenges, deepen
                communication, and reignite the spark. Learn the secrets of
                building trust, resolving conflicts constructively, and
                fostering a supportive, loving environment. Together,we&#39;ll
                explore the pillars of a successful marriage and empower you to
                create a haven of happiness and connection.
              </p>
              {/* <hr className="text-white/40 py-5" /> */}
            </div>
            <hr className="border-1 border-white/70 mt-10" />
            <div className="my-5">
              <p className="text-2xl font-semibold py-5">
                Becoming the Husband Your Wife Needs:
              </p>
              <p className="text-lg">
                Men, are you ready to unlock the secrets to being the husband
                your wife truly desires? Through insightful teachings and
                interactive exercises, I, Brajsundar Das, will guide you on your
                journey to understand and fulfill your wife&#39;s emotional
                needs. Discover practical tools for expressing love
                effectively, offering unwavering support, and fostering
                intimacy.Learn to communicate with empathy, cultivate
                patience, and become the pillar of strength and understanding
                your wife longs for.
              </p>
            </div>{" "}
            <hr className="border-1 border-white/70 mt-10" />
            <div className="my-5">
              <p className="text-2xl font-semibold py-5">
                The Role of Wife in Married Life:
              </p>
              <p className="text-lg">
                Dear wives, embark on a path of self-discovery and empowerment
                in this enriching course. I, Brajsundar Das, will guide you on
                exploring your unique role within your marriage. Learn how to
                nurture your own well-being, cultivate inner strength, and
                navigate challenges with grace and wisdom. Discover the art of
                effective communication, creating a peaceful and harmonious home
                environment, and supporting your husband&#39;s
                growth. Together, we&#39;ll unveil the multifaceted role of a
                wife and equip you to be the heart and soul of your loving
                union.
              </p>
            </div>{" "}
            <hr className="border-1 border-white/70 mt-10" />
            <div className="my-5">
              <p className="text-2xl font-semibold py-5">Marriage Tuneup: </p>
              <p className="text-lg">
                Is your marriage in need of a refresh? Join me, Brajsundar
                Das, for an invigorating workshop designed to rekindle the spark
                and reignite the passion in your relationship. Through engaging
                activities and insightful discussions, we&#39;ll identify areas
                for improvement, discover effective communication
                techniques, and learn to appreciate each other&#39;s unique
                perspectives. This workshop is your chance to revitalize your
                connection, rediscover the joy in your union, and embark on a
                fresh chapter in your love story.
              </p>
            </div>{" "}
            <hr className="border-1 border-white/70 mt-10" />
            <div className="my-5">
              <p className="text-2xl font-semibold py-5">
                From Me to We – Preparing for Marriage:
              </p>
              <p className="text-lg">
                Couples, are you taking the exciting step towards marriage? Join
                me, Brajsundar Das, for an insightful workshop designed to equip
                you with the tools and knowledge for a successful journey
                together. Explore crucial topics like communication, conflict
                resolution, financial planning, and building a shared
                vision. Gain valuable insights into building a strong
                foundation, navigating expectations, and fostering a
                loving, supportive partnership. This workshop will empower you
                to confidently embark on your new adventure as husband and wife.
              </p>
            </div>{" "}
            <hr className="border-1 border-white/70 mt-10" />
            <div className="my-5">
              <p className="text-2xl font-semibold py-5">
                Honoring the Divine: Exploring Vaishnava Philosophy with
                Brajsundar Das{" "}
              </p>
              <p className="text-lg">
                Begin on a transformative journey into the heart of Vaishnava
                philosophy with Brajsundar Das, your guide and companion on this
                sacred path. As a dedicated teacher and preacher, Brajsundar not
                only imparts knowledge but also infuses his teachings with the
                essence of devotion and spiritual practice.
              </p>
            </div>
            <div>
              <div className="py-3">
                {" "}
                <p className="text-lg">
                  Delve into the rich tapestry of Vaishnava traditions:
                </p>
                <ul className="gap-7 my-2 pl-10 list-disc ">
                  <li className="text-lg">
                    Uncover the timeless wisdom of the Vedas, Puranas, and
                    Bhagavad Gita, exploring the divine nature of Lord Krishna
                    and his various avatars.
                  </li>
                  <li>
                    Embrace the path of Bhakti Yoga, the art of cultivating love
                    and devotion as the supreme means of liberation.{" "}
                  </li>
                  <li>
                    Understand the core principles of Bhakti, and discover how
                    to navigate the cycles of life with grace and equanimity.
                  </li>
                  <li>
                    Explore the significance of chanting, kirtan, and other
                    devotional practices in deepening your connection with the
                    Supreme Lord.
                  </li>
                </ul>
              </div>
              <div className="py-3">
                {" "}
                <p className="text-lg">Brajsundar&#39;s approach is unique:</p>
                <ul className="gap-7 my-2 pl-10 list-disc text-lg">
                  <li>
                    He blends traditional teachings with practical application,
                    empowering you to integrate Vaishnava wisdom into your daily
                    life.
                  </li>
                  <li>
                    His sessions are infused with warmth, compassion, and a deep
                    understanding of human struggles.
                  </li>
                  <li>
                    He fosters a supportive and inclusive learning environment,
                    welcoming seekers from all backgrounds and walks of life.
                  </li>
                </ul>
              </div>
              <div className="py-3">
                {" "}
                <p className="text-lg">
                  Delve into the rich tapestry of Vaishnava traditions:
                </p>
                <ul className="gap-7 my-2 pl-10 list-disc text-lg">
                  <li>
                    Cultivate inner peace and awaken your spiritual potential.
                  </li>
                  <li>
                    Build meaningful relationships based on love and
                    understanding.
                  </li>
                  <li>
                    Discover the purpose and joy inherent in a life dedicated to
                    the Divine.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-xl text-center">
              Embrace the transformative power of Vaishnava philosophy with
              Brajsundar Das. Contact him today to embark on your journey
              towards spiritual fulfillment.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
