import  useUser from "../common/UserContext";
import { Redirect } from "react-router-dom";
import { FirebaseAuth } from "react-firebaseui";
import fbase, {fbaseui} from "../common/fbase";

const Login = () => {
  const { auth } = useUser();

  return (
    <>
      {!!auth.currentUser ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
        <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
          <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
            <div className="p-4 py-6 text-white bg-gray-700 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
              <div className="my-3 text-4xl font-bold tracking-wider text-center">
                <a href="https://www.vict.com.au">VICT</a>
              </div>
              <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consectetur, ex interdum rutrum viverra, diam felis pharetra nulla, nec molestie massa ante eu risus. 
              </p>
              <p className="mt-6 text-sm text-center text-gray-300">
                Read our <a href="https://www.vict.com.au/customer-and-user-information/terms-and-conditions/" className="underline">terms and conditions</a>
              </p>
            </div>
            <div className="p-5 bg-white md:flex-1">
              {/* To prevent auto login after logout, call disableAutoSignIn */}
              <FirebaseAuth uiCallback={ (ui) => ui.disableAutoSignIn() } uiConfig={fbaseui} firebaseAuth={fbase.auth()} />
            </div>
          </div>
        </div>  
      )}
    </>
  )
}

export default Login;