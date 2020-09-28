import {
    ADD_TODO_TO_STORE,
    DELETE_TODO_FROM_STORE,
    SET_TODOS,
    RESET,
    START_TODOS_LOADING,
    SET_TIME
} from "./actionTypes";
import {Todo} from "../types";
import {prefix} from '../prefix';
import {Dispatch} from "redux";

export const startTodosLoading = () => ({
    type: START_TODOS_LOADING,
    payload: {}
});

export const addTodoToStore = (data: string, checked: boolean, id: number, order: number, time: number) => ({
    type: ADD_TODO_TO_STORE,
    payload: {
        data,
        checked,
        id,
        order,
        time
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

export const resetStore = () => ({
    type: RESET,
    payload: {}
});

export const setTime = (time: number, id: number) => ({
    type: SET_TIME,
    payload: {
        time,
        id
    }
});

export const addTodo = (data: string, checked: boolean, order: number) => {
    return (dispatch: Dispatch) => {
        fetch(prefix + '/api/v1/todos', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({data, checked: false, order}),
            credentials: 'include'
        })
            .then(res => res.json())
            .then(obj => dispatch(addTodoToStore(data, false, obj.id, order, 0)))
    }
};

export const deleteTodo = (id: number) => {
    return (dispatch: Dispatch) => {
        fetch(prefix + '/api/v1/todos/' + id, {
            method: 'DELETE',
            credentials: 'include'
        });
        dispatch(deleteTodoFromStore(id))
    }
};

export const loadTodos = () => {
    return (dispatch: Dispatch) => {
        dispatch(startTodosLoading());
        fetch(prefix + '/api/v1/todos', {credentials: 'include'})
            .then(response => response.json())
            .then(todos => {
                dispatch(
                    setTodos(todos.map((item: any) => {
                        const savedTime = localStorage.getItem(item.id.toString());
                        const time = savedTime ? Number(savedTime) : 0;
                        return {
                            ...item,
                            time
                        };
                    }
                )));
            })
    }
};