import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
// Switch garante que apenas uma rota seja chamada por vez

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                {/* se não colocar o exact, quando entrar na página register, por ex, vai para de logon, pois começa com '/ */}
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/incidents/new" component={NewIncident} />
            </Switch>
        </BrowserRouter>
    )
}