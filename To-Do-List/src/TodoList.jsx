import './TodoList.css'; // <- Import the CSS file
import { useState } from "react"; 
import { v4 as uuidv4 } from 'uuid';

export default function TodoList() {
    let [todos, setTodos] = useState([]);
    let [newTodo, setNewTodo] = useState("");

    let addNewTask = () => {
        setTodos((prevTodos) => {
            return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
        });
        setNewTodo("");
    };

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    };

    let deleteTodo = (id) => {
        setTodos((prevTodos) => todos.filter((prevTodos) => prevTodos.id !== id));
    };

    let markAllDone = () => {
        setTodos((prevTodos) => (
            prevTodos.map((todo) => ({
                ...todo,
                isDone: true,
            }))
        ));
    };

    let markAsDone = (id) => {
        setTodos((prevTodos) => (
            prevTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isDone: true };
                } else {
                    return todo;
                }
            })
        ));
    };

    return (
        <div className="todo-container">
            <input 
                type="text" 
                placeholder="Add a task" 
                value={newTodo} 
                onChange={updateTodoValue}
                className="todo-input"
            />
            <button onClick={addNewTask} className="todo-button">Add Task</button>
            <hr />
            <h4 className='heading'>Tasks Todo -</h4>
            <ul className="todo-list">
                {
                    todos.map((todo) => (
                        <li key={todo.id} className="todo-item">
                            <span className={todo.isDone ? "todo-done" : ""}>{todo.task}</span>
                            <div>
                                <button onClick={() => deleteTodo(todo.id)} className="todo-button">Delete</button>
                                <button onClick={() => markAsDone(todo.id)} className="todo-button">Mark as Done</button>
                            </div>
                        </li>
                    ))
                }
            </ul>
            <button onClick={markAllDone} className="todo-button">Mark All Done</button>
        </div>
    );
}
