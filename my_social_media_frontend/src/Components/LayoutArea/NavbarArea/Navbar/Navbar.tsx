import "./Navbar.css";
// import {useState} from "react";
import {NavbarRight} from "../NavbarRight/NavbarRight.tsx";
import {NavbarCenter} from "../NavbarCenter/NavbarCenter.tsx";
import {NavbarLeft} from "../NavbarLeft/NavbarLeft.tsx";

export function Navbar(): JSX.Element {

    return (
        <div className="navbar">
            <NavbarLeft/>
            <NavbarCenter/>
            <NavbarRight/>
        </div>
    );
}
