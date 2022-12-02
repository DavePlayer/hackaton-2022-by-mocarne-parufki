import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from './Calendar/AuthProvider'
import LogoutBtn from './Components/Logout'
import Calendar from "./Pages/Calendar"


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <>
                <Calendar />
                <LogoutBtn />
              </>
            } />

          </Routes>
        </BrowserRouter>
        
        <></>
      </AuthProvider>
    </div>
  )
}

export default App
