import { useState, useEffect, useContext } from 'react'
import { AuthContext } from './context/auth.context';
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/nav';
import Foot from './components/foot';
import Login from './pages/login';
import './App.css'
import Employees from './pages/employees';
import Oneemployee from './pages/oneemployee';

function App() {
  const [employees, setEmployees] = useState([])
  const [searchEmlpoyees, setSearchEmployees] = useState([])
  const updateSearch = (updatedSearches) => {
    setSearchEmployees(updatedSearches)
  }
  const getEmployees = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/employee/get-employees`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      })
      if (res) {
        const gotEmployees = res.data
        setEmployees(gotEmployees)
        setSearchEmployees(gotEmployees)
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getEmployees()
  }, [])
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Employees getEmployees={getEmployees} employees={employees} searchEmployees={searchEmlpoyees} setSearchEmployees={setSearchEmployees} setEmployees={setEmployees} updateSearch={updateSearch} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/employee/:id' element={<Oneemployee />} />
      </Routes>
    </div>
  )
}

export default App
