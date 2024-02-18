import { Fade, Grid, Typography, } from "@mui/material";
import { useState } from "react";
import Blog from "./blog/Blog";
import { useLocation } from "react-router-dom";
import {Link as ScrollLink, animateScroll as scroll,scroller } from "react-scroll";
import {Link as RouterLink} from "react-router-dom";
import NavLink from "./nav/NavLink";
import { Heading } from "./util/type";

const MainLink = (props) => (
  <NavLink component={RouterLink} href="#" to={props.to} sx={{textDecoration: 'none',letterSpacing:1,}}>{props.children}</NavLink>
)

export default function MainPage(props) {
    const [blogReady, setBlogReady] = useState(false);
    const [worksReady, setWorksReady] = useState(false);
    const {pathname} = useLocation();
    const [passportActive, setPassportActive] = useState(false);

    const onWorksReady = () => {
        setWorksReady(true);
      }
      
      const scrollTo = (e, to,duration) => {
        e?.preventDefault();
        scroller.scrollTo(to, {
          duration: duration || 400,
          delay: 1,
          smooth: true,
        })
      }
    
      const onBlogReady = () => {
        if(props.blog) {
          scrollTo(null,"blog");
        } else if(props.about) {
          scrollTo(null,"about");
        } else if(props.work) {
          scrollTo(null,"work");
        }
        setBlogReady(true);
      }
    
    return (
      <Fade in>
          <Grid sx={{minHeight:'100vh'}} id="mainGrid" direction="column" justifyContent="space-between" container spacing={0} rowSpacing={0}>          
            <Grid item container sx={{minHeight: '90vh'}} justifyContent="center" alignItems="center" direction="column" xs={12}>
              <Grid item xs={12} sx={{marginTop: '0px'}}>
                <Heading>HOW I MADE MY MILLIONS</Heading>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Blog />
            </Grid>
            <Grid item container direction="column" sx={{textAlign: 'center', }} spacing={1}>
              <Grid item>
                <Typography>+</Typography>
              </Grid>
              <Grid item>
                <MainLink>about</MainLink>
              </Grid>
              <Grid item>
                <MainLink>portfolio</MainLink>
              </Grid>
              <Grid item>
                <MainLink>legal</MainLink>
              </Grid>
              <Grid item>
                <Typography>x</Typography>
                <Typography sx={{lineHeight:2}}>end of website</Typography>
              </Grid>
            </Grid>
          </Grid>
      </Fade>
    )
}