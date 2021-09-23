import React from "react";
import { Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

import store from "./store";
import history from "./services/history";
import Routes from "./routes";
import Globalstyles from "./styles/Globalstyles";
import Header from "./components/Header";


function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <Routes />
        <Globalstyles />
        {/* autoClose === milisegundo */}
        <ToastContainer autoClose={3000} className="toast-container" />
      </Router>
    </Provider>
  );
}

export default App;
