import parseurl from 'parseurl';
import { verifyToken } from '../auth/Token.js';

const ADMIN_PATHS = [
  '/Admin/Dashboard', 
  ];
const USER_PATHS = [ '/Logout', '/Profil/:id' ];

// Pour chaque chemin dans ADMIN_PATHS et USER_PATHS, on vérifie s'il contient des paramètres dynamiques (indiqués par :).
// Si le chemin contient des paramètres dynamiques, on crée un regex basé sur ce chemin en remplaçant chaque paramètre dynamique par [^/]+, qui correspond à n'importe quel caractère sauf le slash /.
// On teste ensuite si le pathname correspond au regex du chemin.

const getProtectedRole = (pathname) => {
  if (ADMIN_PATHS.some(path => path.includes(':') ? new RegExp(path.replace(/:[^/]+/g, '[^/]+')).test(pathname) : path === pathname)) {
    return 'admin';
  }
  
  if (USER_PATHS.some(path => path.includes(':') ? new RegExp(path.replace(/:[^/]+/g, '[^/]+')).test(pathname) : path === pathname)) {
    return 'user';
  }

  return false;
};

const isAuthorized = (pathname, userData) => {
  const role = getProtectedRole(pathname);

  if (role === 'admin') {
    return userData ? userData.admin : false;
  } else if (role === 'user') {
    return userData ? userData.user : false;
  }

  return true;
};

const middleware = async (req, res, next) => {
  try {
    const pathname = parseurl(req).pathname.split('/')[2];
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;
    const userData = await verifyToken(token);

    if (isAuthorized(pathname, userData)) {
      next();
    } else {
      res.json({ response: false, msg: 'Access denied' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ response: false, msg: 'Internal Server Error' });
  }
};

export default middleware;
