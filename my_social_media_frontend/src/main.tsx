import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {Layout} from "./Components/LayoutArea/Layout/Layout.tsx";
import axios from "axios";
import {authStore} from "./Redux/AuthSlice.ts";


axios.interceptors.request.use(function (config) {
    const token = authStore.getState().token;
    if (token) { // if token exists
        config.headers.Authorization = "Bearer " + token;
    }
    return config;
});


createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Layout/>
  </BrowserRouter>,
)
