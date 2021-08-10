import React from "react";
import MainHeader from "./MainHeader";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../Backdrop/Backdrop";
import { useState } from "react";

import "./MainNavi.css";

const MainNavi = (props) => {
  const [isDrawOpen, setIsDrawOpen] = useState(false);
  const openDrawer = () => {
    setIsDrawOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawOpen(false);
  };
  return (
    <React.Fragment>
      {isDrawOpen && <Backdrop onClick={closeDrawer} />}
      <SideDrawer show={isDrawOpen} closeDrawer={closeDrawer} >
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      )
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>

        <h1 className="main-navgation__title">
          <Link to="/">Your Places</Link>
        </h1>

        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavi;
