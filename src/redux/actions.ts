import { ADD_TODO, DELETE_TODO } from "./actionTypes";

export const addTodo = (text: string, checked: boolean, id: number, order: number) => ({
    type: ADD_TODO,
    payload: {
        text,
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