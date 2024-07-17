// import { Routes, Route } from "react-router-dom";
import { Routes, Route, useParams, useNavigate, Link } from "react-router-dom";
import Login from "./login";
import Taches from "./tache";




function App() {
    return (
    <>
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/Todo_List" element={<Taches/>} />
        </Routes>
    </>
    )
}

export default App
