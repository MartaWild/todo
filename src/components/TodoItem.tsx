import React from 'react';
import styled from 'styled-components';
import {Draggable} from "react-beautiful-dnd";
import { Todo } from '../types'

const Button = styled.button`
    font-size: 18px;
    font-family: 'Cousine', monospace;
    background: none;
    color: #FD3F49;
    border-radius: 4px;
    height: 40px;
    cursor:pointer;
    border: none;
    font-weight: bold;

`;

const ListItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 8px;
    padding: 0;
    background: white;
    width: 92%;
`;

const Checkbox = styled.input`
    transform: scale(1.5);
    color: #07635C;
    box-sizing: border-box;
    border-radius: 2px;
    border: 1px solid #13988F;
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
`;

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

const NewCheckbox = styled.label`
    display: block;
    position: relative;
    cursor: pointer;
`;

const Checkmark = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background: #FFFFFF;
    border: 1px solid #13988F;
    box-sizing: border-box;
    border-radius: 2px;
    
    &:after{
        left: 8px;
        top: 4px;
        width: 5px;
        height: 10px;
        border: solid #13988F;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
        content: "";
        position: absolute;
        display: none;
    }
    
    input:checked ~ &:after{
        display: block;
    }
    
`;


const Delete = styled(Button)``;

const Slide = styled.div``;

export default function TodoItem (props: {
    addNewTodo: (text: string) => void,
    deleteTodo: (id: number) => void,
    onCheckboxChange: (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => void,
    item: Todo
    index: number
}){
    const {item, index} = props;

    return (
        <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
            {(provided, snapshot) => (
                <ListItem key={item.id}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={provided.draggableProps.style}
                >
                    <NewCheckbox>
                        <Checkbox type='checkbox' checked={item.checked}
                                  onChange={props.onCheckboxChange(item.id)}
                        />
                        <Checkmark />
                    </NewCheckbox>
                    <TodoText style={item.checked ? {textDecoration: "line-through", textDecorationThickness: "2px"} : {}}> {item.data} </TodoText>
                    <Delete onClick={() => props.deleteTodo(item.id)}>X</Delete>
                </ListItem>
            )}
        </Draggable>
    )

}