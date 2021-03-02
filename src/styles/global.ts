import { createGlobalStyle } from 'styled-components';

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
    background-color: ${({ theme }) => theme.colors.background};
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

    row-gap: 4rem;

    form,
    main,
    header,
    section,
    footer {
      grid-column: 2/3;
    }

    a {
      text-decoration: none;
    }

    .title {
      font-weight: 500;
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.title};
    }

    .warn,
    .error  {
      margin: 5rem;
    }

    .warn {
      font-size: 4rem;
      color: ${({ theme }) => theme.colors.warn};
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
    z-index: 100;

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

export default GlobalStyle;
