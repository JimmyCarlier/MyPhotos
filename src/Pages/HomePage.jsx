import { useEffect, useState } from "react";
import Header from "../Components/Header";
import { SecurityCheckSession } from "../Components/SecurityCheckSession";
const HomePage = () => {
  const [photo, setPhoto] = useState([]);
  const dataPicture = async () => {
    const response = await fetch(`http://localhost:3000/file/allPhotos/`);
    const responseJson = await response.json();
    console.log(responseJson.data);

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
    <div>
      <Header />
      <h1>Home Page</h1>
      {photo.length != 0 &&
        photo.map((e) => {
          return (
            <>
              <img src={"http://localhost:3000/" + e.file} alt="" />
              <p>{e.description}</p>
            </>
          );
        })}
    </div>
  );
};

export default HomePage;
