import { Route, Redirect, RouteProps } from "react-router-dom";
import useUser from "../common/UserContext";

interface PrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute = (privateProps : PrivateRouteProps) => {
  const { component: Component, ...props } = privateProps;
  const { auth } = useUser();

  return (
    <Route
      {...props}
      render={routeProps => {
        return auth.currentUser ? <Component {...routeProps} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}

export default PrivateRoute;