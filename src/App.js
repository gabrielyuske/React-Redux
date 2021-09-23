import React from "react";
import { Router } from "react-router-dom";

import history2 from "./services/history";
import Routes from "./routes";
import Globalstyles from "./styles/Globalstyles";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router history={history2}>
      <Header />
      <Routes />
      <Globalstyles />
      {/* autoClose === milisegundo */}
      <ToastContainer autoClose={3000} className="toast-container" />
    </Router>
  );
}

export default App;
