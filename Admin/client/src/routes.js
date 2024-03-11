import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Books from "layouts/books";
import Reels from "layouts/reels";
import Videos from "layouts/videos";
import Reviews from "layouts/reviews";
import Articles from "layouts/articles";
import Workshop from "layouts/workshop";
import Profile from "layouts/profile";
import { useSelector } from "react-redux";
// @mui icons
import PropTypes from "prop-types";

import Icon from "@mui/material/Icon";
import { Navigate } from "react-router-dom";

import CoursesTable from "layouts/courses";
import ChoachingTable from "layouts/coaching";
// console.log("====", currentUser);
const RequirePath = ({ children }) => {
  const currentUser = useSelector((state) => state.user);
  return currentUser.isLoggedIn === true ? children : <Navigate to="/auth/signin" />;
};
RequirePath.propTypes = {
  children: PropTypes.node.isRequired,
};

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: (
      <RequirePath>
        <Dashboard />
      </RequirePath>
    ),
  },
  {
    type: "collapse",
    name: "Book",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/books",
    component: <Books />,
  },
  {
    type: "collapse",
    name: "Reel",
    key: "reel",
    icon: <Icon fontSize="small">videocam</Icon>,
    route: "/reel",
    component: <Reels />,
  },
  {
    type: "collapse",
    name: "Video",
    key: "video",
    icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
    route: "/video",
    component: <Videos />,
  },
  {
    type: "collapse",
    name: "Review",
    key: "reviews",
    icon: <Icon fontSize="small">Reviews</Icon>,
    route: "/reviews",
    component: <Reviews />,
  },
  {
    type: "collapse",
    name: "Articles",
    key: "articles",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/articles",
    component: <Articles />,
  },

  {
    type: "collapse",
    name: "Courses",
    key: "courses",
    icon: <Icon fontSize="small">videocam</Icon>,
    route: "/courses",
    component: <CoursesTable />,
  },
  {
    type: "collapse",
    name: "Coaching",
    key: "coaching",
    icon: <Icon fontSize="small">videocam</Icon>,
    route: "/coaching",
    component: <ChoachingTable />,
  },
  {
    type: "collapse",
    name: "Workshop",
    key: "workshop",
    icon: <Icon fontSize="small">videocam</Icon>,
    route: "/workshop",
    component: <Workshop />,
  },
  {
    type: "collapse",
    name: "profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
];

export default routes;
