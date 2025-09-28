import React, { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoApp from './pages/TodoApp'

const App = () => {
  return (
    <div className=''>
      <ToastContainer/>
      <Routes>
        <Route path= '/' element={<Home/>}/>
        <Route path= '/login' element={<Login/>}/>
        <Route path= '/email-verify' element={<EmailVerify/>}/>
        <Route path= '/reset-password' element={<ResetPassword/>}/>
        <Route path= '/todo' element={<TodoApp/>}/>
      </Routes>
    </div>
  )
}

export default App