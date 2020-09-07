import "regenerator-runtime/runtime";
import './wdyr';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./firebase/firebase";
import AppRouter from "./routers/AppRouter";
import GlobalStyle from "./styles/globalStyles";
import configureStore from "./store/configureStore";
import Navbar from "./components/Navbar";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <GlobalStyle />
      <Navbar />
      <AppRouter />
    </Router>
  </Provider>,
  document.getElementById('app')
);