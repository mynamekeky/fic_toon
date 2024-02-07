import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Charactermain(perPage) {
  const MySwal = withReactContent(Swal);
  const [character, setCharacter] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    fetch(`http://127.0.0.1:3500/characters`, {
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((result) => {
        setCharacter(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const donate = (id) => {
    Swal.fire({
      title: "สนับสนุนตัวละครนี้",
      input: "number",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      showLoaderOnConfirm: true,
      preConfirm: async (i) => {
        if (i) {
          const token = localStorage.getItem("token");
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", "Bearer " + token);

          var raw = JSON.stringify({
            coin: i,
            characterId: id,
          });

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch("http://127.0.0.1:3500/users/donate", requestOptions)
            .then((response) => response.json())
            .then((result) => {
              if (result.massage === "ไม่สามารถสนับสนุนตัวละครของตัวเองได้") {
                Swal.fire({
                  text: "ไม่สามารถสนับสนุนตัวละครของตัวเองได้",
                  icon: "error",
                });
              }

              if (result.statusCode === 200) {
                Swal.fire({
                  text: "สนับสนุนเสร็จสิ้น",
                  icon: "success",
                });
              }
            })
            .catch((error) => console.log("error", error));
        } else {
          Swal.showValidationMessage("กรุณากรอกข้อมูลให้ครบ");
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
  return (
    <div className="grid grid-cols-3 gap-4">
      {character.length > 1 ? (
        character.slice(0, perPage.data).map((item) => (
          <div className="border rounded-lg pt-3 pb-6 px-5 shadow-sm">
            <div className="flex justify-between text-center font-bold">
              <div>
                <p className="text-2xl">{item.roleAs}</p>
              </div>
              <div>
                <p className="text-base text-white bg-sec py-0.5 px-2 rounded-xl">
                  {item.work.type}
                </p>
              </div>
            </div>

            <div className="flex justify-center py-3">
              <img
                src={`../img/work/` + item.picture}
                className="w-44 h-48 border rounded-lg"
              ></img>
            </div>

            <div className="font-bold">
              <div className="text-center">
                <p className="text-3xl">{item.name}</p>
                <p className="text-sm mb-2">{item.work.title}</p>
                <p
                  onClick={() => donate(item.id)}
                  className="text-lg text-warning border border-warning rounded-xl w-full py-0.5 px-6 cursor-pointer"
                >
                  สนับสนุน
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Charactermain;
