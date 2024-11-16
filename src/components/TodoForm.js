import { useState } from "react";
import {v4 as uuid} from "uuid";

 function TodoForm({ addTodo }) {
  const[todo, setTodo] = useState({
    id: "",
    task: "",
    completed: false
  });

  function handleTaskInputChange(e) {
    setTodo({...todo, task:e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (todo.task.trim()) {
      // update backend
      const requestOptions = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(todo)
      };
      fetch('http://localhost:5000/add-todo', requestOptions)
        .then((res) => res.json())
        .then((data) => addTodo(data));

      // update internal state
      // addTodo({ ...todo, id: uuid() });
      setTodo({ ...todo, task: ""});
    }
  }

  return(
    <form onSubmit={handleSubmit}>
      <input
        name = "task"
        type = "text"
        value = {todo.task}
        onChange = {handleTaskInputChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

 export default TodoForm;