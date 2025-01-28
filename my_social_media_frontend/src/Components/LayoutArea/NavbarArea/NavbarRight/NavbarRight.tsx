import "./NavbarRight.css";
import {authStore, logOut} from "../../../../Redux/AuthSlice.ts";
import {Chat, Notifications} from "@mui/icons-material";
import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import authService from "../../../../Services/AuthService.ts";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {getTokenState} from "../../../../Util.ts";

export function NavbarRight(): JSX.Element {

    const [counter, setCounter] = useState<number>(0);
    const [menuOpened, setMenuOpened] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;

        if (selectedOption === "logout") {
            handleLogOut();
        }
        if (selectedOption === "settings") {
            navigate("/settings")
        }
        if (selectedOption === "account") {
            navigate(`/account/${authStore.getState().userName}`)
        }
        setMenuOpened(false);
    };

    function handleLogOut() {
        authService.logout()
            .then(() => {
                console.log("Logout successful!");
                authStore.dispatch(logOut());
                navigate("/login");
            })
            .catch(err => {
                console.error("Logout failed", err.response?.data);
                alert("Error logging out");
            });
    }

    function handleMenu() {
        setMenuOpened(prevState => !prevState);
    }

    // return (
    //     <div className="navbarRight">
    //             <>
    //             {getTokenState() ?
    //                 <div className="navbarItem" onClick={handleMenu}>
    //                     <AccountCircle className={"navbarItemLogo"}/>
    //                     <span className={"navbarItemText"}>{getTokenState() ? authStore.getState().userName :
    //                         <span>Account</span>} </span>
    //                 </div> : <div className={"loginContainer"}>
    //                     <AccountCircleOutlinedIcon className={"navbarLoginIcon"}/>
    //                     <span className="navbarLoginItem" onClick={()=>navigate("/login")}>LOGIN</span>
    //                 </div>}
    //                 {menuOpened && (
    //                     <div className="dropdown">
    //                         <select onChange={handleSelectChange} className="dropdownSelect">
    //                             <option value="">Select</option>
    //                             <option value="account">Account</option>
    //                             <option value={"settings"}>Settings</option>
    //                             <option value="logout">Log out</option>
    //                         </select>
    //                     </div>
    //                 )}
    //             </>
    //     </div>
    // );
    return (
        <div className="navbarRight">
            {getTokenState() ? (
                <div className="navbarItem" onClick={handleMenu}>
                    <AccountCircle className={"navbarItemLogo"} />
                    <span className={"navbarItemText"}>
          {authStore.getState().userName}
        </span>
                </div>
            ) : (
                <div className={"loginContainer"}>
                    <AccountCircleOutlinedIcon className={"navbarLoginIcon"} />
                    <span className="navbarLoginItem" onClick={() => navigate("/login")}>
          LOGIN
        </span>
                </div>
            )}

            {menuOpened && getTokenState() && (
                <div className={`dropdown ${menuOpened ? "visible" : ""}`}>
                    <select onChange={handleSelectChange} className="dropdownSelect">
                        <option value="">Select</option>
                        <option value="account">Account</option>
                        <option value="settings">Settings</option>
                        <option value="logout">Log out</option>
                    </select>
                </div>
            )}
        </div>
    )
}
