import React from 'react';
import styled from 'styled-components';
import { Draggable } from "react-beautiful-dnd";
import { Todo } from '../types'
import Cross from '../cross.svg';
import Background from "../bg32.jpg";

const Button = styled.button`
    font-size: 19px;
    font-family: 'Cousine', monospace;
    background: none;
    color: #FD3F49;
    border-radius: 4px;
    height: 40px;
    cursor:pointer;
    border: none;
    font-weight: bold;

`;

const ListItem = styled.li`
    list-style-type: none;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 8px;
    padding: 0;
    width: 100%;    
    border-radius: 4px;   
`;

const Checkbox = styled.input`
    color: #07635C;
    box-sizing: border-box;
    border: 1px solid #13988F;
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
`;

const TodoText = styled.div`
    width: 100%;
    margin: 0;
    padding: 0;
    margin-left: 60px;
    display: block;
`;

const NewCheckbox = styled.label`
    display: block;
    position: relative;
    cursor: pointer;
    height: 25px;
    width: 25px;
`;

const Checkmark = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    border: 1px solid #13988F;
    box-sizing: border-box;
    border-radius: 5px;
    background: rgba(255,255,255,0.53);
    
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

const TodoTextWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 90%;    
    word-break: break-word;
`;

const Delete = styled.img`
   width: 17px;
   align-items: center;
`;

export function TodoItem (props: {
    addNewTodo: (text: string) => void,
    deleteTodo: (id: number) => void,
    onCheckboxChange: (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => void,
    onClickTodoText: (id: number) => void
    item: Todo,
    index: number,
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
                    <TodoTextWrapper>
                        <NewCheckbox >
                            <Checkbox type='checkbox' checked={item.checked}
                                      onChange={props.onCheckboxChange(item.id)}
                            />
                            <Checkmark />
                        </NewCheckbox>
                        <TodoText style={item.checked ? {textDecoration: "line-through", textDecorationThickness: "2px"} : {}}
                                  onClick={() => props.onClickTodoText(item.id)}
                        >
                                {item.data}
                        </TodoText>
                    </TodoTextWrapper>
                        <Delete src={Cross} onClick={() => props.deleteTodo(item.id)} />
                </ListItem>
            )}
        </Draggable>
    )

}