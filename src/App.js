import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import React from 'react'
import MainLayout from './components/layout/MainLayout'
import AppLayout from './components/layout/AppLayout'
import LoginPage from './pages/LoginPage'
import Auth from './hooks/auth'
import ManagePlant from './pages/ManagePlant'
import PlantDetail from './pages/PlantDetail'
import ManageFarms from './pages/ManageFarms'
import ManageClient from './pages/ManageClient'
import Notfound from './pages/Notfound'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/manage-farms" />} />
          <Route element={<LoginPage />} path="/login" />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route element={<Auth path={'/login'}>{<ManageFarms />}</Auth>} path="manage-farms" />
          <Route element={<Auth path={'/login'}>{<ManageClient />}</Auth>} path="manage-client" />
          <Route element={<Auth path={'/login'}>{<ManagePlant />}</Auth>} path="manage-plant" />
          {/* <Route element={<Auth path={'/login'}>{<ManageTransferPage />}</Auth>} path="manage-farm-transfer" /> */}
          <Route element={<Auth path={'/login'}>{<PlantDetail />}</Auth>} path="plant/:id" />
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  )
}

export default App
