import { Link } from "react-router-dom";
import "../Assets/css/NavBar.css";
import { SecurityCheckSession } from "../Components/SecurityCheckSession";
import { useEffect, useState } from "react";
import { handleDisconnect } from "../Components/HandleDisconnect";
const Header = () => {
  const [user, setUser] = useState();
  function findUser() {
    const user = SecurityCheckSession();
    setUser(user);
  }

  useEffect(() => {
    findUser();
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
            <div className="boutton-nav">
              <li>Page de {user.user}</li>

              <li>
                <div className="connexionIcon">
                  <img src="/connexion.png" alt="connexion icon" />
                </div>
              </li>
              <li>
                <button onClick={handleDisconnect}>Disconnect</button>
              </li>
            </div>
          </menu>
        </nav>
      )}
    </header>
  );
};

export default Header;
