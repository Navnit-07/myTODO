import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
        <Navbar/>
        <Header/>
    </div>
  )
}

export default Home