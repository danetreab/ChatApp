import { useAuthState } from "react-firebase-hooks/auth";
import { userContext } from "../Context/userContext";
import firebase from "../firebase/clientApp";
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(firebase.auth());
  return (
    <>
    <userContext.Provider value={{user}}>
      <Component {...pageProps}/>
    </userContext.Provider>
    </>
  );
}

export default MyApp;
