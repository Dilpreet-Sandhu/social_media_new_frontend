import { useState } from "react"
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";


const Auth = () => {

  const [isLoggingIn,setIsLoggingIn] = useState(true);

  return (
    <div >

      {
        isLoggingIn ? <Login setIsLoggingIn={setIsLoggingIn}/> : <SignUp setIsLoggingIn={setIsLoggingIn}/>
      }
      
    </div>
  )
}

export default Auth
