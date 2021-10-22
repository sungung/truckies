import useUser from "../common/UserContext";
import { Redirect } from "react-router-dom";

const Logout = () => {
  const { logout } = useUser();
  // remove data under localStorage
  localStorage.removeItem("#secret#");
  logout();
  return <Redirect to="/login" />;
}

export default Logout;