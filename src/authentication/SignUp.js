import { useState } from "react";
import { useAuth } from "../common/AuthContext"
import { useHistory } from "react-router-dom"

const SignUp = () => {
  const [ error, setError ] = useState("");
  const { signup } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      await signup(email.value, password.value);
      history.push("/");
    } catch(e) {
      console.error(e.message);
      setError(e.code);
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={ handleSubmit }>
        <input name="email" placeholder="email" type="email"/>
        <input name="password" placeholder="password" type="password"/>
        <button type="submit">Sign Up</button>
      </form>
      {error && <div>{error}</div>}
    </>
  )
}

export default SignUp;