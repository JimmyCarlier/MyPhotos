import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "../../Assets/css/Pages/Membres/UploadContest.css";
import { UseSession } from "../../Components/UseSession";

const fileTypes = ["JPG", "PNG", "GIF"];

const UploadContest = () => {
  const [file, setFile] = useState(null);
  const handleChange = (fi) => {
    setFile([...fi]);
  };
  console.log(file);
  const handleSubmitPhotos = async (e) => {
    e.preventDefault();
    const token = UseSession();

    const formData = new FormData();
    for (let i = 0; i < e.target.length - 1; i++) {
      formData.append("file", file[i]);
      formData.append("description", e.target[i].value);
    }

    const uploadPhotos = fetch("http://localhost:3000/file/upload", {
      method: "POST",
      body: formData,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    uploadPhotos.then((res) => {
      console.log(res);
      if (res.status === 200) {
        window.location = "/member";
      }
    });
  };
  return (
    <section className="UploadContainer">
      <h1>UPLOAD D'IMAGES</h1>
      <article className="UploadContainerFileUploader">
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          label="Glisser et déposer vos images ici ou cliquez pour les sélectionner ou bien cliquez pour les sélectionner"
          classes="file-uploader"
        />
      </article>
      {file && (
        <article className="UploadContainerPreviewCard">
          <form onSubmit={handleSubmitPhotos}>
            {file.map((f, i) => (
              <div className="myCardPhoto">
                <div className="cardTitle">Image N°{i + 1}</div>
                <div key={f.name} className="cardBody">
                  <img src={URL.createObjectURL(f)} alt="preview" />
                  <p>Description de votre image :</p>
                  <textarea
                    name="description"
                    id="description"
                    cols="30"
                    rows="10"
                  ></textarea>
                </div>
              </div>
            ))}
            <div className="mybtnSubmit">
              <button type="submit">Envoyer</button>
            </div>
          </form>
        </article>
      )}
    </section>
  );
};

export default UploadContest;
