import { useRef } from "react"
import { useCookies } from "react-cookie"
import useJWTStore from "../Store/JWTStore"

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
        <div style={{
            display: "flex",
            flexDirection: "column"
        }}>
            login:
            <input ref={inputFormRef}></input>
            password:
            <input ref={passwdFormRef}></input>
            <button onClick={sendAuthRequest}>submit</button>
        </div>
    )
}
export default LoginPage