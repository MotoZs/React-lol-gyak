import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css';
import AllChamps from './pages/AllChamps.tsx'
import OneChamp from './pages/OneChamp.tsx'
import NewChamp from './pages/NewChamp.tsx'
import EditChamps from './pages/EditChamp.tsx'
import Login from './pages/Login.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllChamps />}/>
        <Route path="/onechamp/:id" element={<OneChamp />}/>
        <Route path="/newchamp" element={<NewChamp />}/>
        <Route path="/editchamp/:id" element={<EditChamps />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="*" element={<h1>404, Az oldal nem található!</h1>}/>
      </Routes>
    </BrowserRouter>
    <ToastContainer theme='colored'/>
  </StrictMode>,
)
