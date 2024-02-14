import express from 'express';

import Dash from '../controller/DashboardController.js';
import Islogged from '../auth/IsLogged.js';
import Login from '../controller/LoginController.js';
import SignUp from '../controller/SignUpController.js';
import middleware from '../controller/Middleware.js';
import HomeData from '../controller/HomeController.js';
import { GetProfil, EditProfil, DeleteUser } from '../controller/ProfilController.js';

const router = express.Router();

const defaultJson = (req, res) => {
  res.json({
    response: true
  });
}

router.get("/api/adminPath", (req, res) => {
  res.json({ response: true, msg: 'admin path' });
});

router.get("/api/userPath", (req, res) => {
  res.json({ response: true, msg: 'user path' });
});

router.get("/api/publicPath", (req, res) => {
  res.json({ response: true, msg: 'public path' });
});


// ROUTES PUBLICS
router.get("/api/Home", HomeData);

router.post("/api/Login", Login);
router.post("/api/Islogged", Islogged);
router.post("/api/SignUp", SignUp);

// ROUTES USERS
router.get("/api/Profil/:id",middleware, GetProfil);
router.post("/api/Profil/:id",middleware,  EditProfil);
router.get("/api/DeleteProfil/:id",middleware,DeleteUser );

// ROUTES ADMIN
router.get("/api/Admin/Dashboard", Dash);






export default router