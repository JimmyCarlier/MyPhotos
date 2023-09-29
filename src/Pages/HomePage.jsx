import { useEffect, useState } from "react";
import Header from "../Components/Header";
import { SecurityCheckSession } from "../Components/SecurityCheckSession";
import { UseSession } from "../Components/UseSession";
import Swal from "sweetalert2";
import "../Assets/css/HomePage.css";
import Footer from "../Components/Footer";

const HomePage = () => {
  const [photo, setPhoto] = useState([]);
  const [vote, setVote] = useState();
  const dataPicture = async () => {
    const response = await fetch(`http://localhost:3000/file/allPhotos/`);
    const responseJson = await response.json();
    console.log(responseJson.data);

    const array = [...responseJson.data];
    array.sort((a, b) => 0.5 - Math.random());

    setPhoto(array);
  };

  const handleVote = async (picture) => {
    Swal.fire({
      title:
        "Vous êtes sur le point d'utiliser votre vote du jour pour cette photo.",
      text: "Validez vous votre choix ?",
      icon: "question",
      iconColor: "white",
      color: "white",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Valider",
      cancelButtonText: "Annuler",
      background: "rgba(0, 0, 0, 0.5)",
      allowOutsideClick: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        const addVote = {
          votes: picture.votes + 1,
        };

        const token = UseSession();

        const fetchOption = {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(addVote),
        };
        const fetchUpdate = await fetch(
          `http://localhost:3000/file/update/${picture.id}`,
          fetchOption
        );

        setVote(fetchUpdate);
      }
    });
  };

  useEffect(() => {
    document.title = "Home Page";
    SecurityCheckSession();
    dataPicture();
  }, [vote]);

  return (
    <>
      <Header />
      <main>
        <section className="first-section">
          <div className="container-info">
            <h1>Ne manquez pas l'occasion de voter pour la photo du jour</h1>
            <button className="btn-choose">
              <a href="#anchor-picture">Choisir ici !</a>
            </button>
          </div>
        </section>
        <section className="reglement-video">
          <h2>Vidéo de réglement</h2>
          <button className="btn-choose">Compris !</button>
        </section>
        <section id="anchor-picture" className="container-picture">
          <div className="container-title">
            <h3>Concours</h3>
          </div>
          <div className="main-container">
            {photo.length != 0 &&
              photo.map((e) => {
                return (
                  <div className="image-card">
                    <img src={"http://localhost:3000/" + e.file} alt="" />
                    <div className="container-infoPicture">
                      <p>{e.description}</p>
                      <p>Nombre de votes : {e.votes}</p>
                      <button
                        className="btn-choose"
                        onClick={() => handleVote(e)}
                      >
                        Voter
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
