import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Login.css";

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
        console.log(result);
        if (result.status === 200) {
          Swal.fire({
            text: "Login",
            icon: "success",
          }).then((value) => {
            localStorage.setItem("token", result.accessToken);
            navigate("/main_page");
          });
        } else {
          Swal.fire({
            text: "Error",
            icon: "error",
          });
        }
      })
      .catch((error) => console.log("error", error));

    console.log(inputs);
  };

  return (
    <div className="">
      <div className="">
        <Navbar />
        <div className="grid justify-items-center mt-10 ">
          <form onSubmit={handleSubmit} className="bg-white shadow rounded px-8 pt-6 pb-8 mb-4 w-5/12">
            <label className="mt-10">
              <p>เข้าสู้ระบบ</p>
            </label>

            <label>
              username:
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="username"
                value={inputs.username || ""}
                onChange={handleChange}
              />
            </label>

            <label>
              password:
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
                value={inputs.password || ""}
                onChange={handleChange}
              />
            </label>

            <input value="Login" className="mt-10 shadow bg-violet-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
