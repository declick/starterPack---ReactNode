// Middleware.jsx
import { ReducerContext } from "../reducers/reducer.jsx";
import React, { useEffect, Fragment, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { adminPath, userPath } from "../config/path.js";

const isAdminPath = (path) => {
  return adminPath.some((adminPath) => {
    if (adminPath.includes(':')) {
      const regex = new RegExp(adminPath.replace(/:[^/]+/g, '[^/]+'));
      return regex.test(path);
    }
    return adminPath === path;
  });
};

const isUserPath = (path) => {
  return userPath.some((userPath) => {
    if (userPath.includes(':')) {
      const regex = new RegExp(userPath.replace(/:[^/]+/g, '[^/]+'));
      return regex.test(path);
    }
    return userPath === path;
  });
};

const Middleware = ({ children }) => {
  const [state] = useContext(ReducerContext);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [show, setShow] = useState(false);

  useEffect(() => {
    const isCurrentPathAdmin = isAdminPath(currentPath);
    const isCurrentPathUser = isUserPath(currentPath);

    const isAdminAndNotLoggedIn = isCurrentPathAdmin && !state.admin && !state.login;
    const isUserAndNotLoggedIn = isCurrentPathUser && !state.login;

    if (isAdminAndNotLoggedIn || isUserAndNotLoggedIn) {
      const redirectTo = '/';
      setShow(false);
      navigate(redirectTo);
    } else {
      setShow(true);
    }
  }, [currentPath, navigate, state.admin, state.login]);

  return <Fragment>{show && children}</Fragment>;
};

export default Middleware;
