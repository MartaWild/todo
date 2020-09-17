import React, {useEffect} from 'react';
import {
    Switch,
    Route,
    useHistory
} from "react-router-dom";
import SingleTaskMode from './components/SingleTaskMode';
import ListMode from "./components/ListMode";
import AuthForm from "./components/AuthForm";
import {prefix} from "./prefix";
import { loadTodos } from "./redux/actions";
import { connect } from "react-redux";

function App(props: { loadTodos: () => void }) {
    const { loadTodos } = props;
    const history = useHistory();

    useEffect(() => {
        fetch(prefix + '/api/v1/todos', {credentials: 'include'})
            .then(res => {
                if (res.ok) {
                    console.log(window.location.pathname);
                    if (window.location.pathname === '/'){
                        history.replace('list');
                    }
                    loadTodos();
                }
            })
    }, []);

    return (
        <Switch>
            <Route exact path='/list' render={() => <ListMode/>}/>
            <Route exact path='/single' render={() => <SingleTaskMode/>}/>
            <Route exact path='/' render={() => <AuthForm/>}/>
        </Switch>
    );
}

export default connect(
    null,
    { loadTodos }
)(App);