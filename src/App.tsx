import React from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import SingleTaskMode from './SingleTaskMode';
import ListMode from "./ListMode";


function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route exact path='/' component={ListMode} />
                <Route exact path='/single' component={SingleTaskMode} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
