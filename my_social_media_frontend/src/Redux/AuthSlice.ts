
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface AuthState{
    userName: string;
    token: string;
}

interface JwtUser{
    userName:string;

}

const initState = {
    userName: sessionStorage.getItem("token") ? jwtDecode<JwtUser>(sessionStorage.getItem("token")!).userName:"",
    token: sessionStorage.getItem("token") || ""
}

export const authSlice = createSlice({
    name:"authSlice",
    initialState:initState,
    reducers:{
        login: (state: AuthState, action: PayloadAction<string>) => {
            state.token = action.payload;
            const decodedToken: JwtUser = jwtDecode<JwtUser>(sessionStorage.getItem("token")!);
            state.userName = decodedToken.userName;
        },
        logOut: (state: AuthState) =>{
            state.token = "";
            state.userName = "";
            sessionStorage.removeItem("token");
        }
    }
});

export const {login,logOut} = authSlice.actions;
export const authStore = configureStore({
    reducer:authSlice.reducer
})
