import { Box, Link, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Fragment } from "react";
import { Email } from "react-obfuscate-email";
import NavLink from "../nav/NavLink";
import {Link as RouterLink} from "react-router-dom";

const shadowColor = 'rgba(50, 0, 0, 0.05)'
const shadow = '6px 0 0 ' + shadowColor;

export const SmallHeading = (props) => {
  return (
      <Typography sx={{marginTop: theme => theme.spacing(4),textTransform:'lowercase'}}>{props.children}</Typography>
  )
};

export const MainLink = (props) => (
  <NavLink component={RouterLink} href="#" to={props.to} sx={{textDecoration: 'none',letterSpacing:1,}}>{props.children}</NavLink>
)

export const Span = styled((props) => <Box component="span" {...props}/>)(({theme, highlight, bold, italic, strike, serif, uppercase, lowercase, lg}) => ({
    fontWeight: bold ? 700 : 400,
    fontStyle: italic ? "italic" : "normal",
    fontFamily: serif ? theme.typography.primary.fontFamily : theme.typography.primary.fontFamily,
    textTransform: uppercase ? "uppercase" : (lowercase ? "lowercase" : "none"),
    lineHeight:1.2,
    textDecoration: strike ? "line-through" : 'none',
    textDecorationThickness: '100%',
    background: highlight ? 'yellow' : 'none',
    padding: .5,
    letterSpacing: bold ? '0.03rem' : '0.0rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: lg ? theme.sizes.p.lg : theme.sizes.p.xs,
    },

    '::selection': {
      background: 'yellow',
      color: 'blue',
  },
  }));
  
  
export const obfuscate = (input) => {
    return [...input].map((c,i) => (<Fragment key={i}>{c}<span style={{display:'none'}}>{Math.floor(Math.random()*100)}</span></Fragment>));
  }

export const ExtLink = (props) => <Link 
                                        target={props.href?.includes('http') ? "_blank" : "_self"}
                                        rel={props.href?.includes('http') && 'noreferrer'}
                                        {...props}
                                        sx={{
                                          background:       props.clean ? 'none' : 'none',
                                          boxShadow:        props.clean ? 'none' : shadow,
                                          webkitBoxShadow:  props.clean ? 'none' : shadow,
                                          mozBoxShadow:     props.clean ? 'none' : shadow,
                                          // fontWeight: '800',
                                          fontStyle: props.italic ? 'italic' : 'normal',
                                          textTransform: 'uppercase',
                                          textDecoration: props.clean ? 'none' : 'underline',
                                          letterSpacing: 'normal',
                                          '&:hover': {
                                            background: props.simple && 'none',
                                            cursor: 'ne-resize',
                                            color: 'blue',
                                          },
                                          fontSize: theme => props.lg ? theme.sizes.p.lg : theme.sizes.p,
                                          
                                        }}
                                   />                                   

export const StyledEmail = styled(Email)(({theme}) => ({
    color: "black",
    textDecoration: "none",
    background: 'none',
    '&:visited': {
      color: "black",
    },
    
    '&:hover': {
      backgroundColor: 'yellow',
      color:'blue',
    },
  }));

export const Heading = styled(Typography)(({theme}) => ({
  fontSize: '3rem',
  letterSpacing: 10,
  textAlign: 'center',
  '&::after': {
    // content: "'_'",
  },
  '&:hover' : {
  }
}))