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
  const [availableVote, setAvailableVote] = useState(3);
  const dataPicture = async () => {
    const response = await fetch(`http://localhost:3000/file/allPhotos/`);
    const responseJson = await response.json();

    const array = [...responseJson.data];
    array.sort((a, b) => 0.5 - Math.random());

    setPhoto(array);
  };

  const handleVote = async (picture) => {
    let titleTexte;
    if (availableVote === 1) {
      titleTexte = `Vous êtes sur le point d'utiliser votre dernier vote`;
    } else {
      titleTexte = `Vous êtes sur le point d'utiliser un de vos ${availableVote} votes disponible`;
    }
    Swal.fire({
      title: titleTexte,
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
        setAvailableVote(availableVote - 1);
        Swal.fire("Vote validé");
        if (!localStorage.getItem("vote")) {
          localStorage.setItem("vote", 0);
        }
        var attempts = parseInt(localStorage.getItem("vote"));
        localStorage.setItem("vote", ++attempts);

        if (parseInt(localStorage.getItem("vote")) === 1) {
          const day = {
            date: Date.now(),
          };
          localStorage.setItem("date", day.date);
        }
        const addVote = {
          votes: picture.votes + 1,
        };

        const token = UseSession();

        const fetchOption = {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(addVote),
        };

        const fetchUpdate = await fetch(
          `http://localhost:3000/file/updateVote/${picture.id}`,
          fetchOption
        );

        setVote(fetchUpdate);
      }
    });
  };
  if (
    localStorage.getItem("vote") &&
    parseInt(localStorage.getItem("vote")) === 3
  ) {
    const allBtn = document.querySelectorAll(".btn-disapear");
    allBtn.forEach((e) => {
      e.style.display = "none";
    });
  }

  if (
    localStorage.getItem("date") &&
    parseInt(localStorage.getItem("date")) + 86400000 <= Date.now()
  ) {
    localStorage.removeItem("date");
    localStorage.removeItem("vote");
  }
  useEffect(() => {
    document.title = "Home Page";
    SecurityCheckSession();
    dataPicture();
  }, []);

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
                    <img src={"http://localhost:3000/" + e.file} alt={e.description} />
                      <button
                        className="btn-choose btn-disapear"
                        onClick={() => handleVote(e)}
                      >
                        Voter
                      </button>
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
