import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbarcreator from "./Navbarceartor";
import Navbarread from "./Navbarread";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./Storypage.css"
import Navbar from "./Navbar";

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
      {!user.role && <Navbar />}
      {user.role === "MEMBER" && <Navbarread />}
      {user.role === "CREATOR" && <Navbarcreator />}
      <div className="w-5/12 m-auto container mx-auto border rounded-lg bg-white px-12 py-12 mb-32">
        <div className="">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-start-1 col-end-6 justify-items-center">
              <img
                src={`../img/work/` + story.picture}
                width={224}
                height={299}
                className="border rounded-lg w-full mb-4  h-72"
              ></img>

              <label>
                <p className="text-xl font-bold border rounded-lg px-4 py-3 text-center">{user.name}</p>
              </label>
            </div>

            <div className="col-start-6 col-end-13">
              <label >
                <div className="mb-4">
                  <p className="text-lg font-bold">ชื่อเรื่อง</p>
                  <p className="border rounded-lg px-4 py-3">{story.title}</p>
                </div>
                
              </label>

              <label>
              <div className="mb-4">
                <p className="text-lg font-bold">คำโปรย</p>
                <p className="border rounded-lg px-4 py-3 h-24">
                  {story.tagline}
                </p>
                </div>
              </label>

              <label>
              <div className="mb-4">
                <p className="text-lg font-bold">หมวดหมู่</p>
                <p className="border rounded-lg px-4 py-3">{story.category}</p>
                </div>
              </label>

              <label className="grid grid-flow-col justify-stretch">
                <div className="text-lg font-bold ">
                  ประเภท
                </div>
                <div className="text-lg font-bold">
                  {story.type}
                </div>
              </label>
            </div>
          </div>

          <hr class="h-px mb-8 mt-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

          <div>
            <label>
              <p className="text-2xl font-bold">แนะนำเรื่อง</p>
              <div className="border rounded-lg px-4 py-3.5 h-60" dangerouslySetInnerHTML={{__html: story.intro}}></div>
              {/* <p className="border rounded-lg px-4 py-3.5 h-60">{story.intro}</p> */}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Storypage;
