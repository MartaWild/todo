import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Todo } from '../types';
import { TodoItem } from "./TodoItem";
import { prefix } from '../prefix';
import { connect } from "react-redux";
import { addTodo, deleteTodo, loadTodos, setTodos, resetStore } from "../redux/actions";
import { GlobalStyle } from "./GlobalStyle";

const Wrapper = styled.div`
    margin-left: auto;
    margin-right: auto;    
    margin-top: 2%;
    width: 55vw;    
    font-size: 19px;
    font-family: 'Cousine', monospace;
    user-select: none;
    color: #07635C;
    background: rgba(210, 250, 247, 0.7);
    border-radius: 26px;
    padding: 3%;
    
    @media only screen and (max-width: 1024px){    
      font-size: 18px;
      width: 70vw;
    }
    
    @media only screen and (max-width: 780px){    
      width: 80vw;
    }
`;

const Button = styled.button`
    font-size: 19px;
    font-family: 'Cousine', monospace;
    color: #ffffff;
    background: #33CEC3;
    border-radius: 4px;
    cursor:pointer;
    border: none;
    padding: 1% 2% 1% 2%;
    
    @media only screen and (max-width: 1024px){    
      font-size: 18px;
    }
    
    @media only screen and (max-width: 780px){    
      padding: 2% 3% 2% 3%;
    }
`;

const List = styled.ul`
    padding: 0;
`;

const WrapperAddTodo = styled.div`
    margin-bottom: 4%;
    width: 100%;
`;


const InputTodo = styled.input`
    width: 60%;
    font-size: 19px;
    font-family: 'Cousine', monospace;
    margin-right: 10px;
    color: #07635C;
    box-sizing: border-box;
    border-radius: 5px;
    border:  none;
    padding: 1%;
    margin-bottom: 1%;
    background: rgba(255, 255, 255, 0.8);

        
    @media only screen and (max-width: 1024px){    
      width: 43%;   
    }    
    
    @media only screen and (max-width: 780px){    
      width: 100%;
      margin-bottom: 3%;
    }
    
    &:focus {
      outline: none;
    }
`;

const AddTodo = styled(Button)`
    margin-right: 1%;
    
    @media only screen and (max-width: 780px){    
      margin-right: 3%;
    }
`;

const SingleTaskModeButton = styled(Button)``;

const TodayDate = styled.div`
    margin: 5% 0 3% 0;
    font-size: 20px;
    font-weight: bold;
    align-self: center;
    
    @media only screen and (max-width: 1024px){
      font-size: 18px;
    }
    
    @media only screen and (max-width: 780px){    
      font-size: 15px;
    }
`;

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

const LogOutButton = styled(Button)`
    margin: 5% 0 3% 0;
    background: none;
    color: #07635C;
    font-weight: bold;
    font-size: 15px;
    padding: 0;
    
    @media only screen and (max-width: 1024px){
      font-size: 14px;
    }
    
    @media only screen and (max-width: 780px){    
      font-size: 12px;
    }
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }`;

const Loader = styled.div`
    margin-left: auto;
    margin-right: auto;    
    border: 16px solid #f3f3f3; 
    border-top: 16px solid #13988F; 
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: ${spin} 2s linear infinite;
`;


const reorder = (list: Todo[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result.map((el, index) => {
        return { data: el.data, checked: el.checked, id: el.id, order: index, time: el.time }
    });
};

const today = new Date();
const date = String(today.getDate()).padStart(2, '0');
const month = today.toLocaleString('default', {month: 'short'});
const year = today.getFullYear();
const weekDay = today.toLocaleString('default', {weekday: 'short'});
const fullDate = weekDay + ', ' + date + ' ' + month + ' ' + year;

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
    addTodo: (data: string, checked: boolean, order: number) => void,
    loadTodos: () => void,
    resetStore: () => void,
    isLoading: boolean
}) {
    const { todos, setTodos, addTodo, deleteTodo, resetStore, isLoading } = props;

    const addNewTodo = (text: string) => {
        let order = 0;
        if (todos.length > 0) {
            order = maxOrder<Todo>(todos, el => el.order).order + 1
        }
        addTodo(text, false, order);
    };

    const onCheckboxChange = (todoId: number) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setTodos(todos.map(i => {
                if (i.id === todoId) {
                    fetch(prefix + '/api/v1/todos/' + todoId, {
                        method: 'PUT',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({data: i.data, checked: !i.checked, id: i.id, order: i.order, time: i.time}),
                        credentials: 'include'
                    });
                    return {data: i.data, checked: event.target.checked, id: i.id, order: i.order, time: i.time};
                } else {
                    return i;
                }
            }));
        };

    const onClickTodoText = (todoId: number) =>
        setTodos(todos.map(i => {
            if (i.id === todoId) {
                fetch(prefix + '/api/v1/todos/' + todoId, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({data: i.data, checked: !i.checked, id: i.id, order: i.order, time: i.time}),
                    credentials: 'include'
                });
                return {data: i.data, checked: !i.checked, id: i.id, order: i.order, time: i.time};
            } else {
                return i;
            }
        }));


    let history = useHistory();
    const handler = () => {
        history.replace('single')
    };

    const [inputValue, setValue] = useState('');

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            addNewTodo(inputValue);
            setValue('')
        }
    };

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(
            props.todos,
            result.source.index,
            result.destination.index
        );

        setTodos(items);
        for (let i = 0; i < items.length; i++) {
            fetch(prefix + '/api/v1/todos/' + items[i].id, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    data: items[i].data,
                    checked: items[i].checked, id: items[i].id,
                    order: items[i].order,
                    time: items[i].time
                }),
                credentials: 'include'
            });
        }
    };

    const logout = () => {
        fetch(prefix + '/api/v1/logout/', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        }).then(res => {
            if (res.ok) {
                history.replace('/');
                resetStore();
            }
        })
    };

    return (
        <Wrapper>
            <GlobalStyle />
            <HeaderWrapper>
                <TodayDate>
                    {fullDate.charAt(0).toUpperCase() + fullDate.slice(1)}
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
                <AddTodo onClick={() => {
                    addNewTodo(inputValue);
                    setValue('')
                }}>Добавить</AddTodo>
                <SingleTaskModeButton onClick={handler}>Одно задание</SingleTaskModeButton>
            </WrapperAddTodo>
            {isLoading ? <Loader/> :
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided, snapshot) => (
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
                                              onClickTodoText={onClickTodoText}
                                    />
                                ))}
                            </List>
                        )}
                    </Droppable>
                </DragDropContext>
            }
        </Wrapper>
    );
}

export default connect(
    (state: any) => ({todos: state.todos, isLoading: state.isLoading}),
    {setTodos, addTodo, deleteTodo, loadTodos, resetStore}
)(ListMode);
