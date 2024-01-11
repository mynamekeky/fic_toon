import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbarread from "./Navbarread";
import Navbarcreator from "./Navbarceartor";
import Storypage from "./Storypage";

function Workpage() {
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    UserGet()
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
  }

  const UserUpdate = (id) => {
    window.location = '/storyupdate/' + id
  }

  const UserDelete = (id) => {
    const token = localStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var raw = "";

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://127.0.0.1:3500/works/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          Swal.fire({
            text: "success",
            icon: "success",
          });
          UserGet()
        }
      })
      .catch((error) => console.log("error", error));
  };

  const Storypage = id =>{
    window.location = '/storypage/' + id
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const create = () => {
    navigate("/createpage");
  };

  //   useEffect(() => {
  //     fetch("http://127.0.0.1:3500/works/findAllByUser", requestOptions)
  //       .then((res) => res.json())
  //       .then((result) => {
  //         console.log(result);
  //         setItems(result);
  //       });
  //   }, []);

  return (
    <div>
      {user.role === "MEMBER" && <Navbarread />}
      {user.role === "CREATOR" && <Navbarcreator />}
      <div className="w-9/12 m-auto">
        <div class="flex flex-wrap sm:justify-start sm:flex-nowrap  bg-white text-sm py-4 dark:bg-gray-800 mb-8 border rounded-lg">
          <div
            class="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between"
            aria-label="Global"
          >
            <p class="sm:order-1 flex-none text-xl font-semibold dark:text-white">
              ผลงานทั้งหมด
            </p>
            <div class="sm:order-3 flex items-center gap-x-2">
              <button
                onClick={create}
                type="button"
                class="py-2 px-3 inline-flex items-center gap-x-2 text-lg font-bold rounded-lg border border-gray-200 bg-pass text-white shadow-sm hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                เพิ่มผลงาน
              </button>
            </div>
          </div>
        </div>

        <div class="flex flex-col ">
          <div class="-m-1.5 overflow-x-auto">
            <div class="p-1.5 min-w-full inline-block align-middle">
              <div class="border rounded-lg overflow-hidden dark:border-gray-700">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        class="px-6 py-3 text-start text-xl font-bold text-gray-500 uppercase"
                      >
                        รูปภาพ
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-start text-xl font-bold text-gray-500 uppercase"
                      >
                        ชื่อเรื่อง
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase"
                      >
                        ประเภท
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase"
                      >
                        สถานะ
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase"
                      >
                        ตอน
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase"
                      >
                        แก้ไขรายละเอียด
                      </th>
                      <th
                        scope="col"
                        class="px-6 py-3 text-center text-xl font-bold text-gray-500 uppercase"
                      >
                        ลบผลงาน
                      </th>
                    </tr>
                  </thead>

                  <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white">
                    {items.map((row) => (
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-gray-800 dark:text-gray-200">
                          <img
                            onClick={() => Storypage(row.id)}
                            src={`../img/work/` + row.picture}
                            width={75}
                            height={100}
                          ></img>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap text-2xl font-bold text-gray-800 dark:text-gray-200">
                          {row.title}
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap text-center text-gray-800 dark:text-gray-200">
                          <div class="px-6 py-3">
                            <span class="py-1 px-1.5 inline-flex items-center gap-x-1 text-base font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                              <svg
                                class="w-2.5 h-2.5"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                              </svg>
                              {row.type}
                            </span>
                          </div>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap text-center  text-gray-800 dark:text-gray-200">
                          <div class="px-6 py-3">
                            <span class="py-1 px-1.5 inline-flex items-center gap-x-1 text-base font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                              <svg
                                class="w-2.5 h-2.5"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                              </svg>
                              {row.status}
                            </span>
                          </div>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <button
                            type="button"
                            class="w-24 py-3 px-4 inline-box items-center gap-x-2 text-lg font-bold rounded-lg border border-transparent bg-pass text-white hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            รายการ
                          </button>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <button
                            onClick={() => UserUpdate(row.id)}
                            type="button"
                            class="w-24 py-3 px-4 inline-box items-center gap-x-2 text-lg font-bold rounded-lg border border-transparent bg-warning text-white hover:bg-yellow-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            แก้ไข
                          </button>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <button
                            onClick={() => UserDelete(row.id)}
                            type="button"
                            class="w-24 py-3 px-4 inline-box items-center gap-x-2 text-lg font-bold rounded-lg border border-transparent bg-danger text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            ลบ
                          </button>
                        </td>
                      </tr>
                    ))}
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

export default Workpage;
