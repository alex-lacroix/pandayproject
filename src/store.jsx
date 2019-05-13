import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "signup-success") {
    return { ...state, loggedIn: true };
  }
  if (action.type === "login-success") {
    return { ...state, loggedIn: true };
  }
  if (action.type === "logout") {
    return { ...state, loggedIn: false };
  }
  return state;
};

const store = createStore(
  reducer,
  { loggedIn: false, results: [], username: "" },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
