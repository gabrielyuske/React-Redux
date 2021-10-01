/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { FaHome, FaSignInAlt, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import { Nav } from "./styled";

export default function Header() {

  return (
    <Nav>
      <Link to="/">
        <FaHome fontSize={24} />
      </Link>
      <Link to="/register">
        <FaSignInAlt fontSize={24} />
      </Link>
      <Link to="/login">
        <FaUserAlt fontSize={24} />
      </Link>
    </Nav>
  );
}

