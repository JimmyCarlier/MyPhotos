const SignUp = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

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

    const responseSignUp = await fetch(
      `http://localhost:3000/user/signup`,
      requestOptions
    );

    console.log(responseSignUp);
  };
  return (
    <section>
      <h1>SignUp</h1>
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
          <input type="password" id="password" name="password" required />
        </div>
        <div>
          <label htmlFor="">Validation du mot de passe : </label>
          <input
            type="password"
            id="verif_password"
            name="verif_password"
            required
          />
        </div>
        <div>
          <input type="submit" value="Je m'inscris" />
        </div>
      </form>
    </section>
  );
};

export default SignUp;
