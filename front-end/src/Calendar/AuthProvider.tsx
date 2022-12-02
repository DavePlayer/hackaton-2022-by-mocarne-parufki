import LoginPage from "../Pages/Login"

interface AuthProviderInterface {
    children: JSX.Element
}

const AuthProvider: React.FC<AuthProviderInterface> = ({children}: {children: JSX.Element}) => {
    const auth = true;
    if (!auth) {
        return (
            <LoginPage />
        )
    }
    return (
        <>
            {children}
        </>
    )
}


export default AuthProvider