import Dashboard from "../landing/Dashboard";
import UpdateProfile from "../authentication/UpdateProfile";
import Login from "../authentication/Login";

const routes = [
  { name: "Dashboard", private: true, path: "/", exact: true, main: Dashboard },
  { name: "UpdateProfile", private: true, path: "/update-profile", exact: true, main: UpdateProfile },
  { name: "Login", private: false, path: "/login", exact: true, main: Login },
];

export default routes;