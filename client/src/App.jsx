import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import ShowAll from './components/ShowAll'
import AddBook from './components/AddBook'
import NavBar from './components/NavBar'
import NotFound from './components/NotFound'
import UpdateBook from './components/UpdateBook'

function App() {

  return (
    <div className='m-5'>
      <h1 className='text-amber-500 text-6xl text-center hover:text-green-700 duration-700 ease-in-out'>Welcome to the Book Shop</h1>
      <NavBar />
      <Routes>
        <Route path='/' element={<ShowAll />} />
        <Route path='/book'>
          <Route path='add' element={<AddBook />} />
          <Route path='update/:id' element={<UpdateBook />} />
        </Route>
      
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
