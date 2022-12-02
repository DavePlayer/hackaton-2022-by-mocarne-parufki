import LoginPage from "../Pages/Login"
import create from "zustand"

interface AuthProviderInterface {
    children: JSX.Element
}

const useJWTStore = create((set) => ({
  jwt: "",
  setJWT: () => set((state: any) => ({ jwt: state })),
  removeJWT: () => set(() => ({ jwt: ""}))
}))

const AuthProvider: React.FC<AuthProviderInterface> = ({children}: {children: JSX.Element}) => {
    
    const auth = false;
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