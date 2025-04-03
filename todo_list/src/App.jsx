import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Login';
import Todo from './Todo';
import { BrowserRouter, Routes,Route } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login ></Login>}/>
          <Route path='/Todo' element={<Todo></Todo>}/>
        </Routes>
      </BrowserRouter>
  )  
}

export default App
