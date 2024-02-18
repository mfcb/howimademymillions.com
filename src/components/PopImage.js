import { Box, Link, Tooltip } from "@mui/material";
import React, { Fragment, useState } from "react";


function DefTooltip(props) {
    return (
        props.title ? <Tooltip {...props} /> : <Fragment children={props.children} />
    )
}

const WrappedLink = React.forwardRef(function DefLink(props, ref) {
    return (
        <Link target={props.href?.includes('http') ? "_blank" : "_self"} rel="noreferrer" ref={ref} href={props.href} sx={{
            textAlign: 'center',
            '&:hover': {
                background: 'none',
                cursor: props.href ? (props.href?.includes('http') ? 'ne-resize' : 'pointer') : 'inherit',
              }
        }} {...props}/>
    )
});

export default function PopImage(props) {

    return (
        <Box component="figure">
            
            <DefTooltip
                title={props.caption}
                placement="right"
                enterDelay={1000}
            >
                    <WrappedLink href={props.href}>
                        <Box    component="img"
                                src={props.src}
                                // onClick={popImage}
                                sx={{
                                    maxHeight: {
                                        xs: `400px`,
                                        md: '500px',
                                        xl: '500px',
                                    },
                                    maxWidth: {
                                        xs: '90%',
                                        md: '500px',
                                        xl: '500px',

                                    },
                                    transition: `transform ${props.timeout || 250}ms ease-in-out`,
                                    // width: 'auto',
                                    // height: 'auto',
                                    // aspectRatio: '1 / 1',
                                    objectFit: 'cover',
                                    position:'relative',
                                }}
                        />
                    </WrappedLink>
            </DefTooltip>
        </Box>
    )
}