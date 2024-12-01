import React from "react";
import "./App.css";
import {useState} from "react";
import {useEffect} from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import UsernameForm from "./components/UsernameForm";


function App() {
    const [todos, setTodos] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        getTodos(username);
        console.log('username changed');
    }, [username]);

    function addTodo(todo) {
        const postData = {
            username: username,
            task: todo.task
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        };

        fetch('http://localhost:5000/add-todo', requestOptions)
            .then(response => response.json())
            .then(newTodo => {
                setTodos([newTodo, ...todos]);
            })
            .catch(error => {
                console.log('Error adding todo');
            });
    }

    function getTodos(username) {
        fetch(`http://localhost:5000/todos?username=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(todos => {
            setTodos(todos);
        })
        .catch(error => {
            console.log('Error getting todos');
        });
    }
    
    function toggleComplete(id) {
        const putData = {
            id: id,
            username: username
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
            id: id,
            username: username
        };

        // DELETE request options
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
               <UsernameForm addUsername={setUsername}/>
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