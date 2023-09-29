import { useEffect, useState } from "react";
import HeaderAdmin from "../../Components/admin/HeaderAdmin"
import Cookies from "js-cookie";
import '../../Assets/css/Pages/Admin/Unpublished.css'
import { SecurityCheckSession } from "../../Components/SecurityCheckSession";
import { useNavigate } from "react-router-dom";

const EnAttente = () => {
    const navigate = useNavigate();
    const [WaitingPhotos, setWaitingPhotos] = useState([]);
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const unpublishedPhotos = async () => {
        const response = await fetch('http://localhost:3000/file/unpublished', {
            method: 'GET',
            headers : {authorization : `Bearer ${localStorage.getItem('session').concat(Cookies.get('session'))}`} 
        });
        const responseJson = await response.json();
        setWaitingPhotos(responseJson.data)
    }

    let thoseBtn = document.querySelectorAll(".containerBTN")

    const handleRemoveMultiplePublish = async (e) => {
        setSelectedPhotos(selectedPhotos.filter((photo) => photo !== e))
        document.getElementById(`selectedImage${e}`).classList.add("dispNone");
        if (selectedPhotos.length <2) {
            document.querySelector(".containerBTNAllSelected").classList.add("dispNone");
            thoseBtn.forEach((btn) => {
                btn.classList.remove("visHidden")
            })
        }
    }
    const handleMultiplePublish = async (e) => {
        setSelectedPhotos([...selectedPhotos, e])
        document.getElementById(`selectedImage${e}`).classList.remove("dispNone");
        if (selectedPhotos.length === 0) {
            document.querySelector(".containerBTNAllSelected").classList.remove("dispNone");
            thoseBtn.forEach((btn) => {
                btn.classList.add("visHidden")
            })
        }
    }
    // Fetch to change status of selectedPhotos

    const fetchMultiplePublish = async (statusPhoto, idPhoto = null) => {
        if(selectedPhotos.length === 0) {
            selectedPhotos.push(idPhoto)
        }
        const response = await fetch('http://localhost:3000/file/update', {
            method: 'PUT',
            headers : {
                "Content-Type": "application/json",
                authorization : `Bearer ${localStorage.getItem('session').concat(Cookies.get('session'))}`
            },
            body: JSON.stringify({
                ids: selectedPhotos,
                status: statusPhoto
            })
        });
        if (response.status === 200) {
            unpublishedPhotos()
            setSelectedPhotos([])
            document.querySelector(".containerBTNAllSelected").classList.add("dispNone");
            thoseBtn.forEach((btn) => {
                btn.classList.remove("visHidden")
            })
        }
    }
    useEffect(() => {

        (async () => {
            const userData = await SecurityCheckSession();
            if (userData.role !== 1 || !userData) {
                navigate("/connexion")
            } else {
             unpublishedPhotos()
            }
        })()
     }, [selectedPhotos])
    return (
        <>
        <HeaderAdmin />
            <div className="ContainerPhotoUnpublished">
                    <div>
                        <h2>En attente de validation</h2>
                    </div>
                    <div className="photoUnpublished">
                        {WaitingPhotos.length !== 0 &&
                            WaitingPhotos.map((photo,i) => (
                                <ul key={photo.id}>
                                    <img onClick={()=>handleMultiplePublish(photo.id)} src={"http://localhost:3000/" + photo.file} alt={photo.description} />
                                    <div id={`selectedImage${photo.id}`} onClick={()=>handleRemoveMultiplePublish(photo.id)} className={`selectedImage dispNone`}><span>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="green"d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
                                        </span>
                                    </div>
                                    <div className="containerBTN">
                                        <a className="btnPublier" onClick={()=> fetchMultiplePublish('publie', photo.id)}>Publier</a>
                                        <a className="btnRejeter" onClick={()=> fetchMultiplePublish('rejete', photo.id)}>Rejeter</a>
                                    </div>
                                </ul>
                          ))
                        }
                        <div className="containerBTNAllSelected dispNone">
                            <a className="btnPublier" onClick={()=>fetchMultiplePublish('publie')}>Publier selection</a>
                            <a className="btnRejeter" onClick={()=>fetchMultiplePublish('rejete')}>Rejeter selection</a>
                        </div>
                </div>
            </div>
        </>
    )
}

export default EnAttente