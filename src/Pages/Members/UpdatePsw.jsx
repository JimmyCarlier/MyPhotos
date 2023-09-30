import Swal from "sweetalert2";

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
    <section>
      <form onSubmit={fetchUpdatePassword}>
        <label htmlFor="">Nouveau mot de passe</label>
        <input type="password" id="newPassword" />
        <label htmlFor="">Confirmer le mot de passe</label>
        <input type="password" id="confirmPassword" />
        <input type="submit" value="envoyer" />
      </form>
    </section>
  );
};

export default UpdatePsw;
