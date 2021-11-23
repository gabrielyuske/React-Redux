/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import { isEmail, isInt, isFloat } from 'validator';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import axios from '../../services/axios';
import { Container } from '../../styles/Globalstyles';
import { Form, ProfilePicture, Title } from './styled';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';


export default function Aluno({ match, history }) {
  const dispatch = useDispatch();

  const id = get(match, "params.id", "");
  const [nome,setNome] = useState("");
  const [sobrenome,setSobrenome] = useState("");
  const [email,setEmail] = useState("");
  const [telefone,setTelefone] = useState("");
  const [idade,setIdade] = useState("");
  const [serie,setSerie] = useState("");
  const [foto, setFoto] = useState('');
  const [isLoading,setIsLoading] = useState(false);


  useEffect(() => {
    if(!id) return;

    async function getData(){
      try{
        setIsLoading(true);
        const {data} = await axios.get(`/alunos/${id}`);
        const Foto = get(data,"Fotos[0].url","");

        setFoto(Foto);

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setTelefone(data.telefone);
        setIdade(data.idade);
        setSerie(data.serie);

        setIsLoading(false);
      }catch(err){
        setIsLoading(false);
        const status = get(err,"response.status",0);
        const errors = get(err,"response.data.errors",[]);

        if(status === 400)errors.map((error) => toast.error(error));
        history.push("/");
      }
    }

    getData();
  }, [id,history]);


  const handleSubmit = async e =>{
    e.preventDefault();
    let formErrors = false;

    if(nome.length < 3 || nome.length > 255){
      toast.error("Nome precisa ter entre 3 e 255 caracteres");
      formErrors = true;
    }
    if(sobrenome.length < 3 || sobrenome.length > 255){
      toast.error("Sobrenome precisa ter entre 3 e 255 caracteres");
      formErrors = true;
    }
    if(!isEmail(email)){
      toast.error("Email invalido");
      formErrors = true;
    }
    if(!isInt(String(telefone))){
      toast.error("Telefone invalido");
      formErrors = true;
    }
    if(!isInt(String(idade))){
      toast.error("Idade invalido");
      formErrors = true;
    }
    if(!isFloat(String(serie))){
      toast.error("Serie invalido");
      formErrors = true;
    }
    if(formErrors) return;

    try{
      setIsLoading(true);
      if(id){
        await axios.put(`/alunos/${id}`,{
          nome,
          sobrenome,
          email,
          telefone,
          idade,
          serie,
        });
        toast.success("Aluno Editado");
      }else{
        const { data } = await axios.post(`/alunos/`,{
          nome,
          sobrenome,
          email,
          telefone,
          idade,
          serie,
        });
        toast.success("Aluno Criado");
        history.push(`/aluno/${data.id}/edit`);
      }

      setIsLoading(false);
    }catch(err){
      setIsLoading(false);
      const status = get(err,"response.status",0);
      const data = get(err,"response.data",{});
      const errors = get(data,"error",[]);

      if(errors.length > 0 ){
        errors.map((error) => toast.error(error));
      }else{
        toast.error("Erro desconhecido");
      }
      if(status === 401) dispatch(actions.loginFailure());
    }

  };

  return (
    <Container>
      <Loading isLoading={isLoading}/>
      <Title>{id ? 'Editar aluno' : 'Novo Aluno'}</Title>

      {id &&(
        <ProfilePicture>
          {foto ? (
            <img src={foto} alt={nome}/>
          ):(
            <FaUserCircle size={180}/>
          )}
          <Link to={`/fotos/${id}`}>
            <FaEdit size={24}/>
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
      <input
        type="text"
        value={nome}
        onChange={(e)=>setNome(e.target.value)}
        placeholder="Nome"
      />
      <input
        type="text"
        value={sobrenome}
        onChange={(e)=>setSobrenome(e.target.value)}
        placeholder="Sobrenome"
      />
      <input
        type="text"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="text"
        value={telefone}
        onChange={(e)=>setTelefone(e.target.value)}
        placeholder="Telefone"
      />
      <input
        type="text"
        value={idade}
        onChange={(e)=>setIdade(e.target.value)}
        placeholder="Idade"
      />
      <input
        type="text"
        value={serie}
        onChange={(e)=>setSerie(e.target.value)}
        placeholder="Serie"
      />
      <button type="submit">Enviar</button>

      </Form>
    </Container>
  );
}
Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
  history: PropTypes.shape([]).isRequired,
};



