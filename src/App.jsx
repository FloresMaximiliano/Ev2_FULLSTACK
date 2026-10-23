import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import LotesAdmin from './components/LotesAdmin';

// Páginas
import Inicio from './pages/inicio/Inicio';
import Tecnico from './pages/tecnico/Tecnico';
import Supervisor from './pages/supervisor/Supervisor';
import Ayuda from './pages/ayuda/Ayuda';
import Reportes from './pages/reportes/Reportes';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/tecnico" element={<Tecnico />} />
        <Route path="/supervisor" element={<Supervisor />} />
        <Route path="/ayuda" element={<Ayuda />} />
        <Route path="/reportes" element={<Reportes />} />
        <Route path="/admin" element={<LotesAdmin />} />
      </Routes>
      <Footer />
    </Router>
  );
}