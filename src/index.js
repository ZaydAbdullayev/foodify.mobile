import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./router";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Modal } from "./components/modal/modal";
import { Loading } from "./components/loading/loading";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
      <BrowserRouter>
        <Router />
        <Modal />
        <Loading />
      </BrowserRouter>
    </SnackbarProvider>
  </Provider>
);
