import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  const [inputs, setInputs] = useState({});
  const cors = require("cors");

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: inputs.username,
      password: inputs.password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:3500/auth/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result.status === 200){
            Swal.fire({
                text: "Login",
                icon: "success"
              }).then((value) => {
                localStorage.setItem('token', result.accessToken)
                navigate('/main_page')
              })
        }else{
            Swal.fire({
                text: "Error",
                icon: "error"
              })
        }
    })
      .catch((error) => console.log("error", error));

    console.log(inputs);
  };

  return (
    <div>
      <div>Login</div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            username:
            <input
              type="text"
              name="username"
              value={inputs.username || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            password:
            <input
              type="password"
              name="password"
              value={inputs.password || ""}
              onChange={handleChange}
            />
          </label>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Login;
