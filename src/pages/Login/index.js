/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import { useDispatch } from "react-redux";

import { Container } from "../../styles/Globalstyles";
import { Title, Paragrafo } from "./styled";
import * as exampleActions from "../../store/modules/example/actions";

export default function Login() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();

    dispatch(exampleActions.clickButtonRequest());
  }

  return (
    <Container>
      <Title>
        Login
        <small>Oie</small>
      </Title>
      <Paragrafo>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Paragrafo>
      <button type="button" onClick={handleClick}>Enviar</button>
    </Container>
  );
}
