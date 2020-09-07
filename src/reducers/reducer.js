import actionTypes from "../constants/actionTypes";

const initialState = {
  user: {},
  data: {},
  isAuthenticated: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        ...action.data,
        isAuthenticated: true
      };
    default:
      return state;
  }
};