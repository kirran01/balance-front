import { useState, useEffect, useContext } from 'react'
import { AuthContext } from './context/auth.context';
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/nav';
import Home from './pages/home';
import Login from './pages/login';
import './App.css'

function App() {

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
