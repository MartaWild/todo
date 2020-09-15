import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import { Todo } from '../types';
import TodoItem from "./TodoItem";
import { prefix } from '../prefix';
import { connect } from "react-redux";
import {addTodo, deleteTodo, loadTodos, setTodos} from "../redux/actions";

const Button = styled.button`
    font-size: 18px;
    font-family: 'Cousine', monospace;
    color: #ffffff;
    background: #33CEC3;
    border-radius: 4px;
    height: 40px;
    cursor:pointer;
    border: none;
    cursor: pointer;
`;

const Wrapper = styled.div`
    margin-left: auto;
    margin-right: auto;    
    margin-top: 2%;
    padding: 0;
    width: 80vw;    
    font-size: 18px;
    font-family: 'Cousine', monospace;
    user-select: none;
    color: #07635C;
`;

const List = styled.ul`
    padding: 0;
`;


const WrapperAddTodo = styled.div`
    margin-bottom: 4%;
`;

const WrapperControls = styled.div`
`;

const InputTodo = styled.input`
    width: 70%;
    font-size: 18px;
    font-family: 'Cousine', monospace;
    margin-right: 10px;
    color: #07635C;
    box-sizing: border-box;
    border-radius: 2px;
    border: 1px solid #13988F;
    padding: 10px;
`;

const AddTodo = styled(Button)`
    margin-right: 10px;
`;

const SingleTaskModeButton = styled(Button)``;

const TodayDate = styled.div`
    margin: 5% 0 3% 0;
`;

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const LogOutButton = styled(Button)`
    margin: 5% 0 3% 0;
    background: none;
    color: #07635C;
`;


const reorder = (list: Todo[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result.map((el, index) => {return {data: el.data, checked: el.checked, id: el.id, order: index}});
};

const today = new Date();
const date = String(today.getDate()).padStart(2, '0');
const month = today.toLocaleString('default', { month: 'short' });
const year = today.getFullYear();
const weekDay = today.toLocaleString('default', { weekday: 'short' });
const fullDate = weekDay + ', ' + date + ' ' +  month + ' ' + year;

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

function ListMode(props: {
    todos: Todo[],
    deleteTodo: (id: number) => void,
    setTodos: (todos: Todo[]) => void,
    addTodo: (data: string, checked: boolean, id: number, order: number) => void,
    loadTodos: () => void
}){
    const {todos, setTodos, addTodo, deleteTodo, } = props;

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
                        body: JSON.stringify({data: i.data, checked: !i.checked, id: i.id, order: i.order}),
                        credentials: 'include'
                    });
                    return {data: i.data, checked: event.target.checked, id: i.id, order: i.order};
                } else {
                    return i;
                }
            }));
        };

    let history = useHistory();
    const handler = () => {
        history.replace('/single')
    };

    const [inputValue, setValue] = useState('');

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            addNewTodo(inputValue); setValue('')
        }
    };

    const onDragEnd = (result : any) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            props.todos,
            result.source.index,
            result.destination.index
        );

        setTodos(items);
        for(let i = 0; i < items.length; i++){
            fetch(prefix + '/api/v1/todos/' + items[i].id, {
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                        data: items[i].data,
                        checked: items[i].checked, id: items[i].id,
                        order: items[i].order
                }),
                credentials: 'include'
            });
        }
    };

    const logout = () => {
        fetch(prefix + '/api/v1/logout/', {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            credentials: 'include'
        }).then(res =>{
            if(res.ok){
                history.replace('/');
            }
        })
    };

    return (
        <Wrapper>
            <HeaderWrapper>
                <TodayDate>
                    {fullDate}
                </TodayDate>
                <LogOutButton onClick={logout}>
                    Выход
                </LogOutButton>
            </HeaderWrapper>
            <WrapperAddTodo>
                <InputTodo type="text"
                           onChange={(event) => setValue(event.target.value)}
                           onKeyDown={handleKeyDown}
                           value={inputValue}
                           autoFocus
                />
                <AddTodo onClick={() => {addNewTodo(inputValue); setValue('')}}>Добавить</AddTodo>
                <SingleTaskModeButton onClick={handler}>Одно задание</SingleTaskModeButton>
            </WrapperAddTodo>
            <WrapperControls>

            </WrapperControls>
            <DragDropContext onDragEnd={onDragEnd} >
                <Droppable droppableId="droppable">
                    {(provided, snapshot) =>(
                        <List {...provided.droppableProps}
                              ref={provided.innerRef}
                        >
                            {props.todos.map((item, index) => (
                                <TodoItem item={item}
                                          index={index}
                                          addNewTodo={addNewTodo}
                                          deleteTodo={deleteTodo}
                                          onCheckboxChange={onCheckboxChange}
                                          key={item.id}
                                />

                            ))}
                        </List>
                    )}
                </Droppable>
            </DragDropContext>
        </Wrapper>
    );
}

export default connect(
    (state: any) => ({ todos: state.todos }),
    { setTodos, addTodo, deleteTodo, loadTodos }
)(ListMode);
