import React, { useState } from "react";
import { useAuth } from "../common/AuthContext";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = e.target.elements;
    try{
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(email.value)
      setMessage("Check your mailbox for further instruction.");
    } catch(e) {
      setError("Failed to reset password. " + e);
    }
    setLoading(false);
  }

  return (
    <>
      <h1>Forgot Password</h1>
      {error && <div>{error}</div>}
      {message && <div>{message}</div>}
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="email"  required/>
        <button disabled={loading} type="submit">Reset Password</button>
      </form>
      <div><Link to="/login">Login</Link></div>
      Need an account? <Link to="/signup">Sign up</Link>
    </>
  )
}

export default ForgotPassword;