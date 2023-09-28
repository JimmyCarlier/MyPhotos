import { useEffect, useState } from "react";
import { SecurityCheckSession } from "../../Components/SecurityCheckSession";
import { useNavigate } from "react-router-dom";
import '../../Assets/css/Pages/Admin/AdminDashboard.css' 
import HeaderAdmin from "../../Components/admin/HeaderAdmin";
import Top5Admin from "../../Components/admin/Top5Admin";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [Top5Photos, setTop5Photos] = useState([]);

    useEffect(() => {
        const userData = SecurityCheckSession();
        if (userData.role !== 1) {
            navigate("/signin")
        }
    }, [])
  return (
    <section className="admin-dashboard">
        <HeaderAdmin />
        <Top5Admin setTop5Photos={setTop5Photos} Top5Photos={Top5Photos}/>
    </section>
  );
}

export default AdminDashboard;