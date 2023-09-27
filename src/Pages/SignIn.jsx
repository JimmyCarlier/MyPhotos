import { useState } from "react";
import Cookies from "js-cookie";
import { SecurityCheckSession } from "../Components/SecurityCheckSession";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Header from "../Components/Header";

const SignIn = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmitSignIn = async(e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const user = {
            email,
            password
        }
        const response = await fetch('http://localhost:3000/user/signin',
        {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
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
            localStorage.setItem('session', tokenLocalStorage);
            //set token to js cookies
            Cookies.set("session", tokenCookies)
            //redirect to designed page
            const userData = SecurityCheckSession();
            if (userData.role === 1) {
                navigate("/admin")
            }
            if (userData.role === 2) {
                navigate("/membre")
            }
        }
        if(response.status === 401 || response.status === 400) {
            setError(`Les identifiants sont incorrect, veuillez réessayer`)
        } else {
            setError(`Erreur, veuillez réessayer`)
        }
    }

    const handleSeeUnseePassword = (e) => {
        const passwordInput = document.querySelector('#passwordInput');
        if (e.target.checked) {
            passwordInput.setAttribute('type', 'text');
        } else {
            passwordInput.setAttribute('type', 'password');
        }
    }
    return (
        <>
            <Header />
            <section>
                <h1>SignIn</h1>
                {error && <p>{error}</p>}
                <form onSubmit={handleSubmitSignIn}>
                    <div className="signInFormEmail">
                        <label>Email :</label>
                        <input type="text" placeholder="Email" />
                    </div>
                    <div className="signInFormPassword">
                        <label>Mot de passe :</label>
                        <input id="passwordInput" type="password" placeholder="Password" />
                    </div>
                    <div className="signInFormConfirmPassword">
                        <label>Afficher mot de passe</label>
                        <input type="checkbox" onChange={handleSeeUnseePassword}/>
                    </div>
                    <div className="signInFormParaLink">
                        <p>Mot de passe oublié ?<Link>cliquez ici</Link></p>
                        <p>Pas encore inscrit ?<Link>inscrivez-vous !</Link></p>
                    </div>
                    <div>
                        <button type="submit">Sign In</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default SignIn;