import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "signup-success") {
    return { ...state, loggedIn: true };
  }
  if (action.type === "login-success") {
    return { ...state, loggedIn: true };
  }
  if (action.type === "logout") {
    return { ...state, loggedIn: false, username: "" };
  }
  if (action.type === "set-username") {
    return { ...state, username: action.username };
  }
  if (action.type === "set-category") {
    return { ...state, category: action.category };
  }
  if (action.type === "store-search-results") {
    return { ...state, searchResults: action.searchResults };
  }
  return state;
};

const store = createStore(
  reducer,
  { loggedIn: false, searchResults: [], username: "", category: "" },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
