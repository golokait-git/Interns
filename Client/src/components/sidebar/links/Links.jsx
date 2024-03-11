import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const variants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 50,
    opacity: 0,
  },
};

const dropdownVariants = {
  open: {
    height: "auto",
    opacity: 1,
    display: "block",
    zIndex: 10,
  },
  closed: {
    height: 0,
    opacity: 0,
    display: "none",
    zIndex: 0,
  },
};

const Links = () => {
  const items = ["Academy", "Literature", "Media", "Contact", "About"];
  const [hoveredItem, setHoveredItem] = useState(null);

  // Define different dropdown content for each item, including href
  const dropdownContent = {
    Academy: {
      contents: [
        // { content: "Courses", href: "/academy/courses" },
        { content: "Workshop", href: "/academy/workshop" },
        { content: "Coaching", href: "/academy/coaching" },
      ],
    },
    Literature: {
      contents: [
        { content: "Books", href: "/books" },
        { content: "Blogs", href: "/blogs" },
      ],
    },
    Media: {
      contents: [
        { content: "Podcast", href: "/podcast" },
        { content: "Reel", href: "/reel" },
        { content: "Videos", href: "/video" },
      ],
    },
    // Contact: { contents: [{ content: "Contact content", href: "/contact" }] },
    // About: { contents: [{ content: "About content", href: "/about" }] },
  };

  return (
    <motion.div className="links" variants={variants}>
      {items.map((item) => (
        <motion.div
          key={item}
          onHoverStart={() => setHoveredItem(item)}
          onHoverEnd={() => setHoveredItem(null)}
        >
          <motion.a
            href={`/${item}`}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-xl"
            style={{ fontSize: "1.9rem" }}
          >
            {item}
          </motion.a>

          {/* Dropdown Content */}
          <AnimatePresence>
            {hoveredItem === item && (
              <motion.div
                className="dropdown-content text-center z-10"
                variants={dropdownVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {/* Use the corresponding dropdown contents based on the item */}
                {dropdownContent[item]?.contents?.map((contentItem, index) => (
                  <a key={index} href={contentItem?.href}>
                    <p
                      style={{ fontSize: "1.2rem" }}
                      className="hover:opacity-80"
                    >
                      {contentItem?.content}
                    </p>
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
      {/* <p>hello world</p> */}
    </motion.div>
  );
};

export default Links;
