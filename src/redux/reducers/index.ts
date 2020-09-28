import {
    ADD_TODO_TO_STORE,
    DELETE_TODO_FROM_STORE,
    RESET,
    SET_TIME,
    SET_TODOS,
    START_TODOS_LOADING
} from "../actionTypes";
import * as actions from "../actions";
import { Todo } from '../../types';

type ActionType = Extract<ReturnType<(typeof actions)[keyof typeof actions]>, { type: string }>;

const initialState = {
    todos: [] as Todo[],
    isLoading: false
};

export const rootReducer = (state = initialState, action: ActionType): typeof initialState => {
    switch (action.type) {
        case START_TODOS_LOADING: {
            return {
                ...state,
                isLoading: true
            }
        }
        case ADD_TODO_TO_STORE: {
            const { data, checked, id, order, time } = action.payload;
            return {
                ...state,
                todos: [...state.todos, {data, checked, id, order, time}]
            };
        }
        case DELETE_TODO_FROM_STORE: {
            const { id } = action.payload;
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== id)
            };

        }
        case SET_TODOS: {
            return {
                ...state,
                todos: action.payload.todos,
                isLoading: false
            };
        }
        case SET_TIME:{
            const { time, id } = action.payload;
            return {
                ...state,
                todos: state.todos.map(item => {
                if (item.id === id){
                    return{
                        ...item,
                        time: time
                    }
                }
                return item
                })
            }

        }
        case RESET: {
            return initialState;
        }
        default: return state;
    }
};