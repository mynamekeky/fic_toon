import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const login = () => {
    navigate("/Login");
  };

  const register = () => {
    navigate("/Register");
  };

  return (
    <header className="bg-white shadow-md py-5 px-5" >
      <nav className="grid grid-cols-3">
        <div className="">
            <img src="/img/logo/fictoon_logo.jpg" width={90} height={30}></img>
        </div>
        <div className="">
          <ul className="grid grid-cols-4 gap-x-0 justify-items-center">
            <li>
                <a className="text-xl">หน้าหลัก</a>
            </li>
            <li>
                <a className="text-xl">การ์ตูน</a>
            </li>
            <li>
                <a className="text-xl">นิยาย</a>
            </li>
            <li>
                <a className="text-xl">ตัวละคร</a>
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-4 justify-items-center">
            <div className="col-end-3">
                <button onClick={register}>สมัครสมาชิก</button>
            </div>

            <div className="col-end-4 ">
                <button onClick={login}>เข้าสู่ระบบ</button>
            </div>
          
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
