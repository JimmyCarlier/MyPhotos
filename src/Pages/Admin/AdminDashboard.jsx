import { useEffect, useState } from "react";
import { SecurityCheckSession } from "../../Components/SecurityCheckSession";
import { Link, useNavigate } from "react-router-dom";
import '../../Assets/css/Pages/Admin/AdminDashboard.css' 
import HeaderAdmin from "../../Components/admin/HeaderAdmin";
import Top5Admin from "../../Components/admin/Top5Admin";
import Cookies from "js-cookie";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [Top5Photos, setTop5Photos] = useState([]);
    const [nbVotesToday, setNbVotesToday] = useState(0);
    const [nbWaitingPhotos, setNbWaitingPhotos] = useState(0);

    const unpublishedPhotos = async () => {
        const response = await fetch('http://localhost:3000/file/unpublished', {
            method: 'GET',
            headers : {authorization : `Bearer ${localStorage.getItem('session').concat(Cookies.get('session'))}`} 
        });
        const responseJson = await response.json();
        setNbWaitingPhotos(responseJson.data.length)
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
    }, [])
  return (
    <>
        <HeaderAdmin />
        <section className="admin-dashboard">
            <Top5Admin setTop5Photos={setTop5Photos} Top5Photos={Top5Photos}/>
            <article className="linksStatsAndWaiting">
                <Link to="./en-attente">EN ATTENTE
                <span>
                <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="80"><path d="M320-160h320v-120q0-66-47-113t-113-47q-66 0-113 47t-47 113v120ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Z"/></svg>
                {nbWaitingPhotos && <span>{nbWaitingPhotos}</span>
                }
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 -960 960 960" width="80"><path d="m480-320 160-160-160-160-56 56 64 64H320v80h168l-64 64 56 56Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
                </Link>
                <Link>Nombre de votes aujourd'hui
                <svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 -960 960 960" width="80"><path d="m480-320 160-160-160-160-56 56 64 64H320v80h168l-64 64 56 56Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg></Link>
            </article>
        </section>
    </>
  );
}

export default AdminDashboard;