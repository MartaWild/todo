import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import SingleTaskMode from './SingleTaskMode';
import ListMode, {Todo} from "./ListMode";


function App() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() =>{
        fetch('/api/v1/todos')
            .then(response => response.json())
            .then(todos => {
                setTodos(todos);
                console.log(todos)
            })
    }, []);

    const addNewTodo = (text: string) => {
        fetch('/api/v1/todos', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({data: text, checked: false, id: Math.random()})
        });
        setTodos([...todos, {data: text, checked: false, id: Math.random()}]);
    };

    const deleteTodo = (id: number) => {
        fetch('/api/v1/todos/' + id, {
            method: 'DELETE'
        });
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const onCheckboxChange = (todoId: number) =>
        (event: React.ChangeEvent<HTMLInputElement>) => setTodos(todos.map(i => {
            if (i.id === todoId) {
                return {data: i.data, checked: event.target.checked, id: i.id};
            } else {
                return i;
            }
        }));

    return (
        <div className="App">
            <Router basename={window.location.pathname || ''}>
                <Switch>
                    <Route exact path='/' render={() =>
                        <ListMode todos={todos}
                                  addNewTodo={addNewTodo}
                                  deleteTodo={deleteTodo}
                                  onCheckboxChange={onCheckboxChange}
                        /> } />
                    <Route exact path='/single' render={() => <SingleTaskMode todos={todos}/> }/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
