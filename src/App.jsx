import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ProtectedRoutes from './routes/ProtectedRoutes'

function App() {
  const auth = useSelector((state) => state.auth)

  return (
    <Routes>
      <Route path="/*" element={<ProtectedRoutes />} />
      <Route path="/login" element={auth?.access ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={auth?.access ? <Navigate to="/" /> : <Register />} />
    </Routes>
  )
}

export default App
