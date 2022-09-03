import "../css/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className='nav-container'>
        <ul>
          <li>
            <Link to='/products'>Products</Link>
          </li>
          <li>
            <Link to='/recipts/actives'>Active Orders</Link>
          </li>
          <li>
            <Link to='/recipts/history'>Orders History</Link>
          </li>
          <li>
            <Link to='/inventory'>Inventory</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
