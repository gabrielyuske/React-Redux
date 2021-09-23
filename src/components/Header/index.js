/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { FaHome, FaSignInAlt, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Nav } from "./styled";

export default function Header() {
  const botaoClicado = useSelector(state => state.botaoClicado);

  return (
    <Nav>
      <Link to="/">
        <FaHome fontSize={24} />
      </Link>
      <Link to="/sign">
        <FaSignInAlt fontSize={24} />
      </Link>
      <Link to="/login">
        <FaUserAlt fontSize={24} />
      </Link>
      {botaoClicado ? "Clicado" : "NAo Clicado"}
    </Nav>
  );
}

