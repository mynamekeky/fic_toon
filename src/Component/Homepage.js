import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

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
            <Navbar />
        </div>
    )
}

export default Homepage;