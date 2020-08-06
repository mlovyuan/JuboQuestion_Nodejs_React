import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from "./components/Navbar"
import PatientsList from "./components/PatientsList_component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <PatientsList />
    </Router>
  );
}

export default App;
