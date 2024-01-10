import "./Createpage.css";
import { useState, useEffect } from "react";
import { Dropdown } from "flowbite-react";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import Navbarread from "./Navbarread";
import Navbarcreator from "./Navbarceartor";

function Createpage() {
  const navigate = useNavigate();

  const MySwal = withReactContent(Swal);

  const [title, setTitle] = useState("");
  const [file, setFile] = useState({ preview: "", data: "" });
  const [tagline, setTagline] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [intro, setIntro] = useState("");
  const [status, setStatus] = useState();

  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);

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
      })
      .catch((error) => console.log("error", error));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);
    var formdata = new FormData();
    formdata.append("file", file.data);
    formdata.append("title", title);
    if (status != null || "" || undefined) {
      formdata.append("status", status);
    }
    formdata.append("intro", intro);
    formdata.append("tagline", tagline);
    formdata.append("category", category);
    formdata.append("type", type);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    // navigate("/workpage");

    // fetch("http://127.0.0.1:3500/works", requestOptions)
    //   .then((response) => response.json())
    // .then((result) => {
    //   if (result.status === 200) {
    //     navigate("/workpage");
    //   }
    //   }).catch((error) => console.log("error", error));

    fetch("http://127.0.0.1:3500/works", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          Swal.fire({
            text: "success",
            icon: "success",
          }).then((window.location.href = "/workpage"));
        } else {
          Swal.fire({
            text: "error",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleFile = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setFile(img);
  };

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <div>
      {user.role === "MEMBER" && <Navbarread />}
      {user.role === "CREATOR" && <Navbarcreator />}

      <form onSubmit={handleSubmit}>
        <div className="w-9/12 m-auto bg-white">
          {file.preview && (
            <img src={file.preview} width="100" height="100"></img>
          )}
          <input type="file" name="file" onChange={handleFile} />

          <div>
            <label
              for="with-corner-hint"
              class="block text-sm font-medium mb-2 dark:text-white"
            >
              ชื่อเรื่อง
              <input
                type="text"
                id="with-corner-hint"
                class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="title"
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </label>

            <label
              for="with-corner-hint"
              class="block text-sm font-medium mb-2 dark:text-white"
            >
              คำโปรย
              <input
                type="text"
                id="with-corner-hint"
                class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="tagline"
                onChange={(e) => setTagline(e.target.value)}
              ></input>
            </label>
          </div>

          <div className="flex">
            <label className="">
              <p className="my-3 text-lg font-bold">ประเภท</p>

              <div className="flex gap-6">
                <input
                  className="accent-primary "
                  type="radio"
                  name="type"
                  value="FICTION"
                  id="fiction"
                  onChange={(e) => setType(e.target.value)}
                />
                <label htmlFor="fiction" className="font-bold text-lg">
                  นวนิยาย
                </label>

                <input
                  className="accent-primary font-bold text-lg"
                  type="radio"
                  name="type"
                  value="CARTOON"
                  id="cartoon"
                  onChange={(e) => setType(e.target.value)}
                />
                <label htmlFor="cartoon" className="font-bold text-lg">
                  การ์ตูน
                </label>
              </div>
            </label>

            <label
              for="countries"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              หมวดหมู่
              <select
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>เลือกหมวดหมู่</option>
                <option value="Love">ความรัก</option>
                <option value="Comedy">ตลก</option>
                <option value="Horror">สยองขวัญ</option>
                <option value="Secret">สืบสวนสอบสวน</option>
              </select>
            </label>
          </div>

          <div className="flex justify-center">
            <Editor
              apiKey="your-api-key"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue=""
              placeholder="พิมพ์ข้อความ....."
              onChange={(e) => setIntro(e.level.content)}
              init={{
                height: 288,
                width: 944,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </div>

          <div>
            <p>เผยแพร่</p>
            <input
              type="checkbox"
              id="hs-basic-usage"
              class="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600
            before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"
              value="hidden"
              onChange={(e) => {
                if (e.target.checked) {
                  e.target.value = "public"; // Set value to 'public' when checked
                  setStatus(e.target.value);
                } else {
                  e.target.value = "hidden"; // Set value to 'public' when checked
                  setStatus(e.target.value);
                }
              }}
            />
            <label for="hs-basic-usage" class="sr-only">
              เผยแพร่{" "}
            </label>
          </div>
        </div>

        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default Createpage;
