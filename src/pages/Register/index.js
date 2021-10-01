/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState } from "react";
import { toast } from "react-toastify";
import { isEmail } from "validator";
import { get } from "lodash";

import { Container } from "../../styles/Globalstyles";
import { Form } from "./styled";
import axios from "../../services/axios";
import history from "../../services/history";

export default function Register() {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    var formErrors = false;
    if (nome.length < 3 || nome.lenght > 255) {
      formErrors = true;
      toast.error("Nome deve ter entre 3 e 255 caractetes");
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error("Email invalido");
    }
    if (password.length < 6 || password.lenght > 50) {
      formErrors = true;
      toast.error("Senha deve ter entre 6 e 50 caractetes");
    }
    if (formErrors) return;

    try {
      await axios.post("/users/", {
        nome, password, email,
      });
      toast.success("Cadastro concluido");
      history.push("/login");
    } catch (e) {
      const erros = get(e, "response.data.erros", []);
      console.log(erros);
    }
  }

  return (
    <Container>
      <h1>Crie sua conta</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:<input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Seu nome" />
        </label>
        <label htmlFor="email">
          E-mail:<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Seu email" />
        </label>
        <label htmlFor="senha">
          Senha:<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Sua senha" />

          <button type="submit">Criar minha conta</button>
        </label>
      </Form>
    </Container>
  );
}
