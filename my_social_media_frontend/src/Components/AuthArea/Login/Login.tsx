import "./Login.css";
import {useForm} from "react-hook-form";
import {User} from "../../../Models/User.ts";
import authService from "../../../Services/AuthService.ts";
import {NavLink, useNavigate} from "react-router-dom";
import {authSlice, authStore, login} from "../../../Redux/AuthSlice.ts";

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
			<form onSubmit={handleLogin}>
                <div className={"loginTitle"}>Welcome Back</div>
                <input type="email" placeholder="Email" required onChange={e => email = e.target.value}/>
                <input type="password" placeholder={"Password"} required onChange={e => password = e.target.value}/>
                <NavLink className={"dontHaveAccount"} to={"/register"}>Dont have account? <span className={"signUp"}>Sign up</span></NavLink>
                <button type={"submit"}>Login</button>
            </form>
        </div>
    );
}
