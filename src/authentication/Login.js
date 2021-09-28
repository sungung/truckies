import { useState } from "react";
import { useAuth } from "../common/AuthContext";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const [ error, setError ] = useState("");
  const { login } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      await login(email.value, password.value);
      history.push("/")
    } catch (e) {
      console.error(e.message);
      setError(e.code);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={ handleSubmit }>
        <input name="email" placeholder="email" type="email"/>
        <input name="password" placeholder="password" type="password"/>
        <button type="submit">Login</button>
      </form>
      {error && <div>{error}</div>}
      <Link to="/forgot-password">Forgot Password?</Link>
      <Link to="/signup">Sign Up</Link>
    </>
  )
}

export default Login;