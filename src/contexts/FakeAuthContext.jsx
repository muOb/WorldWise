import { createContext, useContext, useReducer } from "react";

//initialState for useReducer hook
const initialState = {
  user: null,
  iSAuthenticated: false,
};
//function reducer for useReducer hook
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, iSAuthenticated: true, user: action.payload };
    case "logout":
      return { ...state, iSAuthenticated: false, user: null };
    default:
      throw new Error("UnKnown Action");
  }
}
//for authintication - need for login and logout function-.
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
//create context
const AuthContext = createContext();
//******main Component********
function AuthProvider({ children }) {
  const [{ user, iSAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, iSAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
