import "../Assets/css/Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  function topOfThePage() {
    window.scrollTo(0, 0);
  }

  return (
    <footer>
      <ul className="footer-nav">
        <div>
          <li className="logo">
            <Link to="/">
              {" "}
              <img src="/LogoMyphoto.svg"></img>
            </Link>
          </li>
        </div>

        <li>
          {" "}
          <Link to="/mention">CGU / Mention légales</Link>
        </li>
        <li>Nos produits</li>
        <li>Tout droit réservé</li>
        <li>
          <span
            class="material-symbols-outlined row-to-up"
            onClick={topOfThePage}
          >
            straight
          </span>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
