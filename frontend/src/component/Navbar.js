import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../AuthContext";

function NavBar() {

  const authManager = useContext(AuthContext);

  const handleLogout = () => {
    authManager.logout();
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <span className="navbar-brand" >T-Swift</span>
      <div className="navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item" >
            <Link className="nav-link" to="/gossips">Gossip</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/songs">T-Swift Songs</Link>
          </li>
          {authManager.user ? (
            <li className="nav-item">
              <button className="btn btn-secondary" type="button" onClick={handleLogout}>Logout</button>
            </li>
          )

            : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            )}


        </ul>
      </div>
      {authManager.user ? <span className="text-light navbar-text">Hello, {authManager.user}</span> : null}
    </nav>
  );
}

export default NavBar;