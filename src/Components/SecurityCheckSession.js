import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

export const SecurityCheckSession = () => {
    let session;
    const CookieSession = Cookies.get('session') && Cookies.get('session');
    const LocalSession = localStorage.getItem('session') && localStorage.getItem('session');
    
    if (CookieSession && LocalSession) {
        session = LocalSession.concat(CookieSession);
        const userData = jwt_decode(session);
        return userData;        
    } else {
        return false;
    }
}