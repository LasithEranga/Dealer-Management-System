import { post } from "./apiManager";

export const newTank = (body, onSuccess, onFailed, onComplete) => {
  console.log("ksjdnfj");
  post("/tanks/new", body, onSuccess, onFailed, onComplete);
};
