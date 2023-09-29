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
        <svg onClick={topOfThePage} id="Calque_2" data-name="Calque 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.99 50.99">
          <g id="Calque_1-2" data-name="Calque 1">
            <g>
              <circle class="cls-1" cx="25.5" cy="25.5" r="25.5"/>
              <path class="cls-2" d="m29.54,25.46c0,.71-.03,1.41-.03,2.12,0,4.48,0,8.95,0,13.43,0,.24-.03.49-.08.73-.14.63-.51.94-1.14.95-1.86,0-3.71,0-5.57,0-.84,0-1.19-.38-1.19-1.22,0-5.13,0-10.25,0-15.38,0-.21,0-.42,0-.72-.23,0-.43,0-.63,0-2.28,0-4.55.01-6.83-.01-.31,0-.82-.11-.9-.3-.19-.49-.61-.95-.07-1.61,1.76-2.15,3.43-4.39,5.14-6.59,1.48-1.9,2.96-3.8,4.44-5.7.65-.83,1.29-1.65,1.98-2.45.46-.54,1.24-.5,1.69.07,1.69,2.14,3.37,4.3,5.05,6.44,1.54,1.97,3.09,3.94,4.63,5.91.67.86,1.38,1.69,1.98,2.6.18.26.16.83,0,1.1-.18.28-.66.52-1.01.53-2.22.05-4.44.02-6.66.02-.23,0-.46.01-.69.02-.04.03-.08.06-.11.09Z"/>
            </g>
          </g>
        </svg>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
