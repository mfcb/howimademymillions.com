import { Fade, Link } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";


export default function NavLink(props) {


    return (
            <Link component={props.component} to={props.to} sx={props.sx} href={props.href || "#"} onClick={props.onClick}>{props.children}</Link>
    )
}