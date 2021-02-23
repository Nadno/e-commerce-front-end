import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { AppProps } from 'next/dist/next-server/lib/router/router';

import {
  createGlobalStyle,
  StyledProps,
  ThemeProvider,
} from 'styled-components';

import { AccountProvider } from '../src/useAccount';
import progress from '../src/utils/routeLoading';

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.done);

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
    background-color: #fff;
  }

  html, body {
    width: 100%;
    max-width: 100vw;
    min-height: 100vh;
  }
  
  #__next {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr minmax(30rem, 80rem) 1fr;
    grid-template-rows: auto;

    row-gap: 8rem;

    form,
    main,
    header,
    section,
    footer {
      grid-column: 2/3;
    }

    .error {
      font-size: 1.4rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.secondary};
    }

    @keyframes loading-animation {
    to {
      transform: translateX(-50%) scaleX(0);
    }
  }

  .loading {
    position: absolute;

    &.active {
    height: 100%;
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white};

      &::after {
      content: '';
      position: absolute;
      height: 2rem;
      width: 10rem;
      background-color: ${({ theme }) => theme.colors.secondary};

      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      animation: loading-animation 1s cubic-bezier(0.39, 0.575, 0.565, 1) alternate
        infinite;
    }
    }
  }
  }
`;

const theme = {
  colors: {
    white: '#f5f5f5',
    primary: '#d64040',
    secondary: '#b06d6d',
    title: '#303030',
    text: '#404040',
    shadow: '#6d7bb025',
  },
};

export default function App({ Component, pageProps }: StyledProps<AppProps>) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />

        <title>Produtos</title>

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AccountProvider>
          <Component {...pageProps} />
          <div className="loading"></div>
        </AccountProvider>
      </ThemeProvider>
    </>
  );
}
