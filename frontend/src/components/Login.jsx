import React, { useContext } from "react";
import axios from 'axios';
import BASE_URL from '../config.js';
import { ReducerContext } from "../reducers/reducer.jsx";
import { LOGIN, ADMIN } from '../config/constants.js';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState("");
    const [mdp, setMdp] = React.useState("");
    const [, dispatch] = useContext(ReducerContext)
    const [showMdp, setShowMdp] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const submit = (e) => {

        const dataUser = {
            email,
            mdp
        }

        e.preventDefault()
        if (email === "" || mdp === "") {
            setErrorMessage("Merci de compléter correctement le formulaire.")
        } else {
            if (email.length > 255) {
                setErrorMessage("Merci de compléter correctement le formulaire.")
            } else {

                axios.post(`${BASE_URL}/Login`, dataUser)
                    .then((res) => {
                        if (res.data.response) {
                            localStorage.setItem('jwtToken', res.data.token)
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
                            res.data.user_id && dispatch({ type: LOGIN, payload: res.data.user_id })
                            res.data.admin && dispatch({ type: ADMIN })
                            navigate("/")
                        } else {
                            setErrorMessage("Identifiant ou mot de passe incorrect.")
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }

    const handleShowMdp = () => {
        setShowMdp(!showMdp);
    };

    return (
        <React.Fragment>

            <div className="login-container">
            <h1>Connection</h1>
                <form className="login-form" onSubmit={submit}>
                    <label>Email :
                    <div>
                        <input className="email" type="email" name="email" placeholder="@EMAIL :" maxLength="255" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    </label>
                    <label>Mot de passe :
                    <div className="container-password">
                        <input className="mdp" type={showMdp ? "text" : "password"} name="mdp" placeholder="MOT DE PASSE :" maxLength="255" value={mdp} onChange={(e) => setMdp(e.target.value)} required />
                        <div onClick={handleShowMdp} className="button_look"> <span>{showMdp ? "Masquer" : "Afficher"}</span></div>
                    </div>
                    </label>
                    <div>
                        <input className='btn' type="submit" value="Valider" />
                    </div>
                    <h3>{errorMessage}</h3>
                </form>
            </div>
        </React.Fragment>
    );
};

export default Login;
