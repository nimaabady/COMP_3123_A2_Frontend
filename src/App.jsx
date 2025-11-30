import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/Navbar'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import EmployeeDashboard from './pages/EmployeeDashboard'
import EmployeeView from './pages/EmployeeView';
import EmployeeEdit from './pages/EmployeeEdit';
import EmployeeAdd from './pages/EmployeeAdd';
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <NavBar />
      <br />
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <EmployeeDashboard />
          </ProtectedRoute>
        } />
        <Route path="/employee/:id" element={
          <ProtectedRoute>
            <EmployeeView />
          </ProtectedRoute>
        } />
        <Route path="/employee/edit/:id" element={
          <ProtectedRoute>
            <EmployeeEdit />
          </ProtectedRoute>
        } />
        <Route path="/employee/add" element={
          <ProtectedRoute>
            <EmployeeAdd />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App
