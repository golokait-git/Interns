import Link from "next/link";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

// submodule

function Portfolioperformance({ session }) {
  // const total_user = useSelector((state) => state.User.user);

  const [bookCount, setBookCount] = useState(0);
  const [reelCount, setReelCount] = useState(0);
  const [youtubeCount, setYoutubeCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const fetchYoutubeCount = async () => {
    const url = "/api/admin/youtube";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setYoutubeCount(data?.totalyoutubeVideo);
      console.log(data);
      console.log(data.totalyoutubeVideo);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchReviewCount = async () => {
    const url = "/api/admin/review";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setReviewCount(data?.totalReviews);
      console.log(data);
      console.log(data.totalReviews);

      // setReviews(data.Reviews);
      // setTotalReviews(data.totalReviews);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchReelCount = async () => {
    const url = "/api/admin/reel";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setReelCount(data.totalReels);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchBookCount = async () => {
    const url = "/api/admin/book";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setBookCount(data.totalBooks);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchYoutubeCount(), fetchBookCount(), fetchReelCount(), fetchReviewCount();
  }, []);

  return (
    <>
      <div className="card-header-tab card-header">
        <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
          <i className="header-icon lnr-charts icon-gradient bg-happy-green">
            {" "}
          </i>{" "}
          Portfolio
        </div>
      </div>
      <div className="no-gutters row">
        <div className="col-sm-6 col-md-4 col-xl-4">
          <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
            <div className="icon-wrapper rounded-circle">
              <div className="icon-wrapper-bg opacity-10 bg-warning" />
              <i className="lnr-highlight text-dark opacity-8" />
            </div>
            <div className="widget-chart-content">
              <div className="widget-subheading">Total Reviews</div>
              <div className="widget-numbers">{reviewCount}</div>
            </div>
          </div>
          <div className="divider m-0 d-md-none d-sm-block" />
        </div>
        <div className="col-sm-12 col-md-4 col-xl-4">
          <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
            <div className="icon-wrapper rounded-circle">
              <div className="icon-wrapper-bg opacity-9 bg-success" />
              <i className="lnr-book text-white" />
            </div>
            <div className="widget-chart-content">
              <div className="widget-subheading">Books</div>
              <div className="widget-numbers text-success">
                <span>{bookCount}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-4 col-xl-4">
          <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
            <div className="icon-wrapper rounded-circle">
              <div className="icon-wrapper-bg opacity-9 bg-info" />
              <i className="lnr-film-play text-white" />
            </div>
            <div className="widget-chart-content">
              <div className="widget-subheading">Reels</div>
              <div className="widget-numbers text-info">
                <span>{reelCount}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-4 col-xl-4">
          <div className="card no-shadow rm-border bg-transparent widget-chart text-left">
            <div className="icon-wrapper rounded-circle">
              <div className="icon-wrapper-bg opacity-9 bg-info" />
              <i className="lnr-film-play text-white" />
            </div>
            <div className="widget-chart-content">
              <div className="widget-subheading">Youtub Video</div>
              <div className="widget-numbers text-info">
                <span>{youtubeCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Portfolioperformance;
