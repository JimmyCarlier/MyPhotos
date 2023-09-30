import { useState } from "react";
import Cookies from "js-cookie";
import { SecurityCheckSession } from "../Components/SecurityCheckSession";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../Assets/css/Pages/signIn.css";
import Swal from "sweetalert2";

const SignIn = () => {
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [mail, setMail] = useState();
  const handleSubmitSignIn = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const user = {
      email,
      password,
    };
    const response = await fetch("http://localhost:3000/user/signin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    //check status
    if (response.status === 200) {
      const myLogin = await response.json();
      //Split token to localStorage and js cookies
      let tokenLength = myLogin.length;
      //slice firsthalf of token
      let tokenLocalStorage = myLogin.slice(0, tokenLength / 2);
      //slice otherhalf of token
      let tokenCookies = myLogin.slice(tokenLength / 2, tokenLength);
      //set token to localStorage
      localStorage.setItem("session", tokenLocalStorage);
      //set token to js cookies
      Cookies.set("session", tokenCookies);
      //redirect to designed page
      const userData = SecurityCheckSession();
      if (userData.role === 1) {
        navigate("/admin");
      }
      if (userData.role === 2) {
        navigate("/membre");
      }
    }
    if (response.status === 401 || response.status === 400) {
      setError(`Les identifiants sont incorrect, veuillez réessayer`);
    } else {
      setError(`Erreur, veuillez réessayer`);
    }
  };
  const handleNavigateHomePage = () => {
    navigate("/");
  };

  const handleSeeUnseePassword = (e) => {
    setShowPassword(!showPassword);
    const passwordInput = document.querySelector("#passwordInput");
    if (showPassword === true) {
      passwordInput.setAttribute("type", "text");
    } else {
      passwordInput.setAttribute("type", "password");
    }
  };

  const showForm = () => {
    setMail(!mail);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const email = e.target.mail.value;
    const fetchI = await fetch(`http://localhost:3000/user/password-reset`, {
      method: "POST",
      body: JSON.stringify({
        emailId: email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <>
      <svg
        onClick={handleNavigateHomePage}
        className="leavePageBtn"
        xmlns="http://www.w3.org/2000/svg"
        height="70"
        viewBox="0 -960 960 960"
        width="70"
      >
        <path d="m480-320 56-56-64-64h168v-80H472l64-64-56-56-160 160 160 160Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
      </svg>
      <section className="containerConnexion">
        <div className="containerHeaderConnexion">
          <img src="/connexion.png" alt="connexion icon" />
          <h1>Connexion</h1>
        </div>
        {error && <p className="errorMessage">{error}</p>}
        <div className="containerBodyConnexion">
          <form onSubmit={handleSubmitSignIn}>
            <div className="signInFormEmail">
              <label>Email :</label>
              <input type="text" placeholder="Email" />
            </div>
            <div className="signInFormPassword">
              <label>Mot de passe :</label>
              <input
                id="passwordInput"
                type="password"
                placeholder="Password"
              />
              <svg
                className="eyeShowPassword"
                onClick={handleSeeUnseePassword}
                height="30px"
                id="Calque_2"
                data-name="Calque 2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 4.56 4.63"
              >
                <g id="Calque_1-2" data-name="Calque 1">
                  <g>
                    <path
                      fill="#1d1d1b"
                      class="cls-1"
                      d="m4.56,2.32c0,1.29-1.02,2.31-2.28,2.31-1.28,0-2.21-1.02-2.28-2.16C-.08,1.03,1.07-.01,2.29,0c1.24.01,2.27,1.03,2.27,2.32Zm-4.21,0c0,1.11.88,2.02,2,2,1.06-.02,1.96-.88,1.93-2.06-.02-1.03-.87-1.99-2.07-1.93-.98.04-1.87.86-1.87,2Z"
                    />
                    <path
                      fill="#1d1d1b"
                      class="cls-1"
                      d="m3.84,2.19c-.02-.3-.13-.59-.32-.83,0,.02,0,.04,0,.06,0,.28-.23.5-.5.5s-.5-.23-.5-.5.21-.49.48-.5c-.21-.11-.45-.17-.72-.18-.85,0-1.59.71-1.56,1.57-.02.87.71,1.56,1.55,1.57.84,0,1.64-.7,1.57-1.69Z"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div className="signInFormConfirmPassword"></div>
            <div className="signInFormParaLink">
              <p>
                Pas encore inscrit ? <Link to="/inscription">inscrivez-vous !</Link>
              </p>
              <div className="containerBTN">
                <button type="submit">Se connecter</button>
              </div>
              <boutton onClick={showForm}>Mot de passe oublié ?</boutton>
            </div>
          </form>
          {mail && (
            <form onSubmit={handleResetPassword}>
              <label htmlFor="mail">Entrez votre adresse e-mail</label>
              <input type="mail" id="mail" className="mail" />
              <input type="submit" value="envoyer" />
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default SignIn;
