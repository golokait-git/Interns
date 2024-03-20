import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "next-auth/react";
import Image from "next/image";
import logo from "../common/logoImage/logo.png";
// own
import { SmcA } from "../../store/admin/smallcom";

function Header() {
  const dispatch = useDispatch();
  function showHide() {
    dispatch(SmcA.toggle());
  }
  const handleSignOut = async () => {
    await signOut();
  };
  return (
    <>
      <div className="app-header header-shadow">
        <div className="app-header__logo">
          <div className="logo-src" />
          <div className="header__pane ml-auto">
            <Image src={logo} alt="Logo" width={80} height={50} />
          </div>
        </div>
        <div className="app-header__mobile-menu">
          <div>
            <button
              type="button"
              className="hamburger hamburger--elastic mobile-toggle-nav"
            >
              <span className="hamburger-box" onClick={showHide}>
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
                <FontAwesomeIcon icon={faEllipsisV} />
              </span>
            </button>
          </span>
        </div>
        <div className="app-header__content">
          <div className="app-header-right">
            <div className="header-btn-lg pr-0">
              <div className="widget-content p-0">
                <div className="widget-content-wrapper">
                  <div className="widget-content-left"></div>
                  <div className="widget-content-left  ml-3 header-user-info">
                    <div className="widget-heading">Admin</div>
                  </div>
                  <div className="widget-content-right header-user-info ml-3">
                    <button
                      type="button"
                      className="btn-shadow p-1 btn btn-primary btn-sm show-toastr-example"
                      onClick={handleSignOut}
                    >
                      {/* <i className="fa text-white fa-sign-out pr-1 pl-1" /> */}
                      <i className="lnr-exit pr-1 pl-1 text-white" i />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
