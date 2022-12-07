import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ThemeProvider from "./theme";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import { persistor, store } from "./app/api/store";
import { Provider } from "react-redux";
import SystemAlerts from "./components/SystemAlerts/SystemAlerts";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <SystemAlerts />
        <App />
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
