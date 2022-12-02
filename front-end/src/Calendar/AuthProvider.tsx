import LoginPage from "../Pages/Login"
import create from "zustand"
import { useCookies } from "react-cookie"
import { useState } from "react"
import useJWTStore from "../Store/JWTStore"

interface AuthProviderInterface {
    children: JSX.Element[]
}

const useAuth = () => {
    const [cookies, setCookie, removeCookie] = useCookies()
    return cookies["jwt"] != undefined
}

const AuthProvider: React.FC<AuthProviderInterface> = ({children}) => {
    const auth = useAuth()
    if (!auth) {
        return <LoginPage />
    }
    return (
        <>
            {children}
        </>
    )
}


export default AuthProvider