import './Page.css';
import { Container } from '@mui/material';
import React from 'react';


function Page(props) {

  return (
      <Container maxWidth="false" sx={{
        width: theme => ({
          xs: `calc(100% - ${theme.spacing(4)})`,
          md: `calc(100% - ${theme.spacing(8)})`,
        }),
        padding: theme => ({
          xs: 0,
          md: 0,
        })

      }}>
        {props.children}
      </Container>
  );
}

export default Page;
