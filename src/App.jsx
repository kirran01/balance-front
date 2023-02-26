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
