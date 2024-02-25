import { Box, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import WpApiPostContent from "./blog/WpApiPostContent";
import {Link as RouterLink} from "react-router-dom"
import NavLink from "./nav/NavLink";

export default function AboutPage(props) {
    const [aboutContent, setAboutContent] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const aboutResponse = await axios.get('https://content.markusbuhl.com/wp-json/wp/v2/pages/489');
            setAboutContent(aboutResponse.data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <Grid container  flexDirection="column" justifyContent="space-between" sx={{minHeight:'100vh'}}>
            <Grid item xs={12}>
                <Box sx={{paddingTop: theme => theme.spacing(2)}}>
                    <WpApiPostContent content={aboutContent.content?.rendered} />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box sx={{marginBottom: theme => theme.spacing(2)}}>
                    <NavLink href="#" component={RouterLink} to="/legal">legal</NavLink>
                </Box>
            </Grid>
        </Grid>
    )
}