import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from './Calendar/AuthProvider'
import LogoutBtn from './Components/Logout'
import Calendar from "./Pages/Calendar"
import Backdrop from "./Components/Backdrop"
import {useState} from "react"

const App:React.FC = () =>  {  
  const [isBackdropActive, setBackdropActive] = useState(false)
   return (
    <div className="App">
      {isBackdropActive && <Backdrop cancel={() => setBackdropActive(false)} />}
      <AuthProvider>
        <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <>
                <Calendar isBackdropActive={isBackdropActive} activateBackdrop={() => setBackdropActive(true)}/>
                <LogoutBtn />
              </>
            } />

          </Routes>
        </BrowserRouter>
        </>
      </AuthProvider>
    </div>
  )
}

export default App
