// config/path.js

import Home from '../components/Home';
import Login from '../components/Login';
import Dashboard from '../components/Admin/Dashboard';
import Logout from '../components/Logout';
import PageNotFound from '../components/PageNotFound';
import SignUp from '../components/SignUp';

import Profil from '../components/Profil';


export const routes = [
  { path: '/', element: <Home /> },
  { path: '/Login', element: <Login /> },
  { path: '/SignUp', element: <SignUp /> },
  { path: '/Logout', element: <Logout /> },
  { path: '/Profil/:id', element: <Profil /> },


  // route reserver au personne admin
  { path: '/Admin/Dashboard', element: <Dashboard />},


  { path: '*', element: <PageNotFound /> },

];
// route reserver au personne connecter
export const userPath = [
	'/Logout',
  '/Profil/:id',
]

// route resserver au personne connecter en admin
export const adminPath = [
  '/Admin/Dashboard',
  
];