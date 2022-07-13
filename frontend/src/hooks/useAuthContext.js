//hooks
import { AuthContext } from "../context/AuthContext";
//react
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw Error('useAuthContext is not valid outside the scope of the AuthProvider')
    }

    return context 
}