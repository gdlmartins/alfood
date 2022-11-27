import estilos from './NavBar.module.scss';
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (<nav className={estilos.Link}>
    <ul >
      <li style={{ marginLeft: "30%" }}>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/restaurantes">Restaurantes</Link>
      </li>
      <li style={{ marginLeft: "30% " }}>
        <Link to="admin/restaurants">Admin</Link>
      </li>
    </ul>
  </nav>)
}

export default NavBar