import { useEffect } from "react";
import Header from "../Components/Header";
import { SecurityCheckSession } from "../Components/SecurityCheckSession";
const HomePage = () => {
    
    useEffect(() => {
        document.title = "Home Page";
        SecurityCheckSession();
    }, []);

    return (
        <div>
            <Header />
            <h1>Home Page</h1>
        </div>
    );
};

export default HomePage;