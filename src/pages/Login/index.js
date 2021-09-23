/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import { useDispatch } from "react-redux";

import { Container } from "../../styles/Globalstyles";
import { Title, Paragrafo } from "./styled";

// import axios from "../../services/axios";

export default function Login() {
  // React.useEffect(() => {
  //   async function getData() {
  //     const response = await axios.get("pokedex.json");
  //     const { data } = response;
  //     console.log(data);
  //   }
  //   getData();
  // }, []);
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();

    dispatch({
      type: 'BOTAO_CLICADO',
    });
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
