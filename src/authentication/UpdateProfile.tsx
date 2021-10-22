import React, { useState } from "react"
import useUser from "../common/UserContext";
import { Link, useHistory } from "react-router-dom"

const UpdateProfile = () => {
  const { changePassword } = useUser();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
      pwConfirm: { value: string };
    }

    if (target.password.value !== target.pwConfirm.value) {
      return setError("Passwords do not match")
    }    

    const promises = []
    setLoading(true)
    setError("")

    if (target.password.value) {
      promises.push(changePassword(target.password.value))
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
        <input name="password" type="password" placeholder="Leave blank to keep the same"  />
        <input name="pwConfirm" type="password" placeholder="Leave blank to keep the same"  />
        <button disabled={loading} type="submit">Update</button>
      </form>
      <div><Link to="/">Cancel</Link></div>
    </>
  )
}

export default UpdateProfile;