import "./hero.scss";
import { motion } from "framer-motion";
import { Cursor, useTypewriter } from "react-simple-typewriter";

const textVariants = {
  initial: {
    x: -500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
  scrollButton: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};
const sliderVariants = {
  initial: {
    x: "150%",
  },
  animate: {
    x: "-30ch",
    transition: {
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
      duration: 50,
    },
  },
};

const Hero = () => {
  const [text, count] = useTypewriter({
    words: ["Global Public Speaker", "The Urban Spiritual Leader", "Author"],
    loop: true,
    delaySpeed: 500,
    typeSpeed: 150,
    deleteSpeed: 60,
  });

  return (
    <div className="hero flex flex-row-reverse 	">
      <motion.div
        className="slidingTextContainer mb-[2rem]"
        variants={sliderVariants}
        initial="initial"
        animate="animate"
      >
        Spiritual Leader, Author & Educator
      </motion.div>
      <div className="wrapper">
        <motion.div
          className="textContainer  slider mb-[5rem]"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <motion.span
            variants={textVariants}
            className="text-[1.5rem] lg:text-[2.5rem] lg:text-bold pt-10 
            text-purple-500 md:ml-[5rem] 2xl:text-[3rem] "
          >
            {text}
            <Cursor cursorColor="#4ca5ff" />
          </motion.span>

          <motion.h1 variants={textVariants} className="font-bold ">
            Spiritual Leader
          </motion.h1>
          <motion.h1 variants={textVariants} className="font-bold">
            Author & Educator
          </motion.h1>
        </motion.div>
      </div>
      <div>
        <div className="imageContainer w-[100%] mx-auto ">
          <img src="/hero3.png" className="mx-auto" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
