import styled from 'styled-components';

const StyledButton = styled.button`
  cursor: pointer;
  height: 4.5rem;
  padding: 0.4em 1em;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.6rem;
  font-weight: bold;
  transition: transform 0.2s ease;

  &:active {
    transform: scale(0.95) !important;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:focus {
    outline-offset: 4px;
  }
`;

const PrimaryButton = styled(StyledButton)`
  width: 100%;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};

  &:hover {
    opacity: 0.7;
    transform: scale(1.01);
  }

  &:focus {
    outline: 2px ${({ theme }) => theme.colors.primary} solid;
  }
`;

const SecondaryButton = styled(StyledButton)`
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  color: ${({ theme }) => theme.colors.secondary};
  border: 2px solid ${({ theme }) => theme.colors.secondary};

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.secondary};

    z-index: -1;
    transform: translateY(100%);
    transition: transform 250ms ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    opacity: 0.7;

    &::before {
      transform: translateX(0);
    }
  }

  &:focus {
    outline: 2px ${({ theme }) => theme.colors.secondary} solid;
    color: ${({ theme }) => theme.colors.white};

    &::before {
      transform: translateX(0);
    }
  }
`;

export { PrimaryButton, SecondaryButton };