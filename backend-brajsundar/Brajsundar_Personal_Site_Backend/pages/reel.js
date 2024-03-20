import Head from "next/head";
import Image from "next/image";
import Header from "components/common/Header";
import Navbar from "components/common/Navbar";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
//********** component***********\\
import Reelsub from "components/dashboard/main/reelsub";

import io from "socket.io-client";
import { useDispatch } from "react-redux";
import { loadData } from "../store/dashboard/data";
// toaster

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Reel({ session }) {
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
                    <Reelsub session={session} />

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
