import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbarcreator from "./Navbarceartor";
import Navbarread from "./Navbarread";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Storypage() {
  // Accepting `id` as a prop
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);
  const [story, setStory] = useState({}); // State for story data

  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    // alert(id);
  }, {});

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

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = new Headers({
          Authorization: `Bearer ${token}`,
        });

        const response = await fetch(`http://127.0.0.1:3500/works/${id}`, {
          method: "GET",
          headers,
        });

        const result = await response.json();
        setStory(result);
      } catch (error) {
        console.error("Error fetching story:", error);
        // Handle error gracefully
      }
    };

    fetchStory();
  }, [id]);

  return (
    <div>
      {user.role === "MEMBER" && <Navbarread />}
      {user.role === "CREATOR" && <Navbarcreator />}

      <img src={`../img/work/` + story.picture} width={75} height={100}></img>

      <label>
        ชื่อผู้แต่ง
        <p>{story.user}</p>
      </label>

      <label>
        ชื่อเรื่อง
        <p>{story.title}</p>
      </label>

      <label>
        คำโปรย
        <p>{story.tagline}</p>
      </label>

      <label>
        หมวดหมู่
        <p>{story.category}</p>
      </label>

      <label>
        ประเภท
        <p>{story.type}</p>
      </label>

      <label>
        แนะนำเรื่อง
        <p>{story.intro}</p>
      </label>
    </div>
  );
}

export default Storypage;
