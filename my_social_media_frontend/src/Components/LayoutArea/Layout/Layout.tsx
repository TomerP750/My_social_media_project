import "./Layout.css";
import {Navbar} from "../NavbarArea/Navbar/Navbar.tsx";
import {Footer} from "../Footer/Footer.tsx";
import {Routing} from "../Routing/Routing.tsx";
import {LayoutLeftSection} from "../LayoutLeftSection/LayoutLeftSection.tsx";
import {LayoutRightSection} from "../LayoutRightSection/LayoutRightSection.tsx";
import {useLocation} from "react-router-dom";

export function Layout(): JSX.Element {

    const location = useLocation();
    const hiddenHeaderRoutes = ['/login', '/register'];
    const showHeader = !hiddenHeaderRoutes.includes(location.pathname);

    return (
        <>
        {showHeader && <Navbar/>}
        <div className="Layout">
            {showHeader && <LayoutLeftSection/>}
            <Routing/>
            {showHeader && <LayoutRightSection/>}
        </div>
            {showHeader && <Footer/>}
            </>
    );
}
