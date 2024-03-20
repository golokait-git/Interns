// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Books from "layouts/books";
import Reels from "layouts/reels";
import Videos from "layouts/videos";
import Reviews from "layouts/reviews";
import Articles from "layouts/articles";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Book",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
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
    key: "Reviews",
    icon: <Icon fontSize="small">Reviews</Icon>,
    route: "/notifications",
    component: <Reviews />,
  },
  {
    type: "collapse",
    name: "Articles",
    key: "articles",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/article",
    component: <Articles />,
  },
  // {
  //   type: "collapse",
  //   name: "Review",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
];

export default routes;
