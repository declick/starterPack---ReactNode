//App.js

import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Routeur from './config/routeur';
import Footer from './components/Footer';
import ScrollApp from './components/ScrollApp';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollApp />
      <Routeur />
      <Footer />
    </BrowserRouter>
  );
}

export default App;