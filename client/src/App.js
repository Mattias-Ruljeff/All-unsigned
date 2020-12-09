import "./App.css";
import React from "react";
import Header from "./components/common/Header";
import BandList from "./components/BandList";
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage.js";
import AddBand from "./components/AddBand";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route path="/" exact component={BandList} />
        <Route path="/addband" component={AddBand} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
