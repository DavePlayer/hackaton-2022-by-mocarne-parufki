import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from './Calendar/AuthProvider'
import LogoutBtn from './Components/Logout'
import Calendar from "./Pages/Calendar"
import Backdrop from "./Components/Backdrop"
import {useState} from "react"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"



const App:React.FC = () =>  {  
  const [isBackdropActive, setBackdropActive] = useState(false)
  const client = new ApolloClient({
    uri: 'http://192.168.0.109:4000',
    cache: new InMemoryCache()
  })
   return (
    <div className="App">
      <ApolloProvider client={client} >
        <>
          {isBackdropActive && <Backdrop cancel={() => setBackdropActive(false)} />}
          <AuthProvider>
            <>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={
                  <>
                    <LogoutBtn />
                    <Calendar isBackdropActive={isBackdropActive} activateBackdrop={() => setBackdropActive(true)}/>
                  </>
                } 
                />

              </Routes>
            </BrowserRouter>
            </>
          </AuthProvider>
        </>
    </ApolloProvider>
    </div>
  )
}

export default App
