import './App.css'
import { StickyFooter } from './components/dashboard/StickyFooter';
import { AppRoutes } from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <AppRoutes />
      <StickyFooter />
    </BrowserRouter>
  )
}

export default App
