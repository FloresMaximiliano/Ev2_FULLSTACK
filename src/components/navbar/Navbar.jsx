import { NavLink } from 'react-router-dom';
import logo from '../../assets/Logo.jpg'; // Sube dos niveles hasta src/assets/
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar-container">
      <div className="icono">
        <img src={logo} alt="Logo TextilChile" className="logo-img" />
        <span>TextilChile</span>
      </div>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/tecnico" className={({ isActive }) => (isActive ? 'active' : '')}>
            Técnico
          </NavLink>
        </li>
        <li>
          <NavLink to="/supervisor" className={({ isActive }) => (isActive ? 'active' : '')}>
            Supervisor
          </NavLink>
        </li>
        <li>
          <NavLink to="/ayuda" className={({ isActive }) => (isActive ? 'active' : '')}>
            Ayuda
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}