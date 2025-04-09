import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Global } from "@emotion/react";

import App from "./App";
import resetStyle from "@/components/etc/ResetStyle";
import globalStyle from "@/components/etc/GlobalStyle";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Global styles={[resetStyle, globalStyle]} />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
