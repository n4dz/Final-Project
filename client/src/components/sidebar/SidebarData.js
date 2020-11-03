import React from "react";
import { FaUserAlt, FaRunning } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BiStats } from "react-icons/bi";
import { MdDone } from "react-icons/md";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <FaUserAlt />,
    cName: "nav-text",
  },
  {
    title: "Stats",
    path: "/stats",
    icon: <BiStats />,
    cName: "nav-text",
  },
  {
    title: "Exercises",
    path: "/exercises",
    icon: <FaRunning />,
    cName: "nav-text",
  },
  {
    title: "Completion",
    path: "/completion",
    icon: <MdDone />,
    cName: "nav-text",
  },
];
