import React from 'react';
import styled from 'styled-components'

const WrapperTodo = styled.div`

`;

const List = styled.ul`
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-around;
`;

const Checkbox = styled.input`
  margin-right: 10px
`;

const TodoText = styled.li`
  list-style-type: none;
`;

const Time = styled.div``;

const Delete = styled.button``;

const Slide = styled.div``;

const WrapperAddTodo = styled.div`
  margin-left: 50px;
`;

const WrapperControls = styled.div`
  margin-left: 50px;
`;

const InputTodo = styled.input``;

const AddTodo = styled.button``;

const ListMode = styled.button``;

const SingleTaskMode = styled.button``;

function App() {
  return (
    <div className="App">
      <WrapperTodo>
          <List>
            <ListItem>
              <Checkbox type="checkbox" />
              <TodoText>sdfsdf</TodoText>
              <Time>15:00</Time>
              <Delete>X</Delete>
              <Slide>|</Slide>
            </ListItem>
            <ListItem>
              <Checkbox type="checkbox" />
              <TodoText>sfsdfsfda</TodoText>
              <Time>--:--</Time>
              <Delete>X</Delete>
              <Slide>|</Slide>
            </ListItem>
          </List>
      </WrapperTodo>
      <WrapperAddTodo>
        <InputTodo type="text" />
        <AddTodo>Добавить</AddTodo>
      </WrapperAddTodo>
      <WrapperControls>
        <ListMode>Список</ListMode>
        <SingleTaskMode>Одно задание</SingleTaskMode>
      </WrapperControls>

    </div>
  );
}

export default App;
