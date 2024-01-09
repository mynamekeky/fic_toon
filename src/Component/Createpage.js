import "./Createpage.css";
import { useState, useEffect } from "react";
import { Dropdown } from "flowbite-react";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { hasFormSubmit } from "@testing-library/user-event/dist/utils";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

function Createpage() {

  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);



  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      fname: fname,
      lname: lname,
      username: username,
      email: email,
      avatar: avatar,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://www.melivecode.com/api/users/create", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result['status'] === 'ok') {
          Swal.fire({
            text: "success",
            icon: "success",
          })
          navigate("/workpage");
        } 
      })

      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <div className="w-9/12 m-auto bg-white">
        {imageURLs.map((imageSrc, idx) => (
          <img key={idx} width="224" height="299" src={imageSrc} />
        ))}
        <input type="file" multiple accept="image/*" onChange={onImageChange} />

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
              placeholder=""
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
              placeholder=""
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
                value="MEMBER"
                id="member"
                defaultChecked={"MEMBER"}
              />
              <label htmlFor="member" className="font-bold text-lg">
                นวนิยาย
              </label>

              <input
                className="accent-primary font-bold text-lg"
                type="radio"
                name="type"
                value="CREATOR"
                id="creator"
                defaultChecked={"CREATOR"}
              />
              <label htmlFor="creator" className="font-bold text-lg">
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
            >
              <option selected>เลือกหมวดหมู่</option>
              <option value="US">ความรัก</option>
              <option value="CA">ดราม่า</option>
              <option value="FR">ตลก</option>
              <option value="DE">สยองขวัญ</option>
            </select>
          </label>
        </div>

        <div className="flex justify-center">
          <Editor
            apiKey="your-api-key"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue=""
            placeholder="พิมพ์ข้อความ....."
            init={{
              height: 288,
              width:944,
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
          />
          <label for="hs-basic-usage" class="sr-only">
            เผยแพร่{" "}
          </label>
        </div>
      </div> */}

      <input
        type="text"
        placeholder="fname"
        onChange={(e) => setFname(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="lname"
        onChange={(e) => setLname(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="avatar"
        onChange={(e) => setAvatar(e.target.value)}
      ></input>

      <button type="submit">submit</button>
    </form>
  );
}

export default Createpage;
