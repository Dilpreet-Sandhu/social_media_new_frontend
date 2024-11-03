




import { Navigate, Outlet } from "react-router-dom"

interface protectedRoutesProps {
    children : any
    user? : any;
    redirect?: string
}


const ProtectedRotues = ({children,user,redirect="/login"} :protectedRoutesProps) => {




  


    if (!user) return <Navigate to={redirect}/>

  return children ? children : <Outlet/>
}

export default ProtectedRotues;
