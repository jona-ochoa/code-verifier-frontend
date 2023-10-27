import './App.css'
import Dashboard from './components/dashboard/Dashboard';
import { StickyFooter } from './components/dashboard/StickyFooter';
import { AppRoutes } from './routes/AppRoutes';
import { BrowserRouter, Link } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    <Dashboard />
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/katas">Katas</Link></li>
        </ul>
      </nav>
      <AppRoutes />
      <StickyFooter />
    </BrowserRouter>
  )
}

export default App
