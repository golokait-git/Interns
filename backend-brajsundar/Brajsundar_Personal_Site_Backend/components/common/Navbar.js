import Link from "next/link";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/navbar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

function Navbar() {
  const dispatch = useDispatch();
  const session = useSession();

  // const tabIndex = useSelector((state) => state.nTab.cartIsVisibleind);
  const [isOn, setIsOn] = useState(false);

  function home(number) {
    dispatch(uiActions.toggle(number));
  }
  function handleClick() {
    setIsOn((prev) => !prev);
  }

  return (
    <>
      <div className="app-sidebar sidebar-shadow">
        <div className="app-header__logo">
          <div className="logo-src" />
          <div className="header__pane ml-auto">
            <div>
              <button
                type="button"
                className="hamburger close-sidebar-btn hamburger--elastic"
                data-class="closed-sidebar"
              >
                <span className="hamburger-box">
                  <span className="hamburger-inner" />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="app-header__mobile-menu">
          <div>
            <button
              type="button"
              className="hamburger hamburger--elastic mobile-toggle-nav"
            >
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </button>
          </div>
        </div>
        <div className="app-header__menu">
          <span>
            <button
              type="button"
              className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
            >
              <span className="btn-icon-wrapper">
                <i className="fa fa-ellipsis-v fa-w-6" />
              </span>
            </button>
          </span>
        </div>

        <div className="scrollrule" style={{ overflow: "scroll", height: "auto" }}>
          <div className="app-sidebar__inner">
            <ul className="vertical-nav-menu">
              <li className="app-sidebar__heading">Menu</li>
              <li className="mm-active">
                <Link href="/">
                  <i className="metismenu-icon pe-7s-note2" />
                  Dashboards
                </Link>
              </li>
              <li className="app-sidebar__heading"></li>
              <li className="mm-active">
                <Link href="/books">
                  <i className="metismenu-icon lnr-book" />
                  Books
                </Link>
              </li>
              <li className="app-sidebar__heading"></li>

              {/* <li className="app-sidebar__heading"></li>
              <li className="mm-active">
                <Link href="/podcast">
                  <i className="metismenu-icon lnr-music-note" />
                  Podcast
                </Link>
              </li> */}

              <li className="app-sidebar__heading"></li>
              <li className="mm-active">
                <Link href="/reel">
                  <i className="metismenu-icon lnr-film-play" />
                  Reels
                </Link>
              </li>
              <li className="app-sidebar__heading"></li>
              <li className="mm-active">
                <Link href="/youtube">
                  <i className="metismenu-icon lnr-film-play" />
                  Youtube
                </Link>
              </li>
              <li className="app-sidebar__heading"></li>
              <li className="mm-active">
                <Link href="/review">
                  <i className="metismenu-icon lnr-star" />
                  Review
                </Link>
              </li>
              <li className="app-sidebar__heading"></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
