import { useEffect, useState } from "react";
import Header from "../Components/Header";

const PageMentionLegal = () => {
  const [message, setMessage] = useState();
  const legalMention = async () => {
    const response = await fetch("http://localhost:3000/cgu/show");
    const responseJson = await response.json();
    setMessage(responseJson.data);
  };

  useEffect(() => {
    legalMention();
  }, []);

  return (
    <>
      <Header />
      <section>
        <h2>CGU</h2>
        <p>{message ? message : "Aucun texte de trouvé"}</p>
        <h3>Mention Légal</h3>
        <p>{message ? message : "Aucun texte de trouvé"}</p>
      </section>
    </>
  );
};

export default PageMentionLegal;
