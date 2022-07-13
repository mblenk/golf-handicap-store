//react
import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload }
        case 'LOGOUT':
            return { ...state, user: null }
        case 'AUTH_IS_READY':
            return { ...state, user: action.payload, authIsReady: true }
        default:
            return state
    } 
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        authIsReady: false,
    })

    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await axios.get('http://localhost:5000/user/check', { 
                withCredentials: true, 
                credentials: 'include' 
                })
                dispatch({ type: 'AUTH_IS_READY', payload: user.data })
            }
            catch(err) {
                dispatch({ type: 'AUTH_IS_READY', payload: null })
            }
            
        } 
        getUser()
    }, [])


    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )
}