import { post } from "./apiManager";

export const newTank = (body, onSuccess, onFailed, onComplete) => {
  post("/tanks/new", body, onSuccess, onFailed, onComplete);
};

export const getAllTanks = (onSuccess, onFailed, onComplete) => {
  post("/tanks/getAll", {}, onSuccess, onFailed, onComplete);
};
