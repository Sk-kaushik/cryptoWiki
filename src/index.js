import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import store from "./app/store";
import { Provider } from "react-redux";

import "antd/dist/antd.css";
import "./Styles/style.scss";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
