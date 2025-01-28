import {User} from "../Models/User.ts";
import axios from "axios"

class AuthService {

    async register(user: User) {
        return (await axios.post("http://localhost:8080/auth/register", user)).data;
    }

    async login(email:string, password:string) {
        return (await axios.get(`http://localhost:8080/auth/login/${email}/${password}`)).data
    }

    async logout() {
        return (await axios.post("http://localhost:8080/auth/logout"))
    }

}

const authService = new AuthService();
export default authService;
