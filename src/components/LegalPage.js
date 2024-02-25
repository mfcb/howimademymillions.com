import { Box, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import WpApiPostContent from "./blog/WpApiPostContent";

export default function LegalPage(props) {
    const [legalContent, setLegalContent] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const legalResponse = await axios.get('https://content.markusbuhl.com/wp-json/wp/v2/pages/156');
            setLegalContent(legalResponse.data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <Grid container>
            <Grid item xs={12}>
                <WpApiPostContent content={legalContent.content?.rendered} />
            </Grid>
        </Grid>
    )
}