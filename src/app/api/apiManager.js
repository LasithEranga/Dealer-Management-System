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
