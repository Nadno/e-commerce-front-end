import styled from 'styled-components';

import Container from '../Container';
import { StyledInput } from '../Input';

const Section = styled(Container)`
  .search-bar {
    display: flex;
    align-items: center;
    justify-content: center;

    #search {
      max-width: 50rem;
    }
  }
`;

const Submit = styled(StyledInput)`
  width: initial;
  cursor: pointer;

  transition: background-color 0.5s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export { Section, Submit };
