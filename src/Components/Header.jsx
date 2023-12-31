import { Link } from "react-router-dom";
import "../Assets/css/NavBar.css";
import { SecurityCheckSession } from "../Components/SecurityCheckSession";
import { useEffect, useState } from "react";
import { handleDisconnect } from "../Components/HandleDisconnect";
const Header = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    if (SecurityCheckSession() !== false) {
      setUser(SecurityCheckSession());
    }
  }, []);
  return (
    <header>
      {!user ? (
        <nav className="container">
          <menu className="container-nav">
            <div>
              <li className="logo">
                <Link to="/">
                  {" "}
                  <img src="/LogoMyphoto.svg"></img>
                </Link>
              </li>
            </div>
            <div className="boutton-nav">
              <li>Concours</li>
              <li>Voter</li>
              <li>
                <Link className="connexionIcon" to="/connexion">
                  <img src="/connexion.png" alt="connexion icon" />
                </Link>
              </li>
            </div>
          </menu>
        </nav>
      ) : (
        <nav className="container">
          <menu className="container-nav">
            <div>
              <li className="logo">
                <Link to="/">
                  {" "}
                  <img src="/LogoMyphoto.svg"></img>
                </Link>
              </li>
            </div>
            <li>
              Membre connecté : {user.firstname} {user.lastname}
            </li>
            <div className="boutton-nav">
              <li>
                {user && user.role === 1 && (
                  <Link to="/admin" className="connexionIcon">
                    {" "}
                    <img src="/connexion.png" alt="connexion icon" />
                  </Link>
                )}
                {user && user.role === 2 && (
                  <Link to="/membre" className="connexionIcon">
                    {" "}
                    <img src="/connexion.png" alt="connexion icon" />
                  </Link>
                )}
              </li>
              <li>
                <span
                  class="material-symbols-outlined leave"
                  onClick={handleDisconnect}
                >
                  logout
                </span>
              </li>
            </div>
          </menu>
        </nav>
      )}
    </header>
  );
};

export default Header;
