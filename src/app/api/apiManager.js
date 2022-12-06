import { showAlert } from "../../reducers/alertSlice";
import { store } from "./store";

export const post = (
  path,
  body,
  onSuccess = () => {},
  onFailed = () => {},
  onComplete = () => {}
) => {
  console.log("dsf");
  fetch(`${process.env.REACT_APP_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
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
      onSuccess(data);
    })
    .catch((error) => {
      console.log(error);
      onFailed(error);
    })
    .finally(() => {
      onComplete();
    });
};
