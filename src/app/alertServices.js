import { hideAlert, showAlert } from "../reducers/alertSlice";
import { store } from "./api/store";

export const showSystemAlert = (message, severity) => {
  store.dispatch(
    showAlert({
      isVisible: true,
      message,
      severity,
    })
  );
};
export const hideSystemAlert = (message, severity) => {
  store.dispatch(hideAlert());
};
