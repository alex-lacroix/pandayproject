const defaultState = {
  loggedIn: false,
  searchResults: [],
  username: "",
  email: "",
  category: "",
  display: false,
  usersEvents: [],
  searchResult: "",
  eventId: ""
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return defaultState;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return defaultState;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    // Ignore
  }
};
