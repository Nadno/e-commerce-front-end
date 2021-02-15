import { AppProps } from 'next/dist/next-server/lib/router/router';
import React from 'react';
import Head from 'next/head';
import {
  createGlobalStyle,
  ThemeProvider,
} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    font-size: 62.5%;
    font-family: 'Lato', sans-serif;
  }

  body {
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    color: ${({ theme }) => theme.colors.text};
  }

  html, body {
    width: 100%;
    max-width: 100vw;
    min-height: 100vh;
  }
  
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const theme = {
  colors: {
    white: '#fff',
    primary: '#5EC2C0',
    secondary: '#6D7CB0',
    title: '#151515',
    text: '#404040',
    shadow: '#6d7bb083',
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
