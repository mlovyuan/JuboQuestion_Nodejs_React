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
      {/* <Route path="/" exact component={UsersList} />
      <Route path="/edit/:id" component={UserEdit} />
      <Route path="/create" component={UserCreate} />
      <Route path="/order" component={CreateOrder} /> */}
    </Router>
  );
}

export default App;
