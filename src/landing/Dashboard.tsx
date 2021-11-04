import useUser from "../common/UserContext";

const Dashboard = () => {
  const { auth, logout } = useUser();
  return (
    <>
      <h1>Dashboard</h1>
      <h2>{ auth.currentUser!.email }</h2>
      <div className="rounded-t-xl overflow-hidden bg-gradient-to-r from-light-blue-50 to-light-blue-100 p-10">
        <div className="max-w-xs w-full mx-auto">
          <input className="py-3 px-4 bg-white rounded-lg placeholder-gray-400 text-gray-900 appearance-none inline-block w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Focus me"/>
        </div>
        <button type="button" className="py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none">
          Hover me
        </button>
      </div>
    </>
  )
};

export default Dashboard;