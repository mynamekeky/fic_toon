import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Register() {
  const [inputs, setInputs] = useState({});
  const [role, setRole] = useState({});

  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: inputs.name,
      username: inputs.username,
      password: inputs.password,
      email: inputs.email,
      role: inputs.role,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:3500/users/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result) {
          Swal.fire({
            text: "Register Success",
            icon: "success",
          }).then((value) => {
            navigate("/login");
          });
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
          />
        </label>

        <label>
          Username:
          <input
            type="text"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />
        </label>

        <label>
          Eamil:
          <input
            type="email"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
          />
        </label>

        <label>
          Role:
          <select
            value={inputs.role}
            defaultValue={"MEMBER"}
            name="role"
            onChange={handleChange}
          >
            <option value="MEMBER">MEMBER</option>
            <option value="CREATOR">CREATOR</option>
          </select>
        </label>

        <input type="submit" />
      </form>
    </div>
  );
}

export default Register;
