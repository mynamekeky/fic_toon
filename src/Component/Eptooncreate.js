import "./Eptooncreate.css";
import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import Navbarread from "./Navbarread";
import Navbarcreator from "./Navbarceartor";
import { useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

import FormData from "form-data";

function Eptooncreate() {
  const { id } = useParams();
  const navigate = useNavigate();

  // const [intro, setIntro] = useState("");

  const MySwal = withReactContent(Swal);

  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);

  const [type, setType] = useState([]);

  const [images, setImages] = useState([]);
  const [isDragging, setisDragging] = useState(false);
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [contenttext, setContenttext] = useState("");
  const [status, setStatus] = useState();

  const [workId, setWorkId] = useState();

  const [items, setItems] = useState([]);

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

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

    fetch(`http://127.0.0.1:3500/works/${id}`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result.type);
        setItems(result);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var formdata = new FormData();
    formdata.append("workId", id);
    formdata.append("title", title);
    if (status != null || "" || undefined) {
      console.log(status);
      formdata.append("status", status);
    }
    formdata.append("contentText", contenttext);

    [...images].forEach((file, i) => {
      formdata.append(`pictures[${i}][images]`, file.name);
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:3500/espisodes", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  function selectFiles() {
    fileInputRef.current.click();
  }

  function onFileSelect(event) {
    const files = event.target.files;
    if (fileInputRef.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i],
            url: URL.createObjectURL(files[i]),
          },
        ]);
      }
    }
  }

  function deleteImage(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }

  return (
    <div>
      {user.role === "MEMBER" && <Navbarread />}
      {user.role === "CREATOR" && <Navbarcreator />}
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <div>ชื่อตอน</div>
            <input
              type="text"
              placeholder="title"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          {items.type === "CARTOON" && <div className="card">
            <div className="top">
              <p>Drag & Drop image uploading</p>
            </div>
            <div className="drag-area">
              {isDragging ? (
                <span className="select">Drop Image Here</span>
              ) : (
                <>
                  Drag & Drop image here or{" "}
                  <span className="select" role="button" onClick={selectFiles}>
                    Browse
                  </span>
                </>
              )}

              <input
                name="file"
                type="file"
                className="file"
                multiple
                ref={fileInputRef}
                onChange={onFileSelect}
              ></input>
            </div>
            <div className="container">
              {images.map((images, index) => (
                <div className="image" key={index}>
                  <span className="delete" onClick={() => deleteImage(index)}>
                    &times;
                  </span>
                  <img src={images.url} alt={images.name} />
                </div>
              ))}
            </div>
            <button type="button">Upload</button>
          </div>}

          {items.type === "FICTION" && <div className="flex justify-center pt-8 pb-12">
            <Editor
              apiKey="your-api-key"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue=""
              placeholder="พิมพ์ข้อความ....."
              onChange={(e) => setContenttext(e.level.content)}
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
          </div>}
          

          <div>
            <p className="text-lg font-bold">เผยแพร่</p>
            <input
              type="checkbox"
              id="statusCheckbox"
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

          <div className="flex justify-around gap-7 mt-6 mb-20">
            <button
              type="button"
              className="w-full inline-flex items-center gap-x-2 mt-10 text-lg text-start shadow bg-white hover:bg-purple-400 focus:shadow-outline focus:outline-none text-black font-bold py-2 px-4 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-left-square"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
                />
              </svg>
              ย้อนกลับ
            </button>
            <button
              type="submit"
              className=" w-full inline-flex items-center gap-x-2 mt-10 text-lg text-start shadow bg-violet-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-save"
                viewBox="0 0 16 16"
              >
                <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1z" />
              </svg>
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Eptooncreate;
