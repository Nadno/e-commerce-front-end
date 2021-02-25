import styled from 'styled-components';
import Container from '../Container/style';

const Div = styled(Container)`
  position: fixed;
  width: 90vw;
  max-width: 400px;

  background-color: #fff;

  left: 50%;
  top: 30%;
  z-index: 10;
  transform: translateX(-50%);
  transform-style: preserve-3d;

  &::before {
    position: absolute;
    width: 100vw;
    height: 100vh;

    background-color: ${({ theme }) => theme.colors.shadow};

    top: 50%;
    transform: translate3d(0, -50%, -1rem);

    content: '';
  }

  .message {
    font-size: 1.6rem;
    font-weight: 500;
    text-align: center;
  }

  hr {
    width: 100%;
    height: 0.3rem;
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  .buttons {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

export default Div;