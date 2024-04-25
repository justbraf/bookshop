import { useState } from 'react'
import ShowAll from './components/ShowAll'
import AddBook from './components/AddBook'

function App() {

  return (
    <div className='m-5'>
      <h1 className='text-amber-500 text-6xl text-center hover:text-green-700 duration-700 ease-in-out'>Welcome to the Book Shop</h1>
      <AddBook />
      <ShowAll />
    </div>
  )
}

export default App
