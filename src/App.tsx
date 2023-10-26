import './App.css'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Homepage from '../src/pages/Homepage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import KatasPage from './pages/KatasPage';
import KatasDetailPage from './pages/KatasDetailPage';
import KataCreation from './pages/KataCreation';

function App() {

  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/katas">Katas</Link></li>
          <li><Link to="/create/kata">Create Kata</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/katas" element={<KatasPage />} />
        <Route path="/katas/:id" element={<KatasDetailPage />} />
        <Route path="/create/kata" element={<KataCreation />} />

        <Route 
          path="*" 
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
