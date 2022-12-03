import React from 'react'
import { Header } from "./components/Header"
import './App.css'
import { Aside } from './components/Aside'
import { CompletedTasks } from './components/CompletedTasks'

const App:React.FC = () =>  {
   return (
    <div className="App">
      <Header />
      
      <main className="container-fluid columns-bottom d-inline-flex">
        <div className="row main-container">
          <Aside />

          <div className="col-6 m-col">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac eros a purus condimentum elementum ut eget nunc. Suspendisse blandit dui vel est rhoncus, a vestibulum ex porta. Cras congue elit ultricies metus imperdiet convallis. Curabitur massa ligula, pellentesque vitae rhoncus at, auctor et est. Duis et pharetra ex. Phasellus interdum mauris ac turpis consequat, sed rhoncus massa faucibus. In hac habitasse platea dictumst. Phasellus sit amet augue magna.
          </div>

          <CompletedTasks />

        </div>
      </main>

    </div>
  )
}

export default App
