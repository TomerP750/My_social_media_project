import "./Login.css";
import authService from "../../../Services/AuthService.ts";
import {NavLink, useNavigate} from "react-router-dom";
import {authSlice, authStore, login} from "../../../Redux/AuthSlice.ts";
import BusinessIcon from '@mui/icons-material/Business';

export function Login(): JSX.Element {

    let email = "";
    let password = "";
    const navigate = useNavigate();

    function handleLogin(event: React.FormEvent) {
        event.preventDefault();
        authService.login(email, password)
            .then(res => {
                sessionStorage.setItem("token", res)
                authStore.dispatch(login(res))
                navigate("/")
            })
            .catch(err=>err.response.data)
    }

    return (
        <div className="Login">
            <div className="loginFormLeftSection">
                <div className="loginFormLeftSectionContent">
                <BusinessIcon className={"loginLeftSectionLogo"}/>
                <h1>MSM</h1>
                </div>
            </div>
                <form onSubmit={handleLogin}>
                    <div className={"loginTitle"}>Welcome Back</div>
                    <input type="email" placeholder="Email" required onChange={e => email = e.target.value}/>
                    <input type="password" placeholder={"Password"} required onChange={e => password = e.target.value}/>
                    <NavLink className={"dontHaveAccount"} to={"/register"}>Don't have an account? <span
                        className={"signUp"}>Sign up</span></NavLink>
                    <button type={"submit"}>Login</button>
                </form>
        </div>
    );
}
