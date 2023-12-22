import { useNavigate } from "react-router-dom";

function Homepage(){
    const navigate = useNavigate();

    const login = () => {
        navigate('/login')
    }
    return(
        <div>
            <h1>หน้าแรกสุด</h1>
            <button onClick={login}>login</button>
        </div>
    )
}

export default Homepage;