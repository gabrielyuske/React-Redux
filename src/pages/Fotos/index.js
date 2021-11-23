/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import {get} from "lodash";
import { Container } from "../../styles/Globalstyles";
import Loading from "../../components/Loading";
import { Title,Form } from "./styled";
import axios from "../../services/axios";
import history from "../../services/history";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import * as actions from "../../store/modules/auth/actions"


export default function Fotos({match}) {
  const id = get(match,`params.id`,"");
  const dispatch = useDispatch();
  const [isLoading,setIsLoading] = React.useState(false);
  const [foto,setFoto] = React.useState("");

  React.useEffect(()=>{
    const getData = async () => {
      try{
        setIsLoading(true);
        //pegando data de response
        const {data} = await axios.get(`alunos/${id}`);
        setFoto(get(data,"Fotos[0].url",""));
        setIsLoading(false);
      }catch{
        toast.error("Erro ao obter a imagem");
        setIsLoading(false);
        history.push("/");
      }
    };
    getData();
  },[id]);

  const handleChange = async e => {
    const foto = e.target.files[0];
    const fotoUrl = URL.createObjectURL(foto);

    setFoto(fotoUrl);

    const formData = new FormData();
    formData.append("aluno_id",id);
    formData.append("foto",foto);

    try {
      setIsLoading(true);

      await axios.post("/fotos/",formData,{
        headers:{
          "Content-Type": "multipart/form-data",
        }
      });

      toast.success("Foto enviada com sucesso");

      setIsLoading(false);
    }catch(err){
      setIsLoading(false);
      const {status} = get(err,"response","");
      toast.error("Erro ao enviar a foto");

      if(status === 401) dispatch(actions.loginFailure)
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <Title>Fotos</Title>

      <Form>
        <label htmlFor="foto">
          {foto ? <img src={foto} alt="Foto"/>:"Selecionar"}
          <input type="file" id="foto" onChange={handleChange}/>
        </label>
      </Form>

    </Container>
  );
}

Fotos.propTypes = {
  match:PropTypes.shape().isRequired,
}

