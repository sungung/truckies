import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./common/AuthContext";
import PrivateRoute from "./authentication/PrivateRoute";
import Header from "./common/Header";
import routes from "./common/routes";
import fireabaseApp from "./common/firebase";

function App() {

  useEffect(() => {
    fireabaseApp.messaging().getToken({vapidKey: process.env.REACT_APP_FIREBASE_VAPIDKEY})
    .then((currentToken) => {
      console.log("Device token is " + currentToken);
      navigator.serviceWorker.addEventListener("message", (message) => console.log(message));
    })
    .catch((error) => {
      console.error("An error occurred while retrieving token. ", error);
    });    
  }, []);

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
