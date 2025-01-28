import "./Register.css";
import {useForm} from "react-hook-form";
import {User} from "../../../Models/User.ts";
import authService from "../../../Services/AuthService.ts";
import {useNavigate} from "react-router-dom";
// import {authStore, login} from "../../../Redux/AuthSlice.ts";
import {NavLink} from "react-router-dom";


export function Register(): JSX.Element {

    const {register, handleSubmit, formState} = useForm<User>();
    const navigate = useNavigate();

    function sendUser(user: User) {
        authService.register(user)
            .then(res=>{
                alert("successfully registered")
                navigate("/")
            })
            .catch(err => alert(err.response.data || "Something Went Wrong"))
    }

    return (

        <div className="Register">
            <form onSubmit={handleSubmit(sendUser)}>
                <div className="registerTitle">Sign Up</div>
                <input type="text" placeholder={"First Name"} {...register("firstName")}/>
                <input type="text" placeholder={"Last Name"} {...register("lastName")}/>
                <input type="text" placeholder={"Username"} {...register("userName")}/>
                <input type="email" placeholder={"Email"} {...register("email")}/>
                <input type="password" placeholder={"Password"} {...register("password")}/>
                <NavLink className={"alreadyHaveAccount"} to={"/login"}>Already have account? <span className={"loginInRegisterForm"}>Login</span></NavLink>

                <button type={"submit"} className="registerButton">Register</button>
            </form>
        </div>
    );
}
