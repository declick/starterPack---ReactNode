//App.js

import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Routeur from './config/routeur';
import Footer from './components/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routeur />
      <Footer />
    </BrowserRouter>
  );
}

export default App;