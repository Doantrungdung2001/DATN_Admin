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
import ManageFarms from './pages/ManageFarms'
import ManageDistributerPage from './pages/ManageDistributers'
import ManageClient from './pages/ManageClient'
import ManageUnusualTransaction from './pages/ManageUnusualTransaction'
import ManageFarmTransaction from './pages/ManageFarmTransaction'

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
          <Route element={<Auth path={'/login'}>{<ManageDistributerPage />}</Auth>} path="manage-distributers" />
          <Route element={<Auth path={'/login'}>{<ManageClient />}</Auth>} path="manage-client" />
          <Route element={<Auth path={'/login'}>{<ManagePlant />}</Auth>} path="manage-plant" />
          <Route element={<Auth path={'/login'}>{<ManageFarmTransaction />}</Auth>} path="manage-farm-transaction" />
          <Route element={<Auth path={'/login'}>{<PlantDetail />}</Auth>} path="plant/:id" />
          <Route
            element={<Auth path={'/login'}>{<ManageUnusualTransaction />}</Auth>}
            path="manage-unusual-transaction"
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
