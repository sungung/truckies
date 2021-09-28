import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./common/AuthContext";
import PrivateRoute from "./authentication/PrivateRoute";
import Header from "./common/Header";
import routes from "./common/routes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Switch>
          {routes.map(route => (
            route.private
              ? <PrivateRoute
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                />
              : <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
                />
          ))}
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
