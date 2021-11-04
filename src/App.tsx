import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from "./common/UserContext";
import PrivateRoute from "./authentication/PrivateRoute";
import {NavbarPage} from "./common/Navbar";
import routes from "./common/routes";
import fbase, { fmessage } from "./common/fbase";
import Notifications from "./common/Notifications";
import "./App.css";

function App() {
  const [notification, setNotification] = useState({ title: "", body: "", eventid: "" });

  fmessage.onMessage((payload) => {
    setNotification({
      title: payload?.notification?.title,
      body: payload?.notification?.body,
      eventid: payload?.data?.eventid,
    });
    console.log("New notification: " + JSON.stringify(payload));
  })

  return (
    <Router>
      <UserProvider>
        <NavbarPage/>
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
        <Notifications title={notification.title} body={notification.body} eventid={notification.eventid} />
      </UserProvider>
    </Router>
  );
}

export default App;
