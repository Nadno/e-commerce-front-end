import React from 'react';
import Router from 'next/router';
import { AppProps } from 'next/dist/next-server/lib/router/router';

import { StyledProps, ThemeProvider } from 'styled-components';

import StoreProvider from '../StoreProvider';
import progress from '../utils/routeLoading';
import GlobalStyle from '../styles/global';
import theme from '../styles/theme';

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.done);

export default function App({ Component, pageProps }: StyledProps<AppProps>) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <StoreProvider>
          <Component {...pageProps} />
          <GlobalStyle />
          <div className="loading"></div>
        </StoreProvider>
      </ThemeProvider>
    </>
  );
}
