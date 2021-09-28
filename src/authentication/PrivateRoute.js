import { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../common/AuthContext";

const PrivateRoute = ({ component: Component, ...props}) => {
  const { state } = useAuth()

  return (
    <Route
      {...props}
      render={routeProps => {
        return state.currentUser ? <Component {...routeProps} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}

export default PrivateRoute;