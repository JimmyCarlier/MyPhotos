import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useEffect, useState } from "react";
import { UseSession } from "../../Components/UseSession";
import { Link } from "react-router-dom";
import "../../Assets/css/Pages/Membres/SpaceMember.css";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const EspaceMembre = () => {
  const [picture, setPicture] = useState([]);
  const [filter, setFilter] = useState([]);
  const showAllPhotos = async () => {
    const token = UseSession();

    const fetchOption = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const responseFetch = await fetch(
      `http://localhost:3000/file/userPicture/`,
      fetchOption
    );
    const responseJson = await responseFetch.json();
    setPicture(responseJson.data);
  };

  const handleValidPicture = (e) => {
    if (e != null) {
      setFilter(picture.filter((pic) => pic.status === e));
    } else {
      setFilter(picture);
    }
  };

  const handleUpdatePsw = async () => {
    Swal.fire({
      title: "Changer de mot de passe",
      html: `<input type="password" id="actualPassword" class="swal2-input" placeholder="Mot de passe actuel">
              <input type="password" id="newPassword" class="swal2-input" placeholder="Nouveau mot de passe">
              <input type="password" id="confirmPassword" class="swal2-input" placeholder="Confirmer le mot de passe">`,
      confirmButtonText: "Mettre à jour",
      focusConfirm: false,
      preConfirm: () => {
        const actualPassword =
          Swal.getPopup().querySelector("#actualPassword").value;
        const newPassword = Swal.getPopup().querySelector("#newPassword").value;
        const confirmPassword =
          Swal.getPopup().querySelector("#confirmPassword").value;
        if (!actualPassword || !newPassword || !confirmPassword) {
          Swal.showValidationMessage(`Merci d'indiquer tout les champs`);
        }
        return {
          actualPassword: actualPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        };
      },
    })
      .then((result) => {
        if (result.value.confirmPassword !== result.value.newPassword) {
          Swal.fire(
            `
          Les champs ne sont pas identique
        `.trim()
          );
        } else {
          async function handleUpdate() {
            const token = UseSession();
            const fetchOption = {
              method: "PUT",
              headers: {
                authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                actualPassword: result.value.actualPassword,
                newPassword: result.value.newPassword,
                confirmPassword: result.value.confirmPassword,
              }),
            };

            const callFetch = await fetch(
              `http://localhost:3000/user/update`,
              fetchOption
            );
            console.log(callFetch);
            if (callFetch.status === 200) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Le mot de passe à était modifié",
                showConfirmButton: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location = "/connexion";
                  localStorage.removeItem("session");
                  Cookies.remove("session");
                }
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Une erreur à était rencontré",
                showConfirmButton: true,
              });
            }
          }
          handleUpdate();
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Une erreur à était rencontré",
          showConfirmButton: true,
        });
      });
  };

  useEffect(() => {
    showAllPhotos();
  }, []);
  return (
    <>
      <Header />
      <main>
        <section>
          <div className="add-picture">
            <div>
              <Link to="/member/upload">Ajouter une photo</Link>
            </div>
            <div>
              <button onClick={handleUpdatePsw}>
                Modifier mon mot de passe
              </button>
            </div>
          </div>
          <div>
            <h2>Mes photos</h2>
            <p>
              Filtre :{" "}
              <button onClick={() => handleValidPicture("publie")}>
                Validé
              </button>{" "}
              <button onClick={() => handleValidPicture("nonpublie")}>
                En attente
              </button>{" "}
              <button onClick={() => handleValidPicture("rejete")}>
                Rejeté
              </button>{" "}
              <button onClick={() => handleValidPicture(null)}>Tout</button>
            </p>
          </div>
          <div className="own-picture">
            {picture.length != 0 && filter.length != 0 ? (
              filter.map((e) => {
                return <img src={"http://localhost:3000/" + e.file} alt="" />;
              })
            ) : (
              <p>Aucune photo</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default EspaceMembre;
