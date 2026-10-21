import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes (tomando en cuenta las subcarpetas navbar y footer)
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

// Páginas
import Inicio from './pages/inicio/Inicio';
import Tecnico from './pages/tecnico/Tecnico';
import Supervisor from './pages/supervisor/Supervisor';
import Ayuda from './pages/ayuda/Ayuda';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/tecnico" element={<Tecnico />} />
        <Route path="/supervisor" element={<Supervisor />} />
        <Route path="/ayuda" element={<Ayuda />} />
      </Routes>
      <Footer />
    </Router>
  );
}