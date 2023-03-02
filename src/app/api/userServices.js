import { post } from "./apiManager";

export const userLogin = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/users/login",
    body,
    "userLoginLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const newDealer = (body, onSuccess, onFailed, onComplete) => {
  post("/users/new", body, "newDealerLoading", onSuccess, onFailed, onComplete);
};

export const updateDealer = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/users/update",
    body,
    "updateDealerLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const getAllDealers = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/users/getAllDealers",
    body,
    "getAllDealersLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const searchDealer = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/users/search",
    body,
    "searchDealerLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};
