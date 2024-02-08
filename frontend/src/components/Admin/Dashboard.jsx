// Navbar.jsx

import React, { useEffect, useContext } from "react";
import axios from 'axios';
import { LOGIN, ADMIN, USER } from '../../config/constants.js';
import BASE_URL from '../../config.js';
import { ReducerContext } from "../../reducers/reducer.jsx";

const Dashboard = () => {

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

 

  return (
    <React.Fragment>
      <div className="dashboard">
        <div className="container-ui">


            </div>

      </div>
    </React.Fragment>
  );
};

export default Dashboard;
