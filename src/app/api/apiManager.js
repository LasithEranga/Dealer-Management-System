import { Navigate } from "react-router-dom";
import { showAlert } from "../../reducers/alertSlice";
import { showSystemAlert } from "../alertServices";
import { store } from "./store";
import { logout } from "../../reducers/loginSlice";

export const post = (
  path,
  body,
  setLoadingStatusFor,
  onSuccess = () => {},
  onFailed = () => {},
  onComplete = () => {}
) => {
  const jwt = store.getState().loginDMS.jwt;
  store.dispatch({
    type: "SET_LOADING_FOR",
    payload: { loadingAction: setLoadingStatusFor },
  });
  fetch(`${process.env.REACT_APP_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      credentials: "include",
    },
    body: JSON.stringify({ ...body, jwt }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 1) {
        store.dispatch(
          showAlert({
            isVisible: true,
            message: data.message ? data.message : "",
            severity: "error",
          })
        );
      }
      if (data.error) {
        //navigate login
        if (data.error === "NOT_LOGGEDIN" || data.error === "UNAUTHORIZED") {
          store.dispatch(logout());
          showSystemAlert("Session Expired! Please login again", "warning");
        }
      }
      onSuccess(data);
    })
    .catch((error) => {
      console.log(error);
      onFailed(error);
    })
    .finally(() => {
      onComplete();
      store.dispatch({
        type: "CLEAR_LOADING_FOR",
        payload: { loadingAction: setLoadingStatusFor },
      }); // removes animation whatever happened
    });
};
