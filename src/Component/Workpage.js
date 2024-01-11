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

  const UserUpdate = (id) => {
    window.location = "/storyupdate/" + id;
  };

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

    // Add a conditional statement before sending the DELETE request
    Swal.fire({
      title: "ยืนยันการลบข้อมูลหรือไม่",
      text: "หากคุณยืนยัน ข้อมูลทั้งถูกจะถูกลบ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      // Proceed with deletion only if confirmed
      if (result.isConfirmed) {
        fetch(`http://127.0.0.1:3500/works/${id}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            if (result.status === 200) {
              Swal.fire({
                title: "ลบข้อมูลเสร็จสิ้น!",
                text: "ผลงานถูกลบเรียบร้อย",
                icon: "success",
              });
              UserGet();
            }
          })
          .catch((error) => console.log("error", error));
      }
    });
  };

  const Storypage = (id) => {
    window.location = "/storypage/" + id;
  };

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
            class="max-w-[85rem] w-full mx-auto  flex flex-wrap basis-full items-center justify-between"
            aria-label="Global"
          >
            <p class="sm:order-1 inline-flex items-center gap-x-2 flex-none text-xl font-semibold dark:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-file-richtext"
                viewBox="0 0 16 16"
              >
                <path d="M7 4.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V7.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V7s1.54-1.274 1.639-1.208M5 9a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1z" />
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
              </svg>
              ผลงานทั้งหมด
            </p>
            <div class="sm:order-3 flex items-center gap-x-2">
              <button
                onClick={create}
                type="button"
                class="py-2 px-3 inline-flex items-center gap-x-2 text-lg font-bold rounded-lg border border-gray-200 bg-pass text-white shadow-sm hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                  />
                </svg>
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
                            class="w-24 py-3 px-4 inline-flex items-center gap-x-2 text-lg font-bold rounded-lg border border-gray-200 bg-warning text-white shadow-sm hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-pen"
                              viewBox="0 0 16 16"
                            >
                              <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                            </svg>
                            แก้ไข
                          </button>
                        </td>

                        <td class="px-6 py-4 whitespace-nowrap  text-center text-sm font-medium">
                          <button
                            onClick={() => UserDelete(row.id)}
                            type="button"
                            class="w-24 py-3 px-4 inline-flex items-center gap-x-2 text-lg font-bold rounded-lg border border-gray-200 bg-danger text-white shadow-sm hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-trash3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                            </svg>
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
