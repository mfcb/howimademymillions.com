import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider, Typography } from '@mui/material';
import theme from './theme';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Page from './Page';
import MainPage from './components/mainPage';
import SinglePostPage from './components/blog/SinglePostPage';
import MultiPostPage from './components/blog/MultiPostPage';
import AboutPage from './components/AboutPage';
import LegalPage from './components/LegalPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Page>
        <MainPage>
          <MultiPostPage />
        </MainPage>
      </Page>
    ),
  },
  {
    path: "/:postId",
    element: (
      <Page>
        <MainPage>
          <SinglePostPage />
        </MainPage>
      </Page>
    ),
  },
  {
    path: "/about",
    element: (
      <Page>
        <AboutPage />
      </Page>
    ),
  },
  {
    path: "/legal",
    element: (
      <Page>
        <LegalPage />
      </Page>
    ),
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
