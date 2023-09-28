import { useEffect, useState } from "react";
import { SecurityCheckSession } from "../../Components/SecurityCheckSession";
import { useNavigate } from "react-router-dom";
import '../../Assets/css/Pages/Admin/AdminDashboard.css' 
import HeaderAdmin from "../../Components/admin/HeaderAdmin";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [Top5Photos, setTop5Photos] = useState([]);
    const fetchTop5Photos = async () => {
        const response = await fetch('http://localhost:3000/file/bestPictures');
        const responseJsonTop5 = await response.json();
        setTop5Photos(responseJsonTop5.data)
    }
    useEffect(() => {
        const userData = SecurityCheckSession();
        if (userData.role !== 1) {
            navigate("/signin")
        }
        fetchTop5Photos();
    }, [])
  return (
    <>
        <HeaderAdmin />
        <section className="top5Photos">
        {Top5Photos.length !== 0 &&
            Top5Photos.map((photo) => (
                photo &&
                <>
                    <img src={"http://localhost:3000/" + photo.file} alt={photo.description} />
                </>
            ))
        }
        </section>

    </>
  );
}

export default AdminDashboard;