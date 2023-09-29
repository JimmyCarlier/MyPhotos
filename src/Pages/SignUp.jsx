import { useState } from "react";
import { useNavigate } from "react-router";
import "../Assets/css/Pages/signUp.css"

const SignUp = () => {
  const [message, setMessage] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}$/;

    const userInfo = {
      email: e.target.email.value,
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      password: e.target.password.value,
      verifPassword: e.target.verif_password.value,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    };
    if (regexPassword.test(userInfo.password) === true) {
      if (userInfo.password === userInfo.verifPassword) {
        const responseSignUp = await fetch(
          `http://localhost:3000/user/signup`,
          requestOptions
        );
        navigate("/");
      } else {
        setMessage("Veuillez renseigner le même mot de passe");
      }
    } else {
      setMessage("Vous ne remplicez pas les caractères demandés");
    }
  };

  const confirmCondition = () => {
    setMessage();
  };

  const showPassword = (e) => {
    let password;
    parseInt(e.target.value) === 1
      ? (password = document.querySelector(".password"))
      : (password = document.querySelector(".verif_password"));
    if (e.target.checked) {
      password.setAttribute("type", "text");
    } else {
      password.setAttribute("type", "password");
    }
  };
  const handleNavigateHomePage = () => {
    navigate("/");
  };
  return (
    <>
      <svg onClick={handleNavigateHomePage} className="leavePageBtn" xmlns="http://www.w3.org/2000/svg" height="70" viewBox="0 -960 960 960" width="70"><path d="m480-320 56-56-64-64h168v-80H472l64-64-56-56-160 160 160 160Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
      <section className="containerInscription">
        <h1>Inscription :</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Email :</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="">Prénom : </label>
            <input type="text" id="firstname" name="firstname" required />
          </div>
          <div>
            <label htmlFor="">Nom : </label>
            <input type="text" id="lastname" name="lastname" required />
          </div>
          <div>
            <label htmlFor="">Mot de passe : </label>
            <input
              type="password"
              id="password"
              name="password"
              className="password"
              required
            />
            <input type="checkbox" onClick={showPassword} value="1" />
            <label htmlFor="">Voir le mot de passe</label>
          </div>
          <p>
            Le mot de passe doit contenir : 1 majuscule, 1 minuscule, 1
            chiffres, 1 carctères spécial et doit faire 8 carctères
          </p>
          <div>
            <label htmlFor="">Validation du mot de passe : </label>
            <input
              type="password"
              id="verif_password"
              name="verif_password"
              className="verif_password"
              required
            />
            <input type="checkbox" onClick={showPassword} />
            <label htmlFor="">Voir le mot de passe</label>
          </div>
          <div>
            <input type="submit" value="Je m'inscris" />
          </div>
        </form>
        <div>
          <input type="checkbox" />
          <label htmlFor="">J'accepte les conditions d'utilisation</label>
        </div>
        {message && (
          <p>
            {message} <button onClick={confirmCondition}>Ok</button>
          </p>
        )}
      </section>
    </>
  );
};

export default SignUp;
