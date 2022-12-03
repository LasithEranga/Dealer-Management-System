import { post } from "./apiManager";

const getStockByUser = (body, onSuccess, onFailed, onComplete) => {
  post("/stocks/new", body, onSuccess, onFailed, onComplete);
};
const newStock = (body, onSuccess, onFailed, onComplete) => {
  post("/stocks/new", body, onSuccess, onFailed, onComplete);
};
