import actionTypes from "../constants/actionTypes";

export const setUser = (userData) => {
  return { type: actionTypes.SET_USER, data: userData };
};


export const loginUser = (userData) => {
  return { type: actionTypes.LOGIN_USER, data: userData };
};

export const registerUser = (userData) => {
  return { type: actionTypes.REGISTER_USER, data: userData };
};