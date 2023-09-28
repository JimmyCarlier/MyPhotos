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
        {Top5Photos.length !== 0 &&
            Top5Photos.map((photo) => (
                photo &&
                <>
                    <img src={"http://localhost:3000/" + photo.file} alt={photo.description} />
                </>
            ))
        }
        </article>
    )
}

export default Top5Admin