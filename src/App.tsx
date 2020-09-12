import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import SingleTaskMode from './components/SingleTaskMode';
import ListMode from "./components/ListMode";
import { Todo } from './types'
import { connect } from "react-redux";
import { setTodos, addTodo, deleteTodo, loadTodos } from "./redux/actions";
import { prefix } from "./prefix";
import AuthForm from "./components/Auth-form";

const maxOrder = <T, >(arr: readonly T[], func: (element: T) => number): T => {
    let check = 0;
    let theMaxOrder: T = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (check < func(arr[i])) {
            check = func(arr[i]);
            theMaxOrder = arr[i];
        }
    }
    return theMaxOrder
};

function App(props: {
    todos: Todo[],
    deleteTodo: (id: number) => void,
    setTodos: (todos: Todo[]) => void,
    addTodo: (data: string, checked: boolean, id: number, order: number) => void,
    loadTodos: () => void

}) {
    const {todos, setTodos, addTodo, deleteTodo, loadTodos} = props;


    const addNewTodo = (text: string) => {
        let order = 0;
        if (todos.length > 0) {
            order = maxOrder<Todo>(todos, el => el.order).order + 1
        }
        addTodo(text, false, Math.random(), order);
    };

    const onCheckboxChange = (todoId: number) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setTodos(todos.map(i => {
                if (i.id === todoId) {
                    fetch(prefix + '/api/v1/todos/' + todoId, {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({data: i.data, checked: !i.checked, id: i.id, order: i.order})
                    });
                    return {data: i.data, checked: event.target.checked, id: i.id, order: i.order};
                } else {
                    return i;
                }
            }));
        };

    const setDone = (todoId: number) => {
        setTodos(todos.map(i => {
                if (i.id === todoId) {
                    fetch(prefix + '/api/v1/todos/' + todoId, {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({data: i.data, checked: true, id: i.id, order: i.order})
                    });
                    return {data: i.data, checked: true, id: i.id, order: i.order};
                } else {
                    return i;
                }
            }
        ))
    };

    return (
        <div className="App">
            <Router basename={window.location.pathname || ''}>
                <Switch>
                    <Route exact path='/list' render={() =>
                        <ListMode todos={todos}
                                  addNewTodo={addNewTodo}
                                  deleteTodo={deleteTodo}
                                  onCheckboxChange={onCheckboxChange}
                                  setTodos={setTodos}
                        />}/>
                    <Route exact path='/single' render={() => <SingleTaskMode todos={todos} setDone={setDone}/>}/>
                    <Route exact path='/' render={() => <AuthForm/>}/>
                </Switch>
            </Router>
        </div>

    );
}

export default connect(
    (state: any) => ({ todos: state.todos }),
    { setTodos, addTodo, deleteTodo, loadTodos }
)(App);
