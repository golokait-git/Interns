import Link from "next/link";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// submodule


import { SmcA } from "../../../store/dashboard/smallcom";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Portfolioperformance from "../common/portfolioperformance";
import Footer from "components/common/footer";
import { loadDatauser } from "store/admin/user";

function Dashboardiner({ session }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDatauser());
   
  }, []);

  

  return (
    <>
      <div className="app-main__outer">
        <div className="app-main__inner">
          <div className="app-page-title">
            <div className="page-title-wrapper">
              <div className="page-title-heading">
                <div className="page-title-icon">
                  <i className="pe-7s-diamond icon-gradient bg-mean-fruit" />
                </div>
                <div>
                  Analytics Dashboard
                  
                </div>
              </div>
              <div className="page-title-actions">
                <button
                  type="button"
                  data-toggle="tooltip"
                  title="Example Tooltip"
                  data-placement="bottom"
                  className="btn-shadow mr-3 btn btn-dark"
                >
                  <i className="fa fa-star" />
                </button>
                
              </div>
            </div>
          </div>
         
          <div className="tabs-animation">
            <div className="mb-3 card">
              <Portfolioperformance />
            </div>
            
           
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Dashboardiner;
