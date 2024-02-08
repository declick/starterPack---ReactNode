import React, { useState } from "react";
import axios from "axios";
import BASE_URL from '../config.js';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";


const SignUp = () => {

    const navigate = useNavigate();
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [mdp, setMdp] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showMdp, setShowMdp] = useState(false);

    const [validate, setValidate] = useState({
        hasLow: false,
        hasCap: false,
        hasNumber: false,
        has8digit: false
    });

    const validRegex = /^[a-zA-Z0-9]+([.a-zA-Z0-9]+)?@[a-z]{3,9}\.[a-z]{2,5}$/;

    const strength = Object.values(validate).reduce((a, item) => a + item, 0);
    const feedback = {
        1: "Le mot de passe est trop faible!",
        2: "C'est encore faible !",
        3: "Vous y êtes presque!",
        4: "Bravo! Maintenant votre mot de passe est solide!"
    }[strength];

    const handleChangePassword = (e) => {
        setMdp(e.target.value);
        validatePassword(e.target.value);
    };

    const validatePassword = (mdp) => {
        setValidate((o) => ({
            hasNumber: /\d/.test(mdp),
            hasCap: /[A-Z]/.test(mdp),
            hasLow: /[a-z]/.test(mdp),
            has8digit: mdp.length >= 8
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            prenom,
            nom,
            email,
            mdp
        };

        try {
            if (!validRegex.test(email)) {
                setErrorMessage("Adresse e-mail invalide.");
                return;
            }

            const response = await axios.post(`${BASE_URL}/SignUp`, data);

            if (response.data.response === true) {
                navigate("/Login");
            } else {
                setErrorMessage(response.data.message || "Erreur lors de l'inscription.");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Une erreur est survenue lors de l'inscription.");
        }
    };

    const handleShowMdp = () => {
        setShowMdp(!showMdp);
    };

    const passwordRequirements = [
        { label: "8 caractères", fulfilled: validate.has8digit },
        { label: "1 majuscule", fulfilled: validate.hasCap },
        { label: "1 chiffre", fulfilled: validate.hasNumber },
    ];

    return (
        <React.Fragment>
            <div className="signup-container">
                <h1>Inscription</h1>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <label>Prenom :
                        <div>
                            <input type="text" placeholder="PRENOM :" name="prenom" maxLength="255" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
                        </div>
                    </label>

                    <label>Nom :
                        <div>
                            <input type="text" placeholder="NOM :" name="nom" maxLength="255" value={nom} onChange={(e) => setNom(e.target.value)} required />
                        </div>
                    </label>

                    <label>Email :
                        <div>
                            <input type="email" placeholder="@EMAIL :" name="email" maxLength="255" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                    </label>
                    <div className="password-requirements">
                        {passwordRequirements.map((requirement, index) => (
                            <label key={index} className={`password-requirement ${requirement.fulfilled ? 'fulfilled' : ''}`}>
                                <p>{requirement.label}</p>
                            </label>
                        ))}
                    </div>
                    <label>Mot de passe :
                        <div className="container_password">
                            <input type={showMdp ? "text" : "password"} placeholder="MOT DE PASSE :" name="mdp" className="input_password" value={mdp} onChange={handleChangePassword} required />
                            <div onClick={handleShowMdp} className="button_look"> <span>{showMdp ? "Masquer" : "Afficher"}</span></div>
                        </div>
                    </label>
                    {validate.has8digit && (
                        <div className={`feedback strength_${strength}`} hidden={mdp.length === 0}> {feedback} </div>
                    )}
                    <div>
                        <input className='btn' type="submit" value="Envoyer" />
                    </div>

                    <label>
                        Déjà membre ?  <NavLink to='/Login'><u>Connectez-vous ici.</u></NavLink>
                    </label>

                    <h3>{errorMessage}</h3>
                </form>
            </div>

        </React.Fragment>
    );
}

export default SignUp; 
