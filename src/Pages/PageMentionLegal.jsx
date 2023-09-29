import { useEffect, useState } from "react";
import Header from "../Components/Header";
import "../Assets/css/Pages/mentionLegal.css"
import Footer from "../Components/Footer";

const PageMentionLegal = () => {
  const [message, setMessage] = useState();
  const legalMention = async () => {
    const response = await fetch("http://localhost:3000/cgu/show");
    const responseJson = await response.json();
    setMessage({ __html : `${responseJson.data}`});
  };

  useEffect(() => {
    legalMention();
  }, []);

  return (
    <>
      <Header />
      <section className="containerCGU">
        <article dangerouslySetInnerHTML={message} className="articleCGU">

        </article>
      </section>
      <Footer />
    </>
  );
};

export default PageMentionLegal;
