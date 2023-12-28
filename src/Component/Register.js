import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Navbar from "./Navbar";

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

    if (inputs.password !== inputs.passwordConfirm) {
      Swal.fire({
        text: "รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง",
        icon: "error",
      });
      return;
    }

    

    const requiredFields = ["name", "username", "password", "passwordConfirm", "email", "role"];
    const areAllRequiredFieldsFilled = requiredFields.every(
      (field) => !!inputs[field] && inputs[field].trim() !== ""
    );

    if (!areAllRequiredFieldsFilled) {
      Swal.fire({
        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
        icon: "warning",
      });
      return;
    }

    const thaiCharacters = /[\u0E00-\u0E7F]/;

    if (thaiCharacters.test(inputs.password)) {
      Swal.fire({
        text: "ห้ามกรอกภาษาไทยในช่องรหัสผ่าน",
        icon: "error",
      });
      return;
    }

    if (thaiCharacters.test(inputs.passwordConfirm)) {
      Swal.fire({
        text: "ห้ามกรอกภาษาไทยในช่องยืนยันรหัสผ่าน",
        icon: "error",
      });
      return;
    }

    if (inputs.password.length < 8) {
      Swal.fire({
        text: "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว",
        icon: "error",
      });
      return;
    }

    if (inputs.username.length < 4) {
      Swal.fire({
        text: "ชื่อผู้ใช้ต้องมีความยาวอย่างน้อย 4 ตัว",
        icon: "error",
      });
      return;
    }

    requiredFields.forEach((field) => {
      if (
        (field === "username" || field === "password") &&
        thaiCharacters.test(inputs[field])
      ) {
        Swal.fire({
          text: `ห้ามกรอกภาษาไทยในช่อง "${field}"`,
          icon: "error",
        });
        return;
      }
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      name: inputs.name,
      username: inputs.username,
      password: inputs.password,
      passwordConfirm: inputs.passwordConfirm,
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
        }else {
          Swal.fire({
            text: "กรุณากรอกข้อมูล",
            icon: "error",
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  
  return (
    <div>
      <Navbar />
      <div className="grid justify-items-center mt-10 ">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded px-8 pt-6 pb-8 mb-4 w-5/12"
        >
          <label className="mt-10">
            <p>สมัครสมาชิก</p>
          </label>

          <label>
            นามปากกา
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="name"
              value={inputs.name || ""}
              onChange={handleChange}
              
            />
          </label>

          <label>
            ชื่อผู้ใช้
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="username"
              value={inputs.username || ""}
              onChange={handleChange}
              
              pattern="^[a-zA-Z0-9_]+$"      
            />
          </label>

          <label>
            รหัสผ่าน
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              value={inputs.password || ""}
              onChange={handleChange}
              
              pattern="^[a-zA-Z0-9_.!@#$%^&*()+-=]+$" 
            />
          </label>

          <label>
            ยืนยันรหัสผ่าน
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="passwordConfirm"
              value={inputs.passwordConfirm || ""}
              onChange={handleChange}
              
            />
          </label>

          <label>
            อีเมล
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              name="email"
              value={inputs.email || ""}
              onChange={handleChange}
              
              pattern="^[a-zA-Z0-9.@_%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$"
            />
          </label>

          <label>
            <p>บทบาท</p>
            <div className="flex gap-10">
              <input
              type="radio"
              name="role"
              value="MEMBER"
              id="member"
              defaultChecked={inputs.role === "MEMBER"}
              onChange={handleChange}
            />
            <label htmlFor="member">นักอ่าน (Reader)</label>
            <input
              type="radio"
              name="role"
              value="CREATOR"
              id="creator"
              defaultChecked={inputs.role === "CREATOR"}
              onChange={handleChange}
            />
            <label htmlFor="creator">นักสร้างสรรค์ (Creator)</label>
            </div>
            
          </label>

          <input
            type="submit"
            className="mt-10 shadow bg-violet-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-full"
          />
        </form>
      </div>
    </div>
  );
}

export default Register;
