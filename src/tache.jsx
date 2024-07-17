import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import { Route, Routes, json } from "react-router-dom";

const Taches = () => {
    const [todos, setTodos] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [input, setInput] = useState("");
    const [completedCompteur, setCompletedCompteur] = useState(0);


    useEffect(() => {
        console.log("##### Récupération des données...");
        fetch("http://localhost:8080/api/v1/todos",{headers:{"Authorization":"Bearer " + localStorage.getItem("token")}})
        .then((response) => response.json())
        .then((data) => {
            console.log("Fetched data:", data); // Log the fetched data
            if (
            data.data &&
            data.message &&
            data.data.items &&
            Array.isArray(data.data.items)
            ) {
            setTodos(data.data.items, data.data.message);
            } else {
            console.error("Fetched data does not contain items array:", data);
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, []);

    function ajout() {
        if (showForm === false) {
        setShowForm(true);
        } else {
        setShowForm(false);
        }
    }

    function randomId() {
        return Date.now();
    }

    function handleAdd(e) {
        e.preventDefault();
        console.log(`formulaire soumis`);
        console.log(`Input :${input}`);
        if (input === "") {
        alert(`le champ doit etre rempli`);
        } else {
        let newTodo = { name: input, completed: false };
        fetch("http://localhost:8080/api/v1/todos/save", {
            method: "POST",
            body: JSON.stringify(newTodo),
            headers: { "content-type": "application/json","Authorization":"Bearer " + localStorage.getItem("token") },
        })
            .then((response) => response.json())
            .then((data) => {
            console.log("Fetched data:", data); // Log the fetched data
            setTodos((todos) => [...todos, newTodo]);
            })
            .catch((error) => {
            console.error("Error fetching data:", error);
            });
        //spread operator
        setInput("");
        }
    }

    const tacheCompleted = () => {
        const find = todos.filter((todo) => todo.id === todo.completed);
        setTodos(find);
    };

    const tacheNumber = () => {
        return todos.filter((todo) => todo.completed).length;
    };

    function handleDeleteTodo(id) {
        if (window.confirm(`veuillez confirmer la suppression`)) {
        fetch("http://localhost:8080/api/v1/todos/delete/" + id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json","Authorization":"Bearer " + localStorage.getItem("token") },
        })
            .then((response) => response.json())
            .then((data) => {
            console.log("Fetched data:", data); // Log the fetched data
            setTodos((todos) => todos.filter((todo) => todo.id !== id));
            })
            .catch((error) => {
            console.error("Error fetching data:", error);
            });
        }
    }
    
    const handleCompleteTodo = (id) => {
        setTodos((todos) =>
        todos.map((todo) => {
            if (todo.id === id) {
            const updatedTodo = { ...todo, completed: !todo.completed };
            fetch("http://localhost:8080/api/v1/todos/save", {
                method: "POST",
                body: JSON.stringify(updatedTodo),
                headers: { "Content-Type": "application/json","Authorization":"Bearer " + localStorage.getItem("token") },
            })
                .then((response) => response.json())
                .then((data) => {
                console.log("Fetched data:", data);
                })
                .catch((error) => {
                console.error("Error fetching data:", error);
                });
            return updatedTodo;
            } else {
            return todo;
            }
        })
        );
    };

    return (
        <>
        <div id="page">
            <div id="box">
            <img id="img" src="src/assets/clipboard_.png" alt="img" />
            <div id="title">TodoList</div>
            <div id="subtitle">25 Mai</div>
            <TodoList
                allTodo={todos}
                handleDeleteTodo={handleDeleteTodo}
                handleCompleteTodo={handleCompleteTodo}
                tacheNumber={tacheNumber}
                tacheCompleted={tacheCompleted}
            ></TodoList>
            <div id="toggleAdd" onClick={ajout}>
                {showForm ? "cacher" : " afficher"} le formulaire
            </div>
            {showForm && (
                <form id="add-box" onSubmit={handleAdd}>
                <input
                    className="input"
                    type="text"
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="button" type="submit">
                    Ajouter
                </button>
                </form>
            )}
            <div></div>
            </div>
        </div>
        </>
    );
};

export default Taches;
