import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar.jsx'
import Manager from './components/Manager.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div className="[background:radial-gradient(120%_120%_at_40%_20%,#001_30%,#53e_90%)]"><Manager /></div>
      <Footer />
    </>
  )
}

export default App
