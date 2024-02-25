import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Blog from "./Blog";
import debounce from "lodash.debounce";
import axios from "axios";


function SinglePostPage(props) {
    const {postId} = useParams();
    const [posts, setPosts] =       React.useState([]);
    const [loading, setLoading] =   React.useState(true);
    const [page, setPage] =         React.useState(1);
    const [numPages, setNumPages] = React.useState(1);
    const [postsReady, setPostsReady] = React.useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
                try {
                    console.log("Post id " + postId);
                    const path = `https://content.markusbuhl.com/wp-json/wp/v2/scraps/${postId}`   
                    const response = await axios.get(path);
                    setPosts([response.data]);
                    setLoading(false);
                    if(!postsReady) setPostsReady(true);
                } catch (error) {
                    console.error('Error fetching posts:', error);
                    setLoading(false);
                }
            }
        fetchPosts();
    }, [page, postId, setPosts, postsReady, numPages]);

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

    return(
        <Blog posts={posts} postsReady={postsReady}/>
    )

}

export default SinglePostPage;