import React from "react";
import { FaHome, FaSignInAlt, FaUserAlt } from "react-icons/fa";

import { Nav } from "./styled";

export default function Header() {
  return (
    <Nav>
      <a href="">
        <FaHome fontSize={24} />
      </a>
      <a href="">
        <FaSignInAlt fontSize={24} />
      </a>
      <a href="">
        <FaUserAlt fontSize={24} />
      </a>

    </Nav>
  );
}

