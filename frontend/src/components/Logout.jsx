// Import module

import { useEffect, useContext } from 'react'
import { ReducerContext } from '../reducers/reducer.jsx'
import { LOGOUT } from '../config/constants.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Logout = () => {

    const [, dispatch] = useContext(ReducerContext)
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem('jwtToken')
        delete axios.defaults.headers.common['Authorization']
        dispatch({ type: LOGOUT })
        navigate("/")
    }, [dispatch, navigate])

}


export default Logout