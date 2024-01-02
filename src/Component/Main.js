import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Navbarread from "./Navbarread";
import { Dropdown } from "flowbite-react";
import Navbarcreator from "./Navbarceartor";

function Main_page() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);
  const params = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:3500/auth/getProfile", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          setUser(result.user);
          setIsLoaded(false);
        } else if (result.message === "Unauthorized") {
          Swal.fire({
            text: "กรุณา Login",
            icon: "error",
          }).then((value) => {
            navigate("/login");
          });
        }
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      {user.role === "MEMBER" && <Navbarread />}
      {user.role === "CREATOR" && <Navbarcreator />}
      <div>
      </div>
    </div>
  );
}

export default Main_page;
