import { Container } from "@mui/system";
import React, { useCallback, useEffect } from "react";
import axios from 'axios';
import { Box, Fade,  Grid,  Tooltip, Typography } from "@mui/material";
import WpApiPostContent from "./WpApiPostContent";
import { WP_API_URL } from "../../const/settings";
import NavLink from "../nav/NavLink";
import {Link as RouterLink, useParams} from "react-router-dom";
import { pageCache } from "../../const/global";
import debounce from "lodash.debounce";

export default function Blog(props) {
    const [categories,setCategories] = React.useState([]);
    
    const [copyMessage, setCopyMessage] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const {readyHandler} = props;
    
    const getCategory = (categoryId) => {
        return categories?.find(item => (item.id === categoryId))?.name || "";
    }

    const getPostDate = (date) => {
        const f = new Date(date);
        // const opt = { month: 'numeric', day: 'numeric', year: '2-digit'}
        return `${f.getMonth()+1}-${f.getDate()}-${f.getFullYear()}`
    }

    const copyPostIdToClipboard = (id) => {
        navigator.clipboard.writeText(process.env.REACT_APP_BASE_URL + "__" + id);
        setCopyMessage(("Post URL copied to clipboard.").toUpperCase());
    }

    const showErrorMessage = () => {
        return (
            <Box sx={{
                minHeight: '80vh',
            }}>
                {Array(35).fill(<Typography sx={{textTransform: 'uppercase', fontStyle: 'italic'}}>{errorMessage}</Typography>)}
            </Box>
        )
    }

    return(
        <Box sx={{
            width:'100%',
            marginLeft: {
                xs: 0,
                md: '0%',
            },
            marginRight: {
                xs: 'auto',
                md: 0,
            },
            maxWidth: {
                xs: '100%',
            },
        }}>
            <Fade in={!props.postsReady}>
                <Box sx={{
                    fontSize: '18px',
                    textAlign: 'center',
                    marginTop: theme => theme.spacing(3),
                }}>
                    <Typography>FETCHING THE BLOG</Typography>
                    <Box sx={{
                        width: '10px',
                        height: '20px',
                        display:'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        animation: props.postsReady ? 'spin 1.5s' : 'spin 1.5s infinite',
                        transition: 'animation 0.5s',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        '@keyframes spin': {
                            '100%' : {
                                transform: 'rotate(360deg)',
                            }
                        } 
                    }}>
                    <Typography>+</Typography>
                    </Box>
                </Box>
            </Fade>
            <Fade in={props.postsReady}>
                <Box sx={{textAlign:'center', marginTop: theme => theme.spacing(0)}}>
                    {errorMessage && showErrorMessage()}
                    {props.posts?.map((post, index) => (
                        <Box
                            id={"__" + post.id}
                            key={index}
                            sx={{
                                display:'flex',
                                justifyContent: ((index % 2) > 0) ? "center" : "center",
                                marginBottom: theme => theme.spacing(15),
                                // marginLeft: theme => ({
                                //     xs : theme.spacing(-1),
                                //     md:  theme.spacing(-1),
                                // }),
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                maxWidth: {
                                    xs: '90%',
                                    md: '700px',
                                    xl: '700px',
                                }
                            }}
                        >
                            <Box maxWidth="false" sx={{
                                textAlign: 'center',
                                padding: {
                                    xs: 0,
                                    md: 0,
                                    lg: 0,
                                    xl: 0,
                                },
                                maxWidth: '700px',
                            }}>
                                    <NavLink 
                                                component={RouterLink}
                                                to={"/"+post.id}
                                                sx={{
                                                    fontSize: '.9rem',
                                                    textAlign: "center",
                                                    rotate: '.3deg',
                                                    textDecoration: 'none',
                                                    letterSpacing: '3px',
                                                    // fontWeight: 'bold',
                                                    '&:hover': {cursor: 'pointer',}
                                                }}>
                                        {getPostDate(post.date)}
                                    </NavLink>
                                <br />
                                <Box sx={{
                                    '& p': {
                                        fontFamily: (theme) => theme.typography.primary.fontFamily,
                                        fontSize: theme => theme.sizes.p,
                                        lineHeight: 1.5,
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        maxWidth: '100%',
                                        // textAlign: 'center',
                                    },
                                    '& figure': {
                                        marginBlockStart: 0,
                                        marginBlockEnd: 0,
                                        marginInlineStart: 0,
                                        marginInlineEnd: 0,
                                        backgroundColor: 'white',
                                        alignItems: 'center',
                                        display:'flex',
                                        justifyContent: 'center',
                                        paddingTop: theme => theme.spacing(2),
                                        paddingBottom: theme => theme.spacing(2),
                                        marginTop: theme => theme.spacing(3),
                                        marginBottom: theme => theme.spacing(3),
                                        zIndex: -1,
                                    },

                                    '& figure figcaption': {
                                        fontFamily: theme => theme.typography.primary.fontFamily,
                                        marginTop: theme => ({
                                            xs: theme.spacing(-3),
                                        }),
                                        textAlign: 'left',
                                        backgroundColor: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '1.4rem',
                                        padding: theme => theme.spacing(1),
                                        
                                    },
                                    '& h2': {
                                        fontSize: theme => theme.sizes.p,
                                        letterSpacing: '5px',
                                        textAlign: 'center',
                                        fontWeight: 300,
                                        fontFamily: theme => theme.typography.primary.fontFamily,
                                        fontStyle: 'normal',
                                        lineHeight: 1.5,
                                    }
                                    

                                }}>
                                    <WpApiPostContent
                                        content={post.content.rendered}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Fade>
        </Box>
    )
}