import Character from "./Character";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import { Dropdown } from "flowbite-react";
import Navbarcreator from "../Navbarceartor";
import Navbarread from "../Navbarread";
import Navbar from "../Navbar";
import Charactermain from "./Charactermain";

function Characterpage() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);
  const params = useParams();
  const [items, setItems] = useState([]);
  const perPage = undefined;

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
        }
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div>
      {!user.role && <Navbar />}
      {user.role === "MEMBER" && <Navbarread />}
      {user.role === "CREATOR" && <Navbarcreator />}

      <div className="w-5/12 m-auto container mx-auto  px-12 py-12 mb-32">
        <div className="border rounded-xl p-4 mb-6 flex justify-between bg-primary text-white">
          <div className="py-1 px-3 inline-flex items-center gap-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-file-image"
              viewBox="0 0 16 16"
            >
              <path d="M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
              <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12z" />
            </svg>
            <div className="text-xl font-bold ">ตัวละคร</div>
          </div>
        </div>

        <Charactermain data={perPage} />
      </div>
    </div>
  );
}

export default Characterpage;
