import { call, put, all, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { get } from "lodash";
import * as actions from "./actions";
import * as types from "../types";
import axios from "../../../services/axios";
import history from "../../../services/history";

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, "/tokens", payload);
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success("Login SUCCESS");
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath)
  } catch (e) {
    toast.error("Usuario ou senha invalido");
    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, "auth.token", "");
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function* registerRequest({payload}){
  const {id,nome,email,password,history } = payload;
  try{
    if(id){
      yield call(axios.put,"/users",{
        email,
        nome,
        password: password || undefined,
      });
      toast.success("Conta Atualizada");
      yield put(actions.registerUpdateSuccess({nome ,email,password}));
    }else{
      yield call(axios.post,"/users",{
        email,
        nome,
        password,
      });
      toast.success("Conta criada com sucesso!");
      yield put(actions.registerCreateSuccess({nome ,email,password}));
      history.push("/login");
    }
  }catch(e){
    const errors = get(e,"response.data.error",[]);
    const status = get(e, "response.status", 0);

    // eslint-disable-next-line eqeqeq
    if(status === 401){
      toast.error("Voce precisa fazer login novamente");
      yield put(actions.loginFailure());
      return history.push("/login");
    }
    if(errors.lenght > 0){
      errors.map((err) => toast.error(err));
    }else{
      toast.error("Erro desconhecido");
    }
    yield put(actions.registerFailure());
    return history.push("/login");
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
