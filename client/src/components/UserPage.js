import { Link } from "react-router-dom";

const UserPage = () => {
  return (
    <div className='user-page-nav'>
      <ul>
        <li>
          <Link to='/products'>Products</Link>
        </li>
        <li>
          <Link to='/orders'>Orders</Link>
        </li>
        <li>
          <Link to='/cancellations'>Cancellations</Link>
        </li>
      </ul>
    </div>
  );
};

export default UserPage;
