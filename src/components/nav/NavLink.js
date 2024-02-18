import { Fade, Link } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";


export default function NavLink(props) {

    const linkRef = useRef(null);
    const [isLinkActive, setLinkActive] = useState(true);

    const scrollHandler = useCallback(
        () => {
            if(window.pageYOffset >= ((linkRef.current.offsetTop - 80) + props.offset)) {
                if(!isLinkActive) {
                    setLinkActive(true);
                }
            } else {
                if(isLinkActive) {
                    setLinkActive(false);
                }
            }
        },
        [setLinkActive, isLinkActive,props.offset]
    )

    useEffect(() => {
        window.addEventListener('scroll',scrollHandler);

        return () => window.removeEventListener('scroll',scrollHandler);
    },[scrollHandler]);

    return (
            <Link component={props.component} to={props.to} sx={props.sx} ref={linkRef} href={props.href || "#"} onClick={props.onClick}>{props.children}</Link>
    )
}