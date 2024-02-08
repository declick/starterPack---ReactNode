import React from "react";
import axios from 'axios';
import BASE_URL from '../config.js';
import { ReducerContext } from "../reducers/reducer.jsx";
import { useNavigate } from "react-router-dom";

const Profil = () => {

    const navigate = useNavigate()
    const [state,] = React.useContext(ReducerContext)
    const [profil, setProfil] = React.useState('')

    React.useEffect(() => {
        if (state.user_id) {
            axios.get(`${BASE_URL}/Profil/${state.user_id}`)

                .then((res) => {
                    const data = {
                        prenom: res.data.SQL.prenom,
                        nom: res.data.SQL.nom,
                        email: res.data.SQL.email

                    }
                    setProfil(data)

                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [state.user_id])


    const submitForm = (e) => {
        e.preventDefault()
        const dataFile = new FormData()

        dataFile.append('prenom', profil.prenom)
        dataFile.append('nom', profil.nom)
        dataFile.append('email', profil.email)
        dataFile.append('id', state.user_id)

        axios.post(`${BASE_URL}/Profil/${state.user_id}`, dataFile)

            .then((res) => {
                console.log(res)
                if (res.data.response === true) {
                    navigate("/Logout")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChange = (e, type) => {
        e.preventDefault()
        const data = { ...profil }
        const value = e.target.value
        data[type] = value
        setProfil(data)
    }


    const handleDelete = (e, id) => {
        e.preventDefault()

        axios.post(`${BASE_URL}/DeleteProfil/${state.user_id}`)

            .then((res) => {
                console.log(res)
                setProfil(res.data.DELETE)
                navigate("/Logout")

            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (

        <React.Fragment>
        <div className="container-profil">   
        <div className="text_contact">
            <p>PROFIL</p>
            <h1>Bienvenue sur ton dashboard {profil.prenom}</h1>
            <p>Ici tu peux personnaliser ton profil :</p>
                <p>nom, prénom, email.</p>
          </div>
            <div className="text_intro">
                <p>Ou supprimer ton compte.</p>
            </div>
            {profil &&
                <div className="center">
                    <form encType="multipart/form-data" onSubmit={submitForm} className="formulaire" action='' method='post'>
                    <div className="input__container" >
                        <label>Prenom :
                            <div> <input type="text" name="prenom" placeholder="prenom" value={profil.prenom} onChange={(e) => handleChange(e, 'prenom')} required /> </div>
                        </label>
                        </div>
                        <div className="input__container" >
                        <label>Nom :
                            <div> <input type="text" name="nom" placeholder="nom" value={profil.nom} onChange={(e) => handleChange(e, 'nom')} required /> </div>
                        </label>
                        </div>
                        <div className="input__container" >
                        <label>Email :
                            <div> <input type="email" name="email" placeholder="email" value={profil.email} onChange={(e) => handleChange(e, 'email')} required /> </div>
                        </label>
                        </div>
                        <label>
                            <input className='btn' type="submit" value="Modifier le profil" />
                        </label>
                        <label >
                            <input className='btn' type="submit" id="del" onClick={(e) => handleDelete(e, state.id)} value="supprimer" />
                        </label>
                    </form>
                    </div>
            }

          
                </div>
        </React.Fragment>
    )
}

export default Profil