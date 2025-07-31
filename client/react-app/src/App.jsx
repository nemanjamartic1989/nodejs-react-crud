import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Books from './pages/Books'
import Edit from './pages/Edit'
import Add from './pages/Add'
import "./style.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/edit/:id" element={<Edit/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
