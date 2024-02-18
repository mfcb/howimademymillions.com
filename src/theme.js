import {createTheme } from '@mui/material/styles';

const primaryTypo = [
    "VCR OSD",
    "sans-serif",
].join(',');


let theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1920,
        }
    },
    palette: {
        primary: {
            main: '#212121',
        },
        secondary: {
            main: '#5885FF',
        },
        white: {
            main: '#fff',
        }
    },
})

theme = createTheme(theme, {
    sizes: {
        p: {
            xs: '13px',
            md: '15px',
            lg: '1rem',
        },
        h1: {
            xs: '1.1rem',
            md: '1.3rem',
            lg: '1.5rem',
        },
    },
    typography: {
        primary: {
            fontFamily: primaryTypo,

        },
        secondary: {
            fontFamily: 'courier-prime',
        },
        h1: {
            [theme.breakpoints.up('xs')]: {
                fontSize: '1rem',
                marginBottom: theme.spacing(3),
            },
            [theme.breakpoints.up('md')]: {
                fontSize: '6rem',
                marginBottom: theme.spacing(0),
            },

        }
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: primaryTypo,
                    color: theme.palette.primary.main,
                    // lineHeight: '18px',
                    lineHeight: 1.4,
                    fontSize: {
                        xs: '13px',
                        md: '15px',
                    },
                    '::selection': {
                        background: 'yellow',
                        color: 'blue',
                    },

                },
                // h1: {
                //     fontSize: {
                //         xs: '1.1rem',
                //         md: '1.3rem',
                //         lg: '1.5rem',
                //     },
                //     letterSpacing: {
                //         xs:'5px', md:'8px'
                //     }
                // }
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontFamily: primaryTypo,
                    color: '#666',
                    background: 'none',
                    fontWeight: 800,
                    padding: 'none',
                    margin: 'none',
                },
                popper: {
                    padding: 0,
                    margin: 'none',
                },
                arrow: {
                    color: theme.palette.primary.main,
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: primaryTypo
                }
            }
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    fontSize: {
                        xs: '13px',
                        md: '15px',
                    },
                    '&:hover': {
                        backgroundColor:'yellow',
                    }
                },
                
            }
        }
    }
})




export default theme;