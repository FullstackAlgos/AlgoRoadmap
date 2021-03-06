import React from "react";
import { render } from "react-dom";
import "./utils/style.css";
import App from "./components/App";
import history from "./utils/history";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import store from "./store";

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("app")
);
