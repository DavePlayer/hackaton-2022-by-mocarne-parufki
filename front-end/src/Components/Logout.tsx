import { useCookies } from "react-cookie"
import useJWTStore from "../Store/JWTStore"

const LogoutBtn = () => {
    const [ cookies, setCookie, removeCookie ] = useCookies()
    const removeLocalJWT = useJWTStore(store => store.removeJWT)
    const logoutHandler = () => {
        removeCookie("jwt")
        removeLocalJWT()
    }
    return <button onClick={logoutHandler}>Logout</button>
}

export default LogoutBtn