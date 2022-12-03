import { useRef } from "react"
import { useCookies } from "react-cookie"
import useUserId from "../Store/userStore"

const LoginPage: React.FC<{}> = () => {
    const inputFormRef = useRef<HTMLInputElement>(null)
    const passwdFormRef = useRef<HTMLInputElement>(null)
    const [cookies, setCookie, removeCookie] = useCookies()
    const setUserId = useUserId(state => state.setuserId)
    const sendAuthRequest = () => {
        if(inputFormRef.current && passwdFormRef.current) {
            const data = {login: inputFormRef.current.value, password: passwdFormRef.current.value}
            console.log(data)
            //simulating response
            const response = "JDJDJD"
            setCookie("jwt", "7ee0d5a0-9c2b-40b2-b1bb-55c79a08b451")
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