import { post } from "./apiManager";

export const receivables = (body, onSuccess, onFailed, onComplete) => {
  post("/reports/receivables", body, onSuccess, onFailed, onComplete);
};

export const returns = (body, onSuccess, onFailed, onComplete) => {
  post("/reports/returns", body, onSuccess, onFailed, onComplete);
};
