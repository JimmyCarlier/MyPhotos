import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
        <nav>
            <menu>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/connexion">Se connecter</Link></li>
                <li><Link to="/inscription">S'inscrire</Link></li>
            </menu>
        </nav>
    </header>
  );
};

export default Header;