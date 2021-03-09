import React from 'react';
import Router from 'next/router';
import { AppProps } from 'next/dist/next-server/lib/router/router';

import { StyledProps, ThemeProvider } from 'styled-components';

import StoreProvider from '../providers/StoreProvider';
import progress from '../utils/routeLoading';
import GlobalStyle from '../styles/global';
import theme from '../styles/theme';
import Head from 'next/head';
import ModalProvider from '../providers/ModalProvider';

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.done);

export default function App({ Component, pageProps }: StyledProps<AppProps>) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ThemeProvider theme={theme}>
        <StoreProvider>
          <ModalProvider>
            <Component {...pageProps} />
            <div id="load" className="load" />
          </ModalProvider>
          <GlobalStyle />
        </StoreProvider>
      </ThemeProvider>
    </>
  );
}
