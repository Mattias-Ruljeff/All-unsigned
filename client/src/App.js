import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

// Components
import Header from "./components/layouts/Header";
import Home from "./components/pages/Home";
import BandPage from "./components/pages/BandPage";
import BandInfo from "./components/bands/BandInfo";
import NotFoundPage from "./components/pages/NotFoundPage";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path ='/' component={Home} />
                    <Route exact path ='/bands' component={BandPage} />
                    <Route exact path ='/bands/info/:id' component={BandInfo} />
                    <Route exact path ='/404' component={NotFoundPage} />
                    <Redirect to="/404" />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

// Exports
export default App;