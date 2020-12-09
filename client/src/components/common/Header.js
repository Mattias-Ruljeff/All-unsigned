import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const activestyle = { color: "orange" };
  return (
    <nav>
      <NavLink activeStyle={activestyle} to="/" exact>
        Home
      </NavLink>{" "}
      |{" "}
      <NavLink activeStyle={activestyle} to="/addband">
        Add new band
      </NavLink>
    </nav>
  );
}

export default Header;
