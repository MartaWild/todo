import { ADD_TODO_TO_STORE, DELETE_TODO_FROM_STORE, SET_TODOS } from "./actionTypes";
import {Todo} from "../types";
import { prefix } from '../prefix';
import {Dispatch} from "redux";

export const addTodoToStore = (data: string, checked: boolean, id: number, order: number) => ({
    type: ADD_TODO_TO_STORE,
    payload: {
        data,
        checked,
        id,
        order
    }
});

export const deleteTodoFromStore = (id: number) => ({
    type: DELETE_TODO_FROM_STORE,
    payload: {
        id
    }
});

export const setTodos = (todos: Todo[]) => ({
    type: SET_TODOS,
    payload: {
        todos
    }

});

export const addTodo = (data: string, checked: boolean, id: number, order: number) => {
    return (dispatch: Dispatch) => {
        fetch(prefix + '/api/v1/todos', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({data, checked: false, id: Math.random(), order})
        });
        dispatch(addTodoToStore(data, false, Math.random(), order));
    }
};

export const deleteTodo = (id: number) => {
    return (dispatch: Dispatch) => {
        fetch(prefix + '/api/v1/todos/' + id, {
            method: 'DELETE'
        });
        dispatch(deleteTodoFromStore(id))
    }
};

export const loadTodos = () => {
    return (dispatch: Dispatch) =>{
        fetch(prefix + '/api/v1/todos')
            .then(response => response.json())
            .then(todos => {
                dispatch(setTodos(todos));
            })
    }
}