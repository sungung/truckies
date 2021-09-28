import React, { useRef, useState } from "react"
import { useAuth } from "../common/AuthContext";
import { Link, useHistory } from "react-router-dom"

const UpdateProfile = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { state, changePassword, changeEmail } = useAuth()
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }    

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== state.currentUser.email) {
      promises.push(changeEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(changePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch((e) => {
        console.error(e);
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <h1>Update Profile</h1>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="email" ref={emailRef} required defaultValue={state.currentUser.email} />
        <input type="password" placeholder="Leave blank to keep the same" ref={passwordRef} />
        <input type="password" placeholder="Leave blank to keep the same" ref={passwordConfirmRef} />
        <button disabled={loading} type="submit">Update</button>
      </form>
      <div><Link to="/">Cancel</Link></div>
    </>
  )
}

export default UpdateProfile;