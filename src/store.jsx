import { createStore } from "redux";
import { loadState, saveState } from "./localStorage.js";

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
  if (action.type === "toggle-calendar") {
    return { ...state, display: action.payload };
  }
  if (action.type === "user-events") {
    return { ...state, usersEvents: action.usersEvents };
  }
  if (action.type === "store-result") {
    return { ...state, searchResult: action.searchResult };
  }
  return state;
};

const persistedState = loadState();
const store = createStore(
  reducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
