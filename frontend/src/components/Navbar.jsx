// Navbar.jsx

import { NavLink } from 'react-router-dom';
import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { LOGIN, ADMIN, USER } from '../config/constants.js';
import BASE_URL from '../config.js';
import { ReducerContext } from "../reducers/reducer.jsx";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [state, dispatch] = useContext(ReducerContext);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken")
    if (!state.login && token) {
      axios.post(`${BASE_URL}/IsLogged`, { token })
        .then((res) => {
          if (res.data.token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
          }
          res.data.response && dispatch({ type: LOGIN, payload: res.data.user_id })
          res.data.admin && dispatch({ type: ADMIN })
          res.data.user && dispatch({ type: USER })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [dispatch, state.login])


  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <React.Fragment>
      <nav>
        <ul className={`menu ${menuOpen ? 'open' : ''}`}>
          <li className="title_nav">
            <h1>XTechCloud</h1>
          </li>
          <li><a href="/" onClick={toggleMenu}>Accueil</a></li>
          {!state.login && (
            <li><NavLink to="/SignUp" onClick={toggleMenu}>SignUp</NavLink></li>
          )}
          {state.login && (
            <React.Fragment>
              <li><NavLink to={`/Profil/${state.user_id}`} onClick={toggleMenu}>Profil</NavLink></li>
              <li><NavLink to="/Logout" onClick={toggleMenu}>Logout</NavLink></li>
            </React.Fragment>
          )}
          
          {state.admin && (
            <li><NavLink to="/Admin/Dashboard" onClick={toggleMenu}>Dashboard</NavLink></li>

          )}
        </ul>
        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
