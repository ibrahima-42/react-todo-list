import React, { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom';

const Login =() => {
    const[username ,setUsername]= useState("");
    const[password ,setPassword]= useState("");

    const navigate = useNavigate();

    useEffect(() => {
    
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(`formulaire soumis`);
        console.log(`Username :${username}`);
        if (username === "" || password === "") {
        alert(`le champ doit etre rempli`);
        } else {
            let newUser = { username , password };
            fetch("",{
                method : "POST",
                body : JSON.stringify(newUser),
                headers : {"content-type" : "apllication/json"}
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(`fetched data`, data)
                console.log(data.message)
                if(data.message != undefined){
                    alert(data.message)
                }else{
                    console.log(data.accessToken)
                    localStorage.setItem("token",data.accessToken)
                }
            })
            .catch((error) => {
            console.error("Error fetching data:", error);
            });
        // if(username === "admin" && password === "passer"){
        //     navigate("/Todo_List")
        // }
        // else {
        //     alert(`username or password incorrecte`)
        // }
        }
    }
    
    return (
    <div>
        <form id='connect' onSubmit={handleSubmit}>
            <h1 id='log'>login</h1>
            <input className='champs' type="text" placeholder='login' onChange={(e) => setUsername(e.target.value)} />
            <input className='champs' type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
            <button id='sub' type='submit'>Se connecter </button>
            <p id='info-connect'>connecter vous pour avoir accée au taches</p>
        </form>
    </div>
)
}

export default Login
