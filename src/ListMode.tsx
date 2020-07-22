import React, { useState } from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory
} from 'react-router-dom';

const Button = styled.button`
    font-size: 18px;
    font-family: 'Cousine', monospace;
`;

const Wrapper = styled.div`
    margin-left: auto;
    margin-right: auto;    
    margin-top: 5%;
    padding: 0;
    width: 80vw;    
    font-size: 18px;
    font-family: 'Cousine', monospace;
`;

const List = styled.ul`
    padding: 0;
`;

const ListItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 8px;
    padding: 0;
`;

const Checkbox = styled.input``;

const TodoText = styled.li`
    list-style-type: none;
    width: 50%;
    margin: 0;
    padding: 0;
`;

const Time = styled.input`
    width: 7%;
    font-size: 18px;
    font-family: 'Cousine', monospace;
`;

const Delete = styled(Button)``;

const Slide = styled.div``;

const WrapperAddTodo = styled.div`
    margin-bottom: 20px;
`;

const WrapperControls = styled.div`
`;

const InputTodo = styled.input`
    width: 30%;
    font-size: 18px;
    font-family: 'Cousine', monospace;
    margin-right: 10px;
`;

const AddTodo = styled(Button)``;

const SingleTaskModeButton = styled(Button)``;

const InfoButton = styled(Button)``;


type Todo = {
    data: string,
    checked: boolean,
    id: number,
    startTime?: number
}

export default function ListMode() {
    let history = useHistory();
    const handler = () => {
        history.replace('/single')
    };

    const list: readonly Todo[] = [];
    const [state, setState] = useState(list);
    const [inputValue, setValue] = useState('');

    const onCheckboxChange = (item: Todo) =>
        (event: React.ChangeEvent<HTMLInputElement>) => setState(state.map(i => {
            if (i.id === item.id) {
                return {data: i.data, checked: event.target.checked, id: i.id};
            } else {
                return i;
            }
        }));

    const addNewTodo = () => {
        setState([...state, {data: inputValue, checked: false, id: Math.random()}]);
        setValue('');
    };

    const deleteTodo = (id: number) => {
        setState(state.filter(todo => todo.id !== id));
    };

    return (
        <Wrapper>
            <List>
                {state.map(item =>
                    <ListItem>
                        <Checkbox type='checkbox' checked={item.checked}
                                  onChange={onCheckboxChange(item)}
                        />
                        <TodoText style={item.checked ? {textDecoration: "line-through"} : {}}> {item.data} </TodoText>
                        <Time type="time" style={item.checked ? {textDecoration: "line-through"} : {}} />
                        <Delete onClick={() => deleteTodo(item.id)}>X</Delete>
                        <InfoButton>?</InfoButton>
                        <Slide>|</Slide>
                    </ListItem>
                )}
            </List>
            <WrapperAddTodo>
                <InputTodo type="text" onChange={(event) => setValue(event.target.value)} value={inputValue}/>
                <AddTodo onClick={addNewTodo}>Добавить</AddTodo>
            </WrapperAddTodo>
            <WrapperControls>
                <SingleTaskModeButton onClick={handler}>Одно задание</SingleTaskModeButton>
            </WrapperControls>
        </Wrapper>
    );
}
