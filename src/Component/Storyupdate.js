import { useState, useEffect } from "react";
import { Dropdown } from "flowbite-react";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import Navbarread from "./Navbarread";
import Navbarcreator from "./Navbarceartor";
import { useParams } from "react-router-dom";

function Storyupdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [story, setStory] = useState({}); // State for story data

  const MySwal = withReactContent(Swal);

  const [title, setTitle] = useState("");
  const [file, setFile] = useState({ preview: "", data: "" });
  const [tagline, setTagline] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [intro, setIntro] = useState("");
  const [status, setStatus] = useState(""); // Set status to an initial value

  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);
  
    fetch(`http://127.0.0.1:3500/works/${id}`, {
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((storyData) => {
        setStory(storyData);
      })
      .catch((error) => console.log("error", error));
  }, [id]);
  

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    const raw = JSON.stringify({
      id, // Include the story ID in the request
      title,
      picture: file.data, // Use the selected file data
      tagline,
      type,
      category,
      intro,
      status,
    });

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://127.0.0.1:3500/works/${id}`, requestOptions) // Use dynamic ID in URL
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        // Handle successful update (e.g., show success message, redirect)
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      {user.role === "MEMBER" && <Navbarread />}
      {user.role === "CREATOR" && <Navbarcreator />}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="file">Picture</label>
          <input
            type="file"
            id="file"
            name="file"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tagline">Tagline</label>
          <input
            type="text"
            id="tagline"
            name="tagline"
            className="form-control"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            className="form-control"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="CARTOON">CARTOON</option>
            <option value="FICTION">FICTION</option>

          </select>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
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
        </div>

        <div className="form-group">
          <label htmlFor="intro">Intro</label>
          <textarea
            id="intro"
            name="intro"
            className="form-control"
            rows="5"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            className="form-control"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="hidden">Hidden</option>
            <option value="public">Published</option>
          </select>
        </div>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Storyupdate;
