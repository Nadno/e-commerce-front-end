import styled from 'styled-components';
import Container from '../Container/style';

const ModalContainer = styled(Container)`
  @keyframes show-modal {
    from {
      transform: translateY(8px);
    }

    to {
      opacity: 1;
      transform: initial;
    }
  }

  animation: show-modal 250ms forwards linear;

  max-width: 42rem;
  width: 95%;
  margin: 0;
  opacity: 0;
  background-color: ${({ theme }) => theme.colors.background};

  z-index: 100;

  &.action .buttons {
    column-gap: 2rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .message {
    font-size: 1.8rem;
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

const Overlay = styled.div`
  position: fixed;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.5);

  top: 0;
  bottom: 0;

  left: 0;
  right: 0;
`;

export { ModalContainer, Overlay };
