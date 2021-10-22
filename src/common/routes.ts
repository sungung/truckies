import Dashboard from "../landing/Dashboard";
import FleetControl from "../user/FleetControl";
import Login from "../authentication/Login";
import Logout from "../authentication/Logout";

const routes = [
  { name: "Dashboard", private: true, path: "/", exact: true, main: Dashboard },
  { name: "My Fleet", private: true, path: "/myfleet", exact: true, main: FleetControl },
  { name: "Login", private: false, path: "/login", exact: true, main: Login },
  { name: "Logout", private: true, path: "/logout", exact: true, main: Logout },
];

export default routes;