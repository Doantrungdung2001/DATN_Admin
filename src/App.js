import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import React from 'react'
import MainLayout from './components/layout/MainLayout'
import AppLayout from './components/layout/AppLayout'
import LoginPage from './pages/LoginPage'
import Auth from './hooks/auth'
import Home from './pages/Home'
import ManagePlant from './pages/ManagePlant'
import PlantDetail from './pages/PlantDetail'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/home" />} />
          <Route element={<LoginPage />} path="/login" />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Auth path={'/login'}>{<Home />}</Auth>} path="home" />
          <Route element={<Auth path={'/login'}>{<ManagePlant />}</Auth>} path="manage-plant" />
          <Route element={<Auth path={'/login'}>{<PlantDetail />}</Auth>} path="plant/:id" />
        </Route>
      </Routes>
    </div>
  )
}

export default App
