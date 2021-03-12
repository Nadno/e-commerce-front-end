import styled from 'styled-components';
import Container from '../Container/style';

const Section = styled(Container)``;

const CommentForm = styled.form`
  width: 100%;
  padding: 0;

  header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    row-gap: 2rem;

    margin-bottom: 1rem;
  }

  .user {
    display: flex;
    align-items: center;
    align-self: flex-start;

    .name {
      font-size: 1.4rem;
      font-weight: bold;
      margin-left: 2rem;
    }
  }

  .rating {
    width: 10rem;
  }

  .create-comment {
    --size: 10rem;

    .input {
      height: var(--size);
    }

    textarea {
      resize: none;
      height: var(--size);
      font-size: 1.8rem;
      font-weight: 500;
      padding: 0.8em;
    }
  }

  button[type="submit"] {
    align-self: flex-end;
    margin-top: 2rem;
    margin-left: auto;
  }

  @media screen and (min-width: 360px) {
    header {
      flex-direction: row;
    }
  }
`;

export { Section, CommentForm };
