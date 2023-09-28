import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useEffect, useState } from "react";
import { UseSession } from "../../Components/UseSession";
import { Link } from "react-router-dom";
import "../../Assets/css/Pages/Membres/SpaceMember.css";

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

  useEffect(() => {
    showAllPhotos();
  }, []);
  return (
    <>
      <Header />
      <main>
        <section>
          <div>
            <Link to="/member/upload">Ajouter une photo</Link>
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
              picture.map((e) => {
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
