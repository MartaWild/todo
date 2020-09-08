import {ADD_TODO, DELETE_TODO, SET_TODOS} from "../actionTypes";
import * as actions from "../actions";
import { Todo } from '../../types';

type ActionType = ReturnType<(typeof actions)[keyof typeof actions]>

const initialState = {
    todos: [] as Todo[]
};

export const rootReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case ADD_TODO: {
            const { data, checked, id, order } = action.payload;
            return {
                ...state,
                todos: [...state.todos, {data, checked, id, order}]
            };
        }
        case DELETE_TODO: {
            const { id } = action.payload;
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== id)
            };

        }
        case SET_TODOS: {
            return {
                ...state,
                todos: action.payload.todos
            };
        }
        default: return state;
    }
};