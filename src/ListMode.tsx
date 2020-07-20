import React from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";

const Wrapper = styled.div`
    margin-left: 30%;
    margin-top: 5%;
`;

const WrapperTodo = styled.div`

`;

const List = styled.ul`
    margin: 0;
    padding: 0;
`;

const ListItem = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-around;
    margin: 0;
    padding: 0;
`;

const Checkbox = styled.input`

`;

const TodoText = styled.li`
    list-style-type: none;
    margin: 0;
    padding: 0;
`;

const Time = styled.div``;

const Delete = styled.button``;

const Slide = styled.div``;

const WrapperAddTodo = styled.div`
`;

const WrapperControls = styled.div`
`;

const InputTodo = styled.input``;

const AddTodo = styled.button``;

const SingleTaskModeButton = styled.button``;

export default function ListMode() {
    let history = useHistory();
    const handler = () => {
        history.replace('/single')
    };

    return (
        <Wrapper>
            <WrapperTodo>
                <List>
                    <ListItem>
                        <Checkbox type="checkbox"/>
                        <TodoText>sdfsdf</TodoText>
                        <Time>15:00</Time>
                        <Delete>X</Delete>
                        <Slide>|</Slide>
                    </ListItem>
                    <ListItem>
                        <Checkbox type="checkbox"/>
                        <TodoText>sfsdfsfda</TodoText>
                        <Time>--:--</Time>
                        <Delete>X</Delete>
                        <Slide>|</Slide>
                    </ListItem>
                </List>
            </WrapperTodo>
            <WrapperAddTodo>
                <InputTodo type="text"/>
                <AddTodo>Добавить</AddTodo>
            </WrapperAddTodo>
            <WrapperControls>
                <SingleTaskModeButton onClick={handler}>Одно задание</SingleTaskModeButton>
            </WrapperControls>
        </Wrapper>
    );
}
