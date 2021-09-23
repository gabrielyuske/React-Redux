import { createStore } from "redux";


const initialState = {
  botaoClicado: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "BOTAO_CLICADO":
      // ...state === compiando o estado atual de state
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      return newState;

    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
