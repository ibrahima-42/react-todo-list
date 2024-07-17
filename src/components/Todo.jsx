import React from "react";


function Todo({name,id,complete,handleDeleteTodo,handleCompleteTodo}) {
    let compteur=0;
    return(
        <>
        <li id="ligne">
            {/* <div id="box-todo"></div> */}
            <div  id="title" className={complete ? "line-through" : ""}>
            {name}
            </div>
            <div id="completed-box" onClick={() => handleCompleteTodo(id)}>
                {complete && <div id="dot-blue"></div>}
            </div>
            <button id="delete" onClick={()=> handleDeleteTodo(id)}>Supprimer</button>
        </li>
        </>
        

    )
}

export default Todo;
