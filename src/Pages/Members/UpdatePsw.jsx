import Swal from "sweetalert2";
import "../../Assets/css/Pages/signIn.css";

const UpdatePsw = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const user = urlParams.get("user");

  const fetchUpdatePassword = async (e) => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    console.log(newPassword, confirmPassword);
    const response = await fetch(`http://localhost:3000/user/updatepsw`, {
      method: "PUT",
      body: JSON.stringify({
        email: user,
        password: newPassword,
        confirmPassword: confirmPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Mot de passe changé !",
        text: "Retour à la connexion ;)",
      });
      setTimeout(() => {
        window.location = "/connexion";
      }, 3000);
    }
  };

  return (
    <section className="containerConnexion">
      <div className="containerHeaderConnection container-psw">
        <img src="/connexion.png" alt="connexion icon" className="user-psw" />
        <h1>Changement de mot de passe</h1>
      </div>
      <div className="containerBodyConnexion">
        <form onSubmit={fetchUpdatePassword}>
          <div className="signInFormEmail">
            <label htmlFor="">Nouveau mot de passe</label>
            <input type="password" id="newPassword" />
          </div>
          <div className="signInFormPassword">
            <label htmlFor="">Confirmer le mot de passe</label>
            <input type="password" id="confirmPassword" />
          </div>
          <div className="containerBTN">
            <button type="submit">Valider</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdatePsw;
