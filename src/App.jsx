import { useState, useEffect, useContext } from 'react'
import { AuthContext } from './context/auth.context';
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/nav';
import Home from './pages/home';
import Login from './pages/login';
import './App.css'
import Employees from './pages/employees';
import Oneemployee from './pages/oneemployee';

function App() {
//   useEffect(() => {
//     const getEmployees = async () => {
//         try {
//             const res = await axios.get(`http://localhost:3000/employee/get-employees`, {
//                 headers: {
//                     authorization: `Bearer ${localStorage.getItem('authToken')}`
//                 }
//             })
//             if (res) {
//                 const gotEmployees = res.data
//                 setEmployees(gotEmployees)
//             }
//         } catch (err) {
//             console.log(err)
//         }
//     }
//     getEmployees()
// }, [])
const [employees, setEmployees] = useState([])

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/employees' element={<Employees />} />
        <Route path='/employee/:id' element={<Oneemployee />} />
      </Routes>
    </div>
  )
}

export default App
