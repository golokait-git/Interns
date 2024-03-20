import Header from "components/common/Header";
import Navbar from "components/common/Navbar";
import { useSelector } from "react-redux";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
//********** component***********\\

import { useDispatch } from "react-redux";
// toaster

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Reviewsub from "components/dashboard/main/reviewsub";

export default function Review({ session }) {
  const router = useRouter();

  const dispatch = useDispatch();
  const openclosesidemanutabu = useSelector((state) => state.smC.sideBarvis);

  return (
    <>
      <ToastContainer />
      <div
        className={
          openclosesidemanutabu
            ? "app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar closed-sidebar-mobile closed-sidebar sidebar-mobile-open"
            : "app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar closed-sidebar"
        }
      >
        <Header session={session} />
        <div className="app-main">
          <Navbar session={session} />
          <Reviewsub session={session} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      props: { session },
    };
  } else {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}
