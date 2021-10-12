
import React from "react";

import { Container } from "../../styles/Globalstyles";
import { Form } from "./styled";
import { toast } from "react-toastify";
import { isEmail } from "validator";
import { useDispatch ,useSelector} from "react-redux";
import { get } from "lodash";

import Loading from "../../components/Loading";


import * as actions from "../../store/modules/auth/actions";

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, "location.state.prePath", "/");

  const isLoading = useSelector(state => state.auth.isLoading);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(email);
    var formErrors = false;
    if (!isEmail(email)) {
      formErrors = true;
      toast.error("Email invalido");
    }
    if (password.length < 6 || password.lenght > 50) {
      formErrors = true;
      toast.error("Senha Invalida");
    }
    if (formErrors) return;

    dispatch(actions.loginRequest({ email, password, prevPath }));
  };
  
  return (
    <Container>
      <Loading isLoading={isLoading}/>
      <h1>Login</h1>

      <Form onSubmit={handleSubmit}>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Seu Email"></input>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Sua Senha"></input>
        <button type="submit">Acessar</button>
      </Form>
    </Container>
  );
}
