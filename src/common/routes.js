import Dashboard from "../landing/Dashboard";
import UpdateProfile from "../authentication/UpdateProfile";
import SignUp from "../authentication/SignUp";
import Login from "../authentication/Login";
import ForgotPassword from "../authentication/ForgotPassword";

const routes = [
  { name: "Dashboard", private: true, path: "/", exact: true, main: Dashboard },
  { name: "UpdateProfile", private: true, path: "/update-profile", exact: true, main: UpdateProfile },
  { name: "SignUp", private: false, path: "/signup", exact: true, main: SignUp },
  { name: "Login", private: false, path: "/login", exact: true, main: Login },
  { name: "ForgotPassword", private: false, path: "/forgot-password", exact: true, main: ForgotPassword }
];

export default routes;