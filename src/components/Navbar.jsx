import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <Link
        to="/dashboard"
        className="navbar-logo"
      >
        Registration Portal
      </Link>

      <div className="navbar-links">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;