import { post } from "./apiManager";

export const getStockByUser = (body, onSuccess, onFailed, onComplete) => {
  post("/stocks/new", body, onSuccess, onFailed, onComplete);
};
export const newStock = (body, onSuccess, onFailed, onComplete) => {
  post("/stocks/new", body, onSuccess, onFailed, onComplete);
};
export const getReOrderLevel = (body, onSuccess, onFailed, onComplete) => {
  post("/stocks/getReOrderLevel", body, onSuccess, onFailed, onComplete);
};
