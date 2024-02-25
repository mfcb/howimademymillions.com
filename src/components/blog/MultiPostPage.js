import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Blog from "./Blog";
import debounce from "lodash.debounce";
import axios from "axios";
import { Box, Grid, Typography } from "@mui/material";


function MultiPostPage(props) {
    const [posts, setPosts] =       React.useState([]);
    const [loading, setLoading] =   React.useState(true);
    const [page, setPage] =         React.useState(1);
    const [numPages, setNumPages] = React.useState(1);
    const [postsReady, setPostsReady] = React.useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
                try {
                    if(page <= numPages) {
                        const path = `https://content.markusbuhl.com/wp-json/wp/v2/scraps?page=${page}`;
                        const response = await axios.get(path);
                        setNumPages(response.headers["x-wp-totalpages"])
                        setPosts(prevPosts => {
                            const newPosts = [...prevPosts];
                            response.data.forEach(element => {
                                if (!newPosts.some(item => item.id === element.id)) {
                                    newPosts.push(element);
                                }
                            });
                            console.log("set posts");
                            return newPosts;
                        });
                    }
                    setLoading(false);
                    if(!postsReady) setPostsReady(true);
                } catch (error) {
                    console.error('Error fetching posts:', error);
                    setLoading(false);
                }
            }
        fetchPosts();
    }, [page, setPosts, postsReady, numPages]);

    useEffect(() => {
        const handleScroll = debounce(() => {
        if (
            window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight
        ) {
            if (loading) return;
            setPage(prevPage => prevPage + 1);
        }
        },100);

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    return (
        <Box>
            <Blog posts={posts} postsReady={postsReady}/>
            <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid item xs={12} sx={{textAlign:'center'}}>
                    <Typography>x</Typography>
                    <Typography sx={{lineHeight:2}}>{!postsReady ? "loading content" : "end of website"}</Typography>
                </Grid>
              </Grid>
        </Box>
    )

}

export default MultiPostPage;