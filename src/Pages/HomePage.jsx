import { useEffect, useState } from "react";
import Header from "../Components/Header";
import { SecurityCheckSession } from "../Components/SecurityCheckSession";
import { UseSession } from "../Components/UseSession";
import Swal from "sweetalert2";
import "../Assets/css/HomePage.css";
import Footer from "../Components/Footer";
import Pagination from "./Pagination";

const HomePage = () => {
  const [photo, setPhoto] = useState([]);
  const photoUrls = photo.map(photo => photo.file);
  const photoAlts = photo.map(photo => photo.description);
  const photoIds = photo.map(photo => photo.id);

  const dataPicture = async () => {
    const response = await fetch(`http://localhost:3000/file/allPhotos/`);
    const responseJson = await response.json();

    const array = [...responseJson.data];
    array.sort((a, b) => 0.5 - Math.random());

    setPhoto(array);
  };

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
            <h1>Ne manquez pas l'occasion de voter pour la photo du jour <span>
            <button className="btn-choose2">
              <a href="#anchor-règle">
              <svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 -960 960 960" width="50"><path d="m480-320 160-160-56-56-64 64v-168h-80v168l-64-64-56 56 160 160Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
              </a>
            </button>
              </span></h1>
          </div>
        </section>
        <section id="anchor-règle" className="reglement-video">
        <div class="custom-shape-divider-top-1696005298">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M649.97 0L550.03 0 599.91 54.12 649.97 0z" class="shape-fill"></path>
            </svg>
        </div>
          <h2>Présentation et règlement</h2>
          <div>
          <iframe width="840" height="473" src="https://www.youtube.com/embed/uwdhp9f5rTY?si=3emWUEw7InJnzrR2" title="YouTube video player" frameborder="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>        
          </div>
          </section>
        <section id="anchor-picture" className="container-picture">
          <div className="container-title">
            <h3>Concours</h3>
          </div>
          <div className="main-container">
              { photo.length !== 0 &&
              <Pagination photos={photoUrls} alts={photoAlts} id={photoIds}/>}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
