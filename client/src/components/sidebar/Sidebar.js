import React, { useState } from "react";
import { Link, Switch, Route, useHistory } from "react-router-dom";

// importing icon
import { IconContext } from "react-icons";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { BiLogIn, BiUser } from "react-icons/bi";

import { SidebarData } from "./SidebarData";
import "./Sidebar.css";

import Home from "../../pages/home/Home";
import Profile from "../../pages/profile/Profile";
import ProfileFollowing from "../../pages/profile-following/ProfileFollowing";
import ProfileFollowers from "../../pages/profile-followers/ProfileFollowers";
import Stats from "../../pages/stats/Stats";
import Login from "../../pages/login/Login";
import Exercises from "../../pages/exercises/Exercises";
import Completion from "../../pages/completion/Completion";
import SignUp from "../../pages/signup/SignUp";
import Error from "../../pages/error/Error";

export default function Sidebar() {
  const history = useHistory();
  const [sidebarVisibility, setSidebarVisibility] = useState(false);
  const showSidebar = () => setSidebarVisibility(!sidebarVisibility);
  const currentToken = sessionStorage.getItem("@token");
  let isTokenExisting;
  if (currentToken) {
    isTokenExisting = true;
  } else {
    isTokenExisting = false;
  }
  //useHistory when onClick on logo to redirect to homePage
  const goToHome = () => history.push("/");

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        {/* navigation bar in header */}
        <nav className="navbar">
          <Link to="#" className="menu-bars">
            <FaBars onClick={showSidebar} />
          </Link>
          <span className="menu-title" onClick={goToHome}>
            Fitness +
          </span>

          {!isTokenExisting ? (
            <Link to="/login" className="menu-login">
              <BiLogIn />
            </Link>
          ) : (
            <Link to="/profile" className="menu-login">
              <BiUser />
            </Link>
          )}
        </nav>
        {/* show sidebar visibility IF onClick */}
        <nav className={sidebarVisibility ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiOutlineClose />
              </Link>
            </li>
            {/* Loop over sidebarData to show in sidebar menu*/}
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
      <Switch>
        <Route path="/" exact>
          <Home sidebarStatus={sidebarVisibility} />
        </Route>
        <Route path="/profile/following">
          <ProfileFollowing sidebarStatus={sidebarVisibility} />
        </Route>
        <Route path="/profile/followers">
          <ProfileFollowers sidebarStatus={sidebarVisibility} />
        </Route>
        <Route path="/profile">
          <Profile sidebarStatus={sidebarVisibility} />
        </Route>
        <Route path="/stats">
          <Stats sidebarStatus={sidebarVisibility} />
        </Route>
        <Route path="/exercises">
          <Exercises sidebarStatus={sidebarVisibility} />
        </Route>
        <Route path="/completion">
          <Completion sidebarStatus={sidebarVisibility} />
        </Route>
        <Route path="/login">
          <Login sidebarStatus={sidebarVisibility} />
        </Route>
        <Route path="/signup">
          <SignUp sidebarStatus={sidebarVisibility} />
        </Route>
        <Route path="/error">
          <Error sidebarStatus={sidebarVisibility} />
        </Route>
      </Switch>
    </>
  );
}
