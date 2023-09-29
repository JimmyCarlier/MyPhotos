import { Link } from "react-router-dom";
import "../Assets/css/NavBar.css";
const Header = () => {
  return (
    <header>
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
              <Link className="connexionIcon" to="/connexion"><img src="/connexion.png" alt="connexion icon" /></Link>
            </li>
          </div>
        </menu>
      </nav>
    </header>
  );
};

export default Header;
