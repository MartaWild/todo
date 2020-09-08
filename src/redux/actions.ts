import { ADD_TODO, DELETE_TODO, SET_TODOS } from "./actionTypes";
import {Todo} from "../types";

export const addTodo = (data: string, checked: boolean, id: number, order: number) => ({
    type: ADD_TODO,
    payload: {
        data,
        checked,
        id,
        order
    }
});

export const deleteTodo = (id: number) => ({
    type: DELETE_TODO,
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