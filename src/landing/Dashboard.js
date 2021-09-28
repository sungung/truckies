import React from "react";
import { useAuth } from "../common/AuthContext";;

const Dashboard = () => {

  const { state, logout } = useAuth();

  return (
    <>
      <h1>Dashboard</h1>
      <h2>{ state.currentUser.email }</h2>
      <button onClick={ () => logout() }>Logout</button>
    </>
  )
};

export default Dashboard;