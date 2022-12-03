import { post } from "./apiManager";

export const newTank = (body, onSuccess, onFailed, onComplete) => {
  post("/tanks/new", body, onSuccess, onFailed, onComplete);
};

export const searchGasTank = (body, onSuccess, onFailed, onComplete) => {
  post("/tanks/search", body, onSuccess, onFailed, onComplete);
};

export const updateTank = (body, onSuccess, onFailed, onComplete) => {
  post("/tanks/update", body, onSuccess, onFailed, onComplete);
};

export const getAllTanks = (onSuccess, onFailed, onComplete) => {
  post("/tanks/getAll", {}, onSuccess, onFailed, onComplete);
};
