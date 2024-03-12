import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import SignIn from "./layouts/authentication/sign-in";
import SignUp from "./layouts/authentication/sign-up";
import Books from "layouts/books";
import Reels from "layouts/reels";
import Videos from "layouts/videos";
import Reviews from "layouts/reviews";
import Articles from "layouts/articles";
import Courses from "layouts/courses";
import Profile from "layouts/profile";
import PropTypes from "prop-types";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import routes from "routes";
import Workshop from "layouts/workshop";
import Coaching from "layouts/coaching";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";
import { useSelector } from "react-redux";
import Dashboard from "layouts/dashboard";

const RequirePath = ({ children }) => {
  const currentUser = useSelector((state) => state.user);
  return currentUser.isLoggedIn === true ? children : <Navigate to="/auth/signin" />;
};

RequirePath.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function App() {
  const navigate = useNavigate();
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  const currentUser = useSelector((state) => state.user);

  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
    });

    setRtlCache(cacheRtl);
  }, []);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, []);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            path={route.route}
            element={<RequirePath>{route.component}</RequirePath>}
            key={route.key}
          />
        );
      }

      return null;
    });

  const configsButton = (
    <></>
    // <MDBox
    //   display="flex"
    //   justifyContent="center"
    //   alignItems="center"
    //   width="3.25rem"
    //   height="3.25rem"
    //   bgColor="white"
    //   shadow="sm"
    //   borderRadius="50%"
    //   position="fixed"
    //   right="2rem"
    //   bottom="2rem"
    //   zIndex={99}
    //   color="dark"
    //   sx={{ cursor: "pointer" }}
    //   onClick={handleConfiguratorOpen}
    // >
    //   <Icon fontSize="small" color="inherit">
    //     settings
    //   </Icon>
    // </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {currentUser.isLoggedIn && location.pathname !== "/auth/signin" && (
        <Sidenav
          color={sidenavColor}
          brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
          brandName="Brajsundar Das"
          routes={routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
      )}

      <Routes>
        <Route index path="/" element={<Navigate to="/dashboard" />} />

        <Route index path="auth/signin" element={<SignIn />} />
        {/* <Route index path="auth/signup" element={<SignUp />} /> */}
        {getRoutes(routes)}
        <Route path="profile" element={<Profile />} />
      </Routes>

      {configsButton}
    </ThemeProvider>
  );
}
