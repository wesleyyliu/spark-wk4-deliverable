import React from "react";
import "./App.css";
import {useState} from "react";
import {useEffect} from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
    useEffect(() => {
        fetch('http://localhost:5000/todos')
            .then((res) => res.json())
            .then((data) => setTodos(data));
    }, []);

    const[todos, setTodos] = useState([])

    function addTodo(todo) {
        setTodos([todo, ...todos]);
    }
    
    function toggleComplete(id) {
        const putData = {
            id: id
        };

        // PUT request options
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(putData)
        };

        fetch('http://localhost:5000/check-todo', requestOptions);
        
        setTodos(
            todos.map(todo => {
            if (todo.id === id) {
                return {
                ...todo,
                completed: !todo.completed
                };
            }
            return todo;
            })
        );

    }
    
    function removeTodo(id) {
        const deleteData = {
            id: id
        };

        // PUT request options
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deleteData)
        };

        fetch('http://localhost:5000/delete-todo', requestOptions);

        const newTodos = todos.filter((item) => item.id !== id);
        setTodos(newTodos);
    }        

   return (
       <div className = "App">
           <header className = "App-header">
               <p>React Todo</p>
               <TodoForm addTodo={addTodo}/>
               <TodoList
                    todos={todos}
                    removeTodo={removeTodo}
                    toggleComplete={toggleComplete}
                />

           </header>
       </div>
   );
}


export default App;