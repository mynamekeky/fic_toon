import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Character(id) {
  const MySwal = withReactContent(Swal);
  const [characterId, setCharacterId] = useState();
  const [file, setFile] = useState({ preview: "", data: "" });
  const [roleAs, setRoleAs] = useState("");
  const [name, setName] = useState();
  const [title, setTitle] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    fetch(`http://127.0.0.1:3500/works/${id.data}`, {
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((storyData) => {
        storyData.characters.map((item) => {
          setCharacterId(item.id);
          setFile({ data: item.picture });
          setName(item.name);
          setRoleAs(item.roleAs);
        });
        setTitle(storyData.title)
        setType(storyData.type)
      })
      .catch((error) => console.log("error", error));

      console.log(roleAs)
      console.log(name)
      console.log(file)
  }, [id]);

  const donate = () => {
    Swal.fire({
      title: "สนับสนุนตัวละครนี้",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Look up",
      showLoaderOnConfirm: true,
      preConfirm: async (login) => {
        try {
          const githubUrl = `
                  https://api.github.com/users/${login}
                `;
          const response = await fetch(githubUrl);
          if (!response.ok) {
            return Swal.showValidationMessage(`
                    ${JSON.stringify(await response.json())}
                  `);
          }
          return response.json();
        } catch (error) {
          Swal.showValidationMessage(`
                  Request failed: ${error}
                `);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url,
        });
      }
    });
  };
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="border rounded-lg pt-3 pb-6 px-5 shadow-sm">
        <div className="flex justify-between text-center font-bold">
          <div>
            <p className="text-2xl">{roleAs}</p>
          </div>

          <div>
            <p className="text-base text-white bg-sec py-0.5 px-2 rounded-xl">
              {type}
            </p>
          </div>
        </div>

        <div className="flex justify-center py-3">
          <img
             src={`../img/work/` + file.data}
            className="w-44 h-48 border rounded-lg"
          ></img>
        </div>

        <div className="font-bold">
          <div className="text-center">
            <p className="text-3xl">{name}</p>
            <p className="text-sm mb-2">{title}</p>
            <p
              onClick={donate}
              className="text-lg text-warning border border-warning rounded-xl w-full py-0.5 px-6 cursor-pointer"
            >
              สนับสนุน
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Character;
