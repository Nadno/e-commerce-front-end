import styled from 'styled-components';
import Container from '../Container/style';

const ModalContainer = styled(Container)`
  position: absolute;
  width: 100%;
  margin: 0;
  max-width: 400px;

  background-color: ${({ theme }) => theme.colors.background};

  left: 50%;
  top: 50%;
  z-index: 10;
  transform: translate(-50%, -50%) !important;
  transform-style: preserve-3d;

  &.action .buttons {
    column-gap: 2rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .message {
    font-size: 1.6rem;
    font-weight: 500;
    text-align: center;
  }

  hr {
    width: 100%;
    height: 0.3rem;
    border: none;
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  .buttons {
    width: 100%;
  }
`;

const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;

  background-color: ${({ theme }) => theme.colors.shadow};

  top: 0;
  left: 0;
`;

export { ModalContainer, Background };
