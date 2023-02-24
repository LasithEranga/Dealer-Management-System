import { post } from "./apiManager";

export const salesReport = (body, onSuccess, onFailed, onComplete) => {
  post("/reports/sales", body, onSuccess, onFailed, onComplete);
};

export const receivables = (body, onSuccess, onFailed, onComplete) => {
  post("/reports/receivables", body, onSuccess, onFailed, onComplete);
};

export const returns = (body, onSuccess, onFailed, onComplete) => {
  post("/reports/returns", body, onSuccess, onFailed, onComplete);
};
