import "../css/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className='nav-container'>
        <ul>
          <li>
            <Link to='/'>User Page</Link>
          </li>
          <li>
            <Link to='/admin'>Admin Page</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
