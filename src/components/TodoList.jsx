import React from "react";
import Todo from "./Todo";

function TodoList({ allTodo, handleDeleteTodo, handleCompleteTodo,tacheNumber,tacheCompleted }) {
    return (
        <>
                {/* <button><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg></button> */}
                <p>Nombre de taches completed :{tacheNumber()} </p>
                {/* <button onClick={tacheCompleted}>tache completed</button> */}
        {allTodo.length === 0 ? (
            "aucune tache disponible"
        ) : (
            <ul id="todoList">
            {allTodo.map((todo) => (
                <Todo
                key={todo.id}
                name={todo.name}
                id={todo.id}
                complete={todo.completed}
                handleDeleteTodo={handleDeleteTodo}
                handleCompleteTodo={handleCompleteTodo}
                tacheNumber={tacheNumber}
                tacheCompleted={tacheCompleted}
                ></Todo>
            ))}
            </ul>
        )}
        </>
    );
}

export default TodoList;
