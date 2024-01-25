import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbarread from "./Navbarread";
import Navbarcreator from "./Navbarceartor";

function Episode() {

  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    UserGet();
  }, []);

  const UserGet = () => {
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

    fetch("http://127.0.0.1:3500/works/findAllByUser", requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setItems(result);
      });
  };


    const Epfic = () =>{
        navigate("/episodefiction");
    }

    const Eptoon = () =>{
        navigate("/episodecartoon");
    }
    
  return (
    <div>
      {user.role === "MEMBER" && <Navbarread />}
      {user.role === "CREATOR" && <Navbarcreator />}
      <div>ตอนทั้งหมด</div>

      <div>
        <div class="flex flex-col">
          <div class="-m-1.5 overflow-x-auto">
            <div class="p-1.5 min-w-full inline-block align-middle">
              <div class="border rounded-lg shadow overflow-hidden dark:border-gray-700 dark:shadow-gray-900">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">

                  <thead class="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-start w-20 text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                        ตอนที่
                      </th>

                      <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                        ชืื่อตอน
                      </th>
                    </tr>
                  </thead>

                  <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td onClick={Eptoon} class="cursor-pointer px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      1
                      </td>

                      <td onClick={Eptoon} class="cursor-pointer px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      นัดรัก
                      </td>
                    </tr>

                    <tr>
                        
                      <td onClick={Eptoon} class="cursor-pointer px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                        1
                      </td>
                      

                      <td onClick={Eptoon} class="cursor-pointer px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        นัดรัก
                      </td>
                    </tr>
                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Episode;
