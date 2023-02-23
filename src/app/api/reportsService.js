import { post } from "./apiManager";

export const receivables = (body, onSuccess, onFailed, onComplete) => {
  post("/reports/receivables", body, onSuccess, onFailed, onComplete);
};
