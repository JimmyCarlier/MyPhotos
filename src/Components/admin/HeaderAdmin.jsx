import { Link } from 'react-router-dom';
import '../../Assets/css/Component/Admin/HeaderAdmin.css'
import { handleDisconnect } from '../HandleDisconnect';
const HeaderAdmin = () => {
    return (
        <div className="header-admin">
            <Link to="/"><img src="/LogoMyPhotosB&W.svg" alt="" /></Link>
            <h1>TABLEAU DE BORD</h1>
            <svg onClick={handleDisconnect} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
        </div>
    );
}

export default HeaderAdmin;