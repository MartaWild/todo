import {ADD_TODO, DELETE_TODO} from "../actionTypes";
import * as actions from "../actions";
import { Todo } from '../../types';

type ActionType = ReturnType<(typeof actions)[keyof typeof actions]>

const initialState = {
    todos: [] as Todo[]
};

export const rootReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case ADD_TODO: {
            const { text, checked, id, order } = action.payload;
            return {
                ...state,
                todos: [...state.todos, {text, checked, id, order}]

            }
        }
        case DELETE_TODO: {
            const { id } = action.payload;
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== id)
            }

        }
        default: return state;
    }
};