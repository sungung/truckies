import { useState } from "react";
import { IAuthCtx, useAuth } from "../common/AuthContext"
import { useHistory } from "react-router-dom"

const SignUp = () => {
  const [ error, setError ] = useState("");
  const { signup } = useAuth() as IAuthCtx;
  const history = useHistory();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    }
    try {
      await signup(target.email.value, target.password.value);
      history.push("/");
    // Not know type of exception now, so take it as any for the moment
    } catch(ex: any) {
      console.error(ex.message);
      setError(ex.code);
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