import Cookies from "js-cookie";

// Desc: Handle disconnect from website
export const handleDisconnect = () => {
    localStorage.removeItem('session');
    Cookies.remove('session');
    window.location.href = "/";
}