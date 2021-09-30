import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./common/AuthContext";
import PrivateRoute from "./authentication/PrivateRoute";
import Header from "./common/Header";
import routes from "./common/routes";

function App() {
  return (
    <nav class="bg-gray-800">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
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
      </div>
    </nav>

  );
}

export default App;
