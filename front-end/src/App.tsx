import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from './Calendar/AuthProvider'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <AuthProvider>
        <div>cos</div>
      </AuthProvider>
    </div>
  )
}

export default App
