import React from "react";
import { Box, Container, IconButton, Stack, Card, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Todo({ todo, toggleComplete, removeTodo }) {
 
  function handleCheckboxClick() {
    toggleComplete(todo.id);
  }


  function handleRemoveClick() {
    removeTodo(todo.id);
  }


  return (
    <Card sx={{ width : 500, padding: 2, marginBottom: 2, opacity: todo.completed ? .6 : 1}}>
        <Stack direction="row" spacing={2} justifyContent="space-between">
            <Stack direction="row" spacing={2} alignItems="center">
                <Checkbox
                    checked={todo.completed}
                    onChange={handleCheckboxClick}
                />
                <li
                    style = {{
                        color: "black",
                        textDecoration: todo.completed ? "line-through" : null,
                        textAlign: 'center'
                    }}
                >
                    {todo.task}</li>
            </Stack>
            <IconButton onClick={handleRemoveClick}>
                <DeleteIcon />
            </IconButton>
        </Stack>
        
    </Card>


  );
}


export default Todo;
