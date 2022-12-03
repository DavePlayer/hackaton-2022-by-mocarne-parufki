import { useRef } from "react"
import { useCookies } from "react-cookie"
import useJWTStore from "../Store/JWTStore"
import "../../static/Login.css"

const LoginPage: React.FC<{}> = () => {
    const inputFormRef = useRef<HTMLInputElement>(null)
    const passwdFormRef = useRef<HTMLInputElement>(null)
    const [cookies, setCookie, removeCookie] = useCookies()
    const sendAuthRequest = () => {
        if(inputFormRef.current && passwdFormRef.current) {
            const data = {login: inputFormRef.current.value, password: passwdFormRef.current.value}
            console.log(data)
            //simulating response
            const response = "JDJDJD"
            setCookie("jwt", response)
        }
    }
    return (
        <div className="form">
            <img src="../../static/logo.png" className="loginlogo"/>
            <p className="projectname">Taskmaster</p>
            <p className="fieldname">Login:</p>
            <input ref={inputFormRef} className="login_input"></input>
            <p className="fieldname">Password:</p>
            <input ref={passwdFormRef} className="login_input" type="password"></input>
            <button onClick={sendAuthRequest} className="submit_button">submit</button>
        </div>
    )
}
export default LoginPage