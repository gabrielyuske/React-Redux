/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { FaHome, FaSignInAlt, FaUserAlt, FaCircle, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../store/modules/auth/actions";
import history from "../../services/history";
import { Nav } from "./styled";

export default function Header() {

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const handleLogout = e => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.push("/");
  }
  return (
    <Nav>
      <Link to="/">
        <FaHome fontSize={24} />
      </Link>
      <Link to="/register">
        <FaUserAlt fontSize={24} />
      </Link>

      {isLoggedIn ? (
        <Link  onClick={handleLogout} to="/login">
          <FaSignOutAlt fontSize={24} />
        </Link>
      ):(
        <Link to="/login">
          <FaSignInAlt fontSize={24} />
        </Link>
      ) }

      {isLoggedIn && <FaCircle size={15} color="#66ff33" />}
    </Nav>
  );
}

