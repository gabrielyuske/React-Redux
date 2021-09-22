/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";

import { Container } from "../../styles/Globalstyles";
import { Title, Paragrafo } from "./styled";

export default function Login() {
  return (
    <Container>
      <Title>
        Login
        <small>Oie</small>
      </Title>
      <Paragrafo>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Paragrafo>
      <button type="button">Enviar</button>
    </Container>
  );
}
