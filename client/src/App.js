import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

// Components
import Navbar from "./components/layouts/Navbar";
import BandList from "./components/BandList";
import AddBand from "./components/AddBand";
import NotFoundPage from "./components/NotFoundPage.js";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
          <Switch>
            <Route exact path ='/' component={BandList} />
            <Route exact path ='/addband' component={AddBand} />
            <Route exact path ='/404' component={NotFoundPage} />
            <Redirect to="/404" />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
