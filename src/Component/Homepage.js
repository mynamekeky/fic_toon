import { useNavigate } from "react-router-dom";

function Homepage(){
    const navigate = useNavigate();

    const login = () => {
        navigate('/login')
    }

    const register = () => {
        navigate('/Register')
    }

    return(
        <div>
            <h1>หน้าแรกสุด</h1>
            <button onClick={login}>login</button>
            <button onClick={register}>Register</button>
        </div>
    )
}

export default Homepage;