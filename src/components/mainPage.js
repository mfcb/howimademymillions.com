import { Box, Fade, Grid, Typography, } from "@mui/material";
import { useState } from "react";
import Blog from "./blog/Blog";
import { useLocation } from "react-router-dom";
import {Link as ScrollLink, animateScroll as scroll,scroller } from "react-scroll";
import {Link as RouterLink} from "react-router-dom";
import NavLink from "./nav/NavLink";
import { Heading, SmallHeading } from "./util/type";

const MainLink = (props) => (
  <NavLink component={RouterLink} href="#" to={props.to} sx={{textDecoration: 'none',letterSpacing:1,}}>{props.children}</NavLink>
)

export default function MainPage(props) {
    const [blogReady, setBlogReady] = useState(false);
    const [worksReady, setWorksReady] = useState(false);
    const {pathname} = useLocation();
    const [passportActive, setPassportActive] = useState(false);

    const [isBlogLoading, setIsBlogLoading] = useState(false);

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

    const blogLoadHandler = (loading) => {
      console.log("loading? " + loading);
      setIsBlogLoading(loading);
    }
    
    return (
      <Fade in>
          <Grid sx={{minHeight:'100vh'}} id="mainGrid" direction="column" container spacing={0} rowSpacing={0}>          
            <Grid item xs={12} sx={{textAlign:'center',marginTop:theme=>theme.spacing(1)}}>
              <NavLink href="#" component={RouterLink} to="/about" sx={{textDecoration:'none'}}>h.i.m.m.m</NavLink>
            </Grid>
            <Grid item xs={12}>
              {props.children}
            </Grid>
          </Grid>
      </Fade>
    )
}