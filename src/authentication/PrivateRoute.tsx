import { Route, Redirect, RouteProps } from "react-router-dom";
import { IAuthCtx, useAuth } from "../common/AuthContext";

interface PrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute = (privateProps : PrivateRouteProps) => {
  const { component: Component, ...props } = privateProps;
  const { state } = useAuth() as IAuthCtx

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