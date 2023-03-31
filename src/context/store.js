import { createContext, useEffect, useReducer } from "react";

const initalState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};
//create context
export const Context = createContext(initalState);
//create reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return state;
  }
};
//dispatch action
export const Provider = (props) => {
  const [state, dispatch] = useReducer(reducer, initalState);
  //save user to local
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  });
  const loginHandler = (user) => {
    dispatch({ type: "LOGIN", payload: user });
  };
  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
  };

  const valueContext = {
    user: state.user,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <Context.Provider value={valueContext}>{props.children}</Context.Provider>
  );
};
