import { NavLink } from 'react-router-dom';
import logo from '../../assets/Logo.jpg'; 
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
        <li>
          <NavLink to="/reportes" className={({isActive}) => (isActive ? 'active' : '')}>
          Reportes
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin" className={({isActive}) => (isActive ? 'active' : '')}>
          Administración CRUD
          </NavLink>
          </li>
      </ul>
    </nav>
  );
}