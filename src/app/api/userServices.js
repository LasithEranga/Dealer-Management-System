import { post } from "./apiManager";

export const userLogin = (body, onSuccess, onFailed, onComplete) => {
  post("/users/login", body, onSuccess, onFailed, onComplete);
};

export const newDealer = (body, onSuccess, onFailed, onComplete) => {
  post("/users/new", body, onSuccess, onFailed, onComplete);
};

export const updateDealer = (body, onSuccess, onFailed, onComplete) => {
  post("/users/update", body, onSuccess, onFailed, onComplete);
};

export const getAllDealers = (body, onSuccess, onFailed, onComplete) => {
  post("/users/getAllDealers", body, onSuccess, onFailed, onComplete);
};

export const searchDealer = (body, onSuccess, onFailed, onComplete) => {
  post("/users/search", body, onSuccess, onFailed, onComplete);
};
