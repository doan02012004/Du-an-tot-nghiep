import React, { useContext } from "react"
import { AppContext } from "../common/contexts/AppContextProvider"
import { Navigate } from "react-router-dom";

type Props = {
    children:React.ReactNode
}
 
const PrivateAdmin = ({children}:Props) => {
    const {currentUser} = useContext(AppContext) 
    let check = false as boolean;
    if(currentUser?.role == 'admin'){
        check = true
    }
  return check?children: <Navigate to={'/'} />
}

export default PrivateAdmin