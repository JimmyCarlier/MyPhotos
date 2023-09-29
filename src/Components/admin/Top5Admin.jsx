import { useEffect } from "react";

const Top5Admin = ( {setTop5Photos, Top5Photos} ) => {
    const fetchTop5Photos = async () => {
        const response = await fetch('http://localhost:3000/file/bestPictures');
        const responseJsonTop5 = await response.json();
        setTop5Photos(responseJsonTop5.data)
    }

    useEffect(() => {
        fetchTop5Photos()
    }, [])
    return (
        <article className="top5Photos">
            <div className="top5title">
                <h2>TOP 5 photos</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px"><path d="M280-120v-80h160v-124q-49-11-87.5-41.5T296-442q-75-9-125.5-65.5T120-640v-40q0-33 23.5-56.5T200-760h80v-80h400v80h80q33 0 56.5 23.5T840-680v40q0 76-50.5 132.5T664-442q-18 46-56.5 76.5T520-324v124h160v80H280Zm0-408v-152h-80v40q0 38 22 68.5t58 43.5Zm200 128q50 0 85-35t35-85v-240H360v240q0 50 35 85t85 35Zm200-128q36-13 58-43.5t22-68.5v-40h-80v152Zm-200-52Z"/></svg>
            </div>
        {Top5Photos.length !== 0 &&
            Top5Photos.map((photo,i) => (
                photo &&
                <div className={`singlePhoto singlePhoto${i+1}`}>
                    <p>{i+1}.</p>
                    <div>
                        <img src={"http://localhost:3000/" + photo.file} alt={photo.description} />
                        <span className="overPhotoVotes">{photo.votes} votes</span>
                    </div>
                </div>
            ))
        }
        </article>
    )
}

export default Top5Admin