import { useRef } from "react"
import { useCookies } from "react-cookie"
import useJWTStore from "../Store/JWTStore"
import "../../static/Login.css"
import useUserId from "../Store/userStore"

const LoginPage: React.FC<{}> = () => {
    const inputFormRef = useRef<HTMLInputElement>(null)
    const passwdFormRef = useRef<HTMLInputElement>(null)
    const [cookies, setCookie, removeCookie] = useCookies()
    const setUserId = useUserId(state => state.setuserId)
    const sendAuthRequest = async () => {
        if(inputFormRef.current && passwdFormRef.current) {
            const data = {login: inputFormRef.current.value, password: passwdFormRef.current.value}
            console.log(data)
            //simulating response
            try {
                const jwt = await fetch("http://192.168.0.109:8080/get-token", {
                    headers: new Headers({
                        'Authorization': JSON.stringify(data), 
                        'Content-Type': 'application/json'
                    })
                })
                const response = await jwt.json()
                if(!response.err) {
                    console.log(response)
                    setCookie("jwt", response.id)
                } else {
                    alert("incorect login credentials", response.err)
                }
            } catch(err) {
                console.log(err)
            }
        }
    }
    return (
        <div className="form">
            <img src="../../static/logo.png" className="loginlogo noselect"/>
            <p className="projectname noselect">Taskmaster</p>
            <p className="fieldname noselect">Login:</p>
            <input ref={inputFormRef} className="login_input" autoFocus></input>
            <p className="fieldname noselect">Password:</p>
            <input ref={passwdFormRef} className="login_input" type="password"></input>
            <button onClick={sendAuthRequest} className="submit_button noselect">Submit</button>
        </div>
    )
}
export default LoginPage