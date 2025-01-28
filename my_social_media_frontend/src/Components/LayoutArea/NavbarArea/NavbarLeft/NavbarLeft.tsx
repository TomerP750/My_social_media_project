import "./NavbarLeft.css";
import {Search} from "@mui/icons-material";
import {NavLink} from "react-router-dom";
import BusinessIcon from "@mui/icons-material/Business";

export function NavbarLeft(): JSX.Element {
    return (
        <div className="navbarLeft">
            <NavLink to={"/"} className="logo"><BusinessIcon className={"logoIcon"}/></NavLink>
        </div>
    );
}
