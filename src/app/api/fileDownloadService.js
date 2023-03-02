import { store } from "./store";

export const downloadFile = (fileName, onSuccess, onFailed, onComplete) => {
  store.dispatch({
    type: "SET_LOADING_FOR",
    payload: { loadingAction: "downloadFileLoading" },
  });
  fetch(`${process.env.REACT_APP_BASE_URL}/files/download`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ fileName: fileName }),
  })
    .then((res) => res.blob())
    .then((blob) => {
      const file = window.URL.createObjectURL(blob);
      onSuccess(file);
    })
    .catch((error) => {
      console.log(error);
      onFailed(error);
    })
    .finally(() => {
      onComplete();
      store.dispatch({
        type: "CLEAR_LOADING_FOR",
        payload: { loadingAction: "downloadFileLoading" },
      }); // removes animation whatever happened
    });
};
