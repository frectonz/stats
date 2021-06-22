import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import { LayoutProvider } from "./hooks/useLayout";
import { NumberOfInputsProvider } from "./hooks/useNumberOfInputs";

ReactDOM.render(
  <React.StrictMode>
    <LayoutProvider>
      <NumberOfInputsProvider>
        <App />
      </NumberOfInputsProvider>
    </LayoutProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
