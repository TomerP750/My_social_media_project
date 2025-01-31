import "./NavbarRight.css";
import {authStore, logOut} from "../../../../Redux/AuthSlice.ts";
import {Chat, Notifications} from "@mui/icons-material";
import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";
import authService from "../../../../Services/AuthService.ts";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {getTokenState} from "../../../../Util.ts";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


export function NavbarRight(): JSX.Element {

    const [counter, setCounter] = useState<number>(0);
    const [menuOpened, setMenuOpened] = useState<boolean>(false);
    const navigate = useNavigate();

    function handleChangeSelect(val: string) {

            if (val === "logout") {
                handleLogOut();
            }
            if (val === "settings") {
                navigate("/settings")
            }
            if (val === "account") {
                navigate(`/account/${authStore.getState().userName}`)
            }
            setMenuOpened(false);
    }

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

    return (
        <div className="navbarRight">
            {getTokenState() ? (
                <div className="navbarItem" onClick={handleMenu}>
                    <AccountCircle className={"navbarItemLogo"} />
                    <div className="userNameAndArrowDown">
                    <span className={"navbarItemText"}>{authStore.getState().userName}</span>
                    <ArrowDropDownIcon sx={{marginLeft:"-5px"}}/>
                    </div>

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
                    <div className="navBarRightDropdown">
                        <div className="navBarRightItem" onClick={() => handleChangeSelect("account")}>Account</div>
                        <div className="navBarRightItem" onClick={() => handleChangeSelect("settings")}>Settings</div>
                        <div className="navBarRightItem" onClick={() => handleChangeSelect("logout")}>Logout</div>
                    </div>
                </div>
            )}


        </div>
    )
}
