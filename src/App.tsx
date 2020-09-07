import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import SingleTaskMode from './SingleTaskMode';
import ListMode from "./ListMode";
import { Todo } from './types'

const prefix = 'http://localhost:4000';

const maxOrder = <T,>(arr: readonly T[], func: (element: T)=> number): T => {
    let check = 0;
    let theMaxOrder: T = arr[0];
    for (let i = 0; i < arr.length; i++){
        if (check < func(arr[i]))  {
            check =  func(arr[i]);
            theMaxOrder = arr[i];
        }
    }
    return theMaxOrder
};

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() =>{
        fetch(prefix + '/api/v1/todos')
            .then(response => response.json())
            .then(todos => {
                setTodos(todos);
            })
    }, []);

    const addNewTodo = (text: string) => {
        let order = 0;
        if(todos.length > 0){
            order =  maxOrder(todos, el => el.order).order + 1
        }
        fetch(prefix + '/api/v1/todos', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({data: text, checked: false, id: Math.random(), order: order})
        });
        setTodos([...todos, {data: text, checked: false, id: Math.random(), order: order}])
    };

    const deleteTodo = (id: number) => {
        fetch(prefix + '/api/v1/todos/' + id, {
            method: 'DELETE'
        });
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const onCheckboxChange = (todoId: number) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setTodos(todos.map(i => {
                if (i.id === todoId) {
                    fetch(prefix + '/api/v1/todos/' + todoId, {
                        method: 'PUT',
                        headers: {'Content-Type':'application/json'},
                        body: JSON.stringify({data: i.data, checked: !i.checked, id: i.id, order: i.order})
                    });
                    return {data: i.data, checked: event.target.checked, id: i.id, order: i.order};
                } else {
                    return i;
                }
            }));
    };

    const setDone = (todoId:number) => {
        setTodos(todos.map(i => {
                if (i.id === todoId) {
                    fetch(prefix + '/api/v1/todos/' + todoId, {
                        method: 'PUT',
                        headers: {'Content-Type':'application/json'},
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
                    <Route exact path='/' render={() =>
                        <ListMode todos={todos}
                                  addNewTodo={addNewTodo}
                                  deleteTodo={deleteTodo}
                                  onCheckboxChange={onCheckboxChange}
                                  setTodos={setTodos}
                        /> } />
                    <Route exact path='/single' render={() => <SingleTaskMode todos={todos} setDone={setDone}/> }/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
